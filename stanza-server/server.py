import sys
import json
import os
from flask import Flask
from flask import request
from flask import Response
import re
from tasemehindaja import arvuta
from nlp import nlp_t, nlp_tp, nlp_tpl

from nlp import nlp_ru_t, nlp_ru_tp
#from stanza_caller import lemmatize

if os.path.isfile("/app/word_mapping.csv"):
  asendused=[rida.strip().split(",") for rida in open("/app/word_mapping.csv").readlines()]
else:
  asendused=[]
app = Flask(__name__)

@app.route('/sonaliik', methods=['POST'])
def silbid():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos != "PUNCT":
                v1.append(word.pos)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/vormimargendid', methods=['POST'])
def vormimargendid():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos != "PUNCT":
                if word._upos not in ["ADP", "ADV", "CCONJ", "SCONJ", "INTJ", "X"]:
                    v1.append([word.text, word.feats])
                else:
                    v1.append([word.text, None])
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/silbid', methods=['POST'])
def silbita():
    tekst = request.json["tekst"]
    sonad = tekst.split()
    response = []
    for sona in sonad:
        response.append(silbita_sisemine(sona).rstrip())
    return Response(json.dumps(response), mimetype="application/json")

def silbita_sisemine(tekst):
    import subprocess
    a = subprocess.Popen("/app/silbitaja.bin", cwd="/app", shell=True, stderr=subprocess.PIPE, stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    stdo, stde = a.communicate(tekst.encode("iso-8859-13"))
    return stdo.decode("iso-8859-13")

@app.route('/lemmad', methods=['POST'])
def lemmad():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos != "PUNCT":
                v1.append(word.lemma)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/laused', methods=['POST'])
def laused():
    nlp = nlp_t
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        v2.append(sentence.text)
        v1.append(v2)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/sonad', methods=['POST'])
def sonad():
    #return Response(json.dumps(arvuta(request.json["tekst"])), mimetype="application/json")
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos != "PUNCT":
                v1.append(word.text)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/keeletase', methods=['POST'])
def keeletase():
    #return Response(json.dumps(arvuta("Juku tuli kooli ja oli üllatavalt rõõmsas tujus")), mimetype="application/json")
    return Response(json.dumps(arvuta(request.json["tekst"])), mimetype="application/json")


@app.route('/stanzaconllu', methods=['POST'])
def stanzaconllu():
    if request.json["failinimi"]:
        keel='et'
        if request.json["keel"]:
            if request.json["keel"]=="vene":
                keel='ru'
        vastus=margenda_stanza(request.json["tekst"], comments=True, filename=request.json["failinimi"], language=keel)
    else:
        vastus=margenda_stanza(request.json["tekst"], comments=False)
    return Response(json.dumps([vastus]), mimetype="application/json")


@app.route('/tervitus', methods=['GET'])
def tervitus():
     return "abc "+__file__+" "+os.getcwd()

def margenda_stanza(tekst, comments=True, filename="document", language='et'):
    v=[]
    nlp=nlp_tp
    if language=='ru':
        nlp=nlp_ru_tp
    doc=nlp(tekst)
    index=0
    if comments:
      v.append('# filename = '+filename+'\n')
    for sent in doc.sentences:
            index = index + 1
            sentence = ' '.join([word.text for word in sent.words])
            sentence = re.sub(r'\s([.,?!:;])', r'\1', sentence)
            if comments:
              v.append('# sent_id = '+filename+'_'+str(index)+'\n')
              v.append('# text = '+str(sentence)+'\n')
            windex=0
            for word in sent.words:
                viimasesisu="SpaceAfter=No"
                if windex<len(sent.words)-1:
                  if sent.words[windex].end_char<sent.words[windex+1].start_char:
                    viimasesisu="_"
                else: viimasesisu="_"
                vhead=(str(word.head) if word.head is not None else "_")
                vdeprel=(word.deprel if word.deprel else "_")
                vkoos=vhead+":"+vdeprel
                if vkoos=="_:_": vkoos="_"
                analysis = '\n'.join([f'{word.id}\t{word.text}\t{word.lemma}\t\
                    {word.upos}\t{word.xpos}\t{(word.feats if word.feats else "_")}\t{vhead}\t\
                    {vdeprel}\t{vkoos}\t{viimasesisu}'])
                v.append(analysis+'\n')
                windex+=1
            v.append('\n')
    v.append('\n')
    return "".join(v)

@app.route('/tahedsonadlaused', methods=['POST'])
def tahedsonadlaused():
    tekst=request.json["tekst"]
    keel='et'
    if request.json["keel"]:
        keel=request.json["keel"]
    nlp=nlp_tp
    if keel=="ru":
        nlp=nlp_ru_tp
    doc=nlp(tekst)
    v=[len(tekst),  len([sona for lause in doc.sentences for sona in lause.words if sona.xpos!="Z"])
, len(doc.sentences)]
    return Response(json.dumps(v), mimetype="application/json")

def asenda(t):
    #re.sub("([,-?!\"' \\(\\)])(kollane)([,-?!\"' \\(\\)])", "\\1sinine\\3", "suur kollane. kala")
    for a in asendused:
        t=re.sub("([,-?!\"' ()])("+a[0]+")([,-?!\"' ()])", "\\1"+a[1]+"\\3", t)
        t=re.sub("([,-?!\"' ()])("+a[0]+")([,-?!\"' ()])", "\\1"+a[1]+"\\3", t)
    return t

app.run(host="0.0.0.0", threaded=True, port=5300)
