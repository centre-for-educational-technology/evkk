import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC


# Original author: Kais Allkivi-Metsoja
# List of predictive features used in the model
def train():
    feats = ['P_Prs', 'A_cases', 'S_cases', 'n_cases', 'S_Plur',
             'Plur', 'V_Prs1', 'P_IntRel', 'Nom', 'S_Gen', 'V_Sing',
             'V_Pass', 'V_Ind', 'K_Post', 'P_Plur']

    # The training set consists of 720 texts, stratified by proficiency level.
    training_set = pd.read_csv('./app/train_test.csv')

    # Data matrix containing the chosen feature values
    X = training_set[feats].to_numpy()

    # Array containing the proficiency level labels
    y = training_set['prof_level'].to_numpy().ravel()

    # Standardizing the predictive features
    scaler = StandardScaler().fit(X)
    x_scaled = scaler.transform(X)

    # Training the classifier
    clf = SVC(probability=True)
    model = clf.fit(x_scaled, y)
    return model, scaler
