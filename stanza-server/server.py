import stanza
import sys
import json
import os
from flask import Flask
from flask import request
from flask import Response
from tasemehindaja import arvuta

stanza.download('et')
app = Flask(__name__)

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
    return Response(json.dumps(["proov"]), mimetype="application/json")
#    return Response(json.dumps(arvuta(request.json["tekst"])), mimetype="application/json")
    nlp = stanza.Pipeline(lang='et', processors='tokenize,pos')
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos!="PUNCT":
                v1.append(word.text)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/keeletase', methods=['POST'])
def keeletase():
    #return Response(json.dumps(arvuta("Juku tuli kooli ja oli üllatavalt rõõmsas tujus")), mimetype="application/json")
    return Response(json.dumps(arvuta(request.json["tekst"])), mimetype="application/json")

@app.route('/tervitus', methods=['GET'])
def tervitus():
     return "abc "+__file__+" "+os.getcwd()

app.run(host="0.0.0.0")
