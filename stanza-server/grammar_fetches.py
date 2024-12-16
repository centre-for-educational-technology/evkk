import requests

headers = {'Content-Type': 'application/json'}
data_text = 'text'

grammar_url = 'https://api.tartunlp.ai/grammar'
grammar_alt_url = 'http://grammar-worker-server:5400/grammarchecker'
speller_url = 'http://grammar-worker-server:5400/spellchecker'


def fetch_grammar(text):
    data = {data_text: text}
    response = requests.post(grammar_url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        response = requests.post(grammar_alt_url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()
        else:
            return None


def fetch_speller(text):
    data = {data_text: text}
    response = requests.post(speller_url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return None
