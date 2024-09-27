import json
import os


def fetch_grammar(text):
    request = """
	curl --header 'Content-Type: application/json' \
		--request POST \
		--data '{"language": "et", "text": "%s"}' \
		https://api.tartunlp.ai/grammar""" % text
    response = os.popen(request).read()
    if response:
        return json.loads(response)
    else:
        return 'None'


def fetch_speller(text):
    request = """
	curl --header 'Content-Type: application/json' \
		--request POST \
		--data '{"tekst": "%s"}' \
		http://grammar-worker-server:5400/spellchecker""" % text
    response = os.popen(request).read()
    if response:
        return json.loads(response)
    else:
        return 'None'
