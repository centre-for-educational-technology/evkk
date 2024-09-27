import numpy as np
import pandas as pd
import stanza

import linguistic_functions as lf

num_plur = 'Number=Plur'


# Original author: Kais Allkivi-Metsoja
def predict_level(model, scaler, input_text):
    # Morphological tagging of input text
    nlp = stanza.Pipeline('et', processors='tokenize,pos,lemma')
    data = []

    doc = nlp(input_text)
    for sent in doc.sentences:
        for word in sent.words:
            data_row = [word.id, word.text, word.lemma, word.upos, word.xpos, word.feats]
            data.append(data_row)

    # Creating a dataframe based on the tagged output
    df = pd.DataFrame(data, columns=['Index', 'Word', 'Lemma', 'Upos', 'Xpos', 'Feats'])

    # Creating a dictionary to store predictive feature values
    feats = ['P_Prs', 'A_cases', 'S_cases', 'n_cases', 'S_Plur',
             'Plur', 'V_Prs1', 'P_IntRel', 'Nom', 'S_Gen', 'V_Sing',
             'V_Pass', 'V_Ind', 'K_Post', 'P_Plur']
    feat_values = {}
    for feat in feats:
        feat_values[feat] = None

    # Calculating general nominal features
    nominals = df[(df.Xpos == 'S') | (df.Xpos == 'A') | (df.Xpos == 'P') | (df.Xpos == 'N')]
    nominal_count = nominals.Word.count()
    nominal_feats = lf.feats_table(nominals)
    feat_values['n_cases'] = lf.count_cases(nominal_feats)
    feat_values['Nom'] = lf.feat_ratio(nominal_feats, 'Case=Nom', nominal_count)
    feat_values['Plur'] = lf.feat_ratio(nominal_feats, num_plur, nominal_count)

    # Calculating noun features
    noun_count = lf.pos_count(df, 'S')
    noun_feats = lf.feats_table(df, 'S')
    feat_values['S_cases'] = lf.count_cases(noun_feats)
    feat_values['S_Gen'] = lf.feat_ratio(noun_feats, 'Case=Gen', noun_count)
    feat_values['S_Plur'] = lf.feat_ratio(noun_feats, num_plur, noun_count)

    # Calculating adjective and pronoun features
    # adj_count = lf.pos_count(df, 'A')
    adj_feats = lf.feats_table(df, 'A')
    feat_values['A_cases'] = lf.count_cases(adj_feats)

    pron_count = lf.pos_count(df, 'P')
    pron_feats = lf.feats_table(df, 'P')
    feat_values['P_Plur'] = lf.feat_ratio(pron_feats, num_plur, pron_count)
    feat_values['P_Prs'] = lf.feat_ratio(pron_feats, 'PronType=Prs', pron_count)
    feat_values['P_IntRel'] = lf.feat_ratio(pron_feats, 'PronType=Int,Rel', pron_count)

    # Calculating verb features
    verb_count = lf.pos_count(df, 'V')
    verb_feats = lf.feats_table(df, 'V')
    feat_values['V_Prs1'] = lf.feat_ratio(verb_feats, 'Person=1', verb_count)
    feat_values['V_Sing'] = lf.feat_ratio(verb_feats, 'Number=Sing', verb_count)
    feat_values['V_Pass'] = lf.feat_ratio(verb_feats, 'Voice=Pass', verb_count)
    feat_values['V_Ind'] = lf.feat_ratio(verb_feats, 'Mood=Ind', verb_count)

    # Calculating relative frequency of postpositions
    adp_count = lf.pos_count(df, 'K')
    adp_feats = lf.feats_table(df, 'K')
    feat_values['K_Post'] = lf.feat_ratio(adp_feats, 'AdpType=Post', adp_count)

    # Converting predictive feature values to a numpy array
    value_list = list(feat_values.values())
    x_to_predict = np.array([value_list])
    return predict_new_text(model, scaler, x_to_predict)


def predict_new_text(model, scaler, x_new):
    # Standardize the new data using the same scaler
    x_new_scaled = scaler.transform(x_new)

    # Predict the proficiency level and probabilities
    predicted_level = model.predict(x_new_scaled)
    level_probabilities = model.predict_proba(x_new_scaled)

    return {"level": predicted_level[0], "probabilities": level_probabilities[0].tolist()}
