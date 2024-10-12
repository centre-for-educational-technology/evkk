import requests

headers = {'Content-Type': 'application/json'}
data_text = 'tekst'

# Alternative grammar checker model api: https://api.tartunlp.ai/grammar
def fetch_grammar(text):
    url = 'http://grammar-worker-server:5400/grammarchecker'
    data = {data_text: text}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return response.text


def fetch_speller(text):
    url = 'http://grammar-worker-server:5400/spellchecker'
    data = {data_text: text}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return response.text
