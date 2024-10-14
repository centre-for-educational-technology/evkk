import requests

headers = {'Content-Type': 'application/json'}
data_text = 'text'


def fetch_grammar(text):
    url = 'https://api.tartunlp.ai/grammar'
    alt_url = 'http://grammar-worker-server:5400/grammarchecker'
    data = {data_text: text}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        response = requests.post(alt_url, headers=headers, json=data)
        if response.status_code == 200:
            return response.json()
        else:
            return None


def fetch_speller(text):
    url = 'http://grammar-worker-server:5400/spellchecker'
    data = {data_text: text}

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return None
