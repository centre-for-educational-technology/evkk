import stanza
import sys
import json
from flask import Flask
from flask import request
from flask import Response
import jamspell
import gdown


stanza.download('et')
app = Flask(__name__)

corrector=jamspell.TSpellCorrector()
print("laeb mudelit")
import os
from os.path import exists
path="/app/jamspell_estonian_2021_05_13.bin"
if not exists(path):
  print("tombab")
  gdown.download("https://drive.google.com/uc?id=1AVO7H1v6SaQ9Eom50ZmFZoW6Q17SUzm2", output=path)
print(os.getcwd())
print(os.listdir("app"))
print(corrector.LoadLangModel(path))
print("laetud")


@app.route('/lemmad', methods=['POST'])
def lemmad():
    nlp = stanza.Pipeline(lang='et', processors='tokenize,pos,lemma')
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos!="PUNCT":
                v1.append(word.lemma)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/laused', methods=['POST'])
def laused():
    nlp = stanza.Pipeline(lang='et', processors='tokenize')
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        v2.append(sentence.text)
        v1.append(v2)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/sonad', methods=['POST'])
def sonad():
    nlp = stanza.Pipeline(lang='et', processors='tokenize,pos')
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos!="PUNCT":
                v1.append(word.text)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/korrektuur', methods=['POST'])
def korrektuur():
    correction = corrector.FixFragment(request.json["tekst"])
    print(correction)
    response=Response(json.dumps([correction, request.json["tekst"]]), mimetype="application/json")
    return response

app.run(host="0.0.0.0")
