import stanza
import sys
import json
from flask import Flask
from flask import request
from flask import Response

print("start download")
stanza.download('et')
print("done download")
app = Flask(__name__)

@app.route('/lemmad', methods=['POST'])
def lemmad():
    print("test!!!")
    #request.json
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

app.run(host="0.0.0.0")

