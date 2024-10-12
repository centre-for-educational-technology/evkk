import requests

headers = {'Content-Type': 'application/json'}

def fetch_grammar(text):
    url = 'https://api.tartunlp.ai/grammar'
    data = {
        "language": "et",
        "text": text
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return response.text


def fetch_speller(text):
    url = 'http://grammar-worker-server:5400/spellchecker'
    data = {
        "tekst": text
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code == 200:
        return response.json()
    else:
        return response.text
