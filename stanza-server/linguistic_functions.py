import json
import os
import pandas as pd


def pos_count(data, pos):
    # Funktsioon arvutab sõnaliigi sageduse tekstis.
    if len(pos) > 1:
        return data[data.Upos == pos].Word.count()
    else:
        return data[data.Xpos == pos].Word.count()


def pos_ratio(data, pos, text_length):
    # Funktsioon arvutab sõnaliigi osakaalu tekstis.
    if len(pos) > 1:
        return data[data.Upos == pos].Word.count() / text_length
    else:
        return data[data.Xpos == pos].Word.count() / text_length


def pos_ttr(data, pos):
    # Funktsioon arvutab lemmade-sõnede suhtarvu valitud sõnaliigi puhul.
    pos_lemmas = data[data.Xpos == pos].groupby('Lemma').Lemma.count().to_frame()
    # lemma_count = pos_lemmas.Lemma.count()
    pos_count = pos_lemmas.Lemma.sum()
    if pos_count > 0:
        ttr = pos_lemmas.Lemma.count() / pos_lemmas.Lemma.sum()
    else:
        ttr = 0
    return ttr


def feats_table(data, pos=None):
    # Funktsioon koostab morfokirjete sagedustabeli. Soovi korral saab määrata sõnaliigi, mille märgendusele keskendutakse.
    if pos:
        feats_table = data[data.Xpos == pos].groupby('Feats').Feats.count().to_frame()
    else:
        feats_table = data.groupby('Feats').Feats.count().to_frame()
    feats_table.rename(columns={'Feats': 'Freq'}, inplace=True)
    feats_table['Feats'] = feats_table.index
    return feats_table


def feat_ratio(data, feature, word_count):
    # Funktsioon arvutab valitud morfoloogilise vormi osakaalu tekstis.
    # if len(data.index) > 0:
    if word_count > 0:
        return data[data['Feats'].str.contains(feature)].Freq.sum() / word_count
    else:
        return 0


def count_cases(data):
    # Funktsioon arvutab valitud sõnaliigi puhul eri käändevormide arvu.
    data = data[data['Feats'].str.contains('Case=')]
    data['Feats'] = data.Feats.str.split('|')
    data['Case'] = [feat[0] for feat in data.Feats]
    cases = data.groupby('Case').Freq.sum().to_frame()
    return len(cases.index)


def lexical_density(data):
    # Funktsioon arvutab teksti leksikaalse tiheduse ehk sisusõnade osakaalu.
    data['Lemma'] = data['Lemma'].str.replace('_', '')
    data['Lemma'] = data['Lemma'].str.replace('=', '')
    text_lemmas = data['Lemma'].tolist()
    # Stoppsõnade loend lemmatiseeritud tekstile
    # (Uiboaed 2018, https://datadoi.ee/handle/33/78)
    stop_lemmas = pd.read_csv('estonian-stopwords-lemmas.txt')
    stop_lemmas = set(stop_lemmas['Stoplemma'].tolist())
    function_words = 0
    for i in range(len(text_lemmas)):
        search = text_lemmas[i]
        if search in stop_lemmas:
            function_words += 1
    text_words = data.Word.count()
    return (text_words - function_words) / text_words


def curl_request(data):
    #   Funktsioon teeb päringu teksti sõnade abstraktsuse ja
    #   sageduse kohta eesti kirjakeeles.
    #   Abstraktsushinnang lähtub kolmepallilisest skaalast
    #   (vt Mikk jt 2003; http://hdl.handle.net/10062/50110),
    #   Sagedusandmed põhinevad Tartu Ülikooli tasakaalus korpusel.
    chars_to_remove = ['_', '=', '\(', ')', '"', '&']
    for char in chars_to_remove:
        data['Lemma'] = data['Lemma'].str.replace(char, '', regex=True)
    data['Lemma'] = data['Lemma'].str.replace("'", "")
    lemmas = data['Lemma'].tolist()
    request = """
	curl --header 'Content-Type: application/json' \
		--request POST \
		--data '{"language": "estonian", "text": "%s"}' \
		https://kiirlugemine.keeleressursid.ee/api/analyze""" % lemmas
    response = os.popen(request).read()
    if response:
        return json.loads(response)
    else:
        return 'None'


def rare_counter(data, freq_boundary, text_length):
    #   Funktsioon arvutab tekstis sõnade osakaalu,
    #   mille lemma sagedus on etteantud piirist väiksem.
    #   Sisendiks on URL-i https://kiirlugemine.keeleressursid.ee/api/analyze
    #   POST-päringu tulemused.
    rare_count = 0
    for word in data['wordAnalysis']:
        lemma = word['lemmas'][0]
        if lemma['frequency'] < freq_boundary:
            rare_count += 1
    return rare_count / text_length
