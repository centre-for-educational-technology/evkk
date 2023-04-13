import sys
import json
import os
import math
import re
from flask import Flask
from flask import request
from flask import Response
import re
from tasemehindaja import arvuta
from nlp import nlp_t, nlp_tp, nlp_tpl, nlp_all

from nlp import nlp_ru_t, nlp_ru_tp, nlp_ru_tpl, nlp_ru_all

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
                    v1.append([word.pos, word.feats, word.text])
                else:
                    v1.append([word.pos, "–", word.text])
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/silbid', methods=['POST'])
def silbita():
    tekst = request.json["tekst"]
    mitmekaupa = 4
    sonad = tekst.split()
    sonad = [" ".join(sonad[i:i+mitmekaupa]) for i in range(0, len(sonad), mitmekaupa)]
    response = []
    for sona in sonad:
        vahetulemus = silbita_sisemine(sona).rstrip().split()
        for tulem in vahetulemus:
            response.append(tulem)
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

@app.route('/lemmadjaposinfo', methods=['POST'])
def lemmadjaposinfo():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
          if word._upos != "PUNCT":
              v1.append({"word": word.lemma, "startChar": word.start_char, "endChar": word.end_char})
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

@app.route('/sonadlausetenajaposinfo', methods=['POST'])
def sonadlausetenajaposinfo():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        for word in sentence.words:
            if word._upos != "PUNCT":
                v2.append({"word": word.text, "startChar": word.start_char, "endChar": word.end_char})
        v1.append(v2)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/lemmadlausetenajaposinfo', methods=['POST'])
def lemmadlausetenajaposinfo():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        for word in sentence.words:
            if word._upos != "PUNCT":
                v2.append({"word": word.lemma, "startChar": word.start_char, "endChar": word.end_char})
        v1.append(v2)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/sonad', methods=['POST'])
def sonad():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word._upos != "PUNCT":
                v1.append(word.text)
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/sonadjaposinfo', methods=['POST'])
def sonadjaposinfo():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
          if word._upos != "PUNCT":
              v1.append({"word": word.text, "startChar": word.start_char, "endChar": word.end_char})
    return Response(json.dumps(v1), mimetype="application/json")

@app.route('/keeletase', methods=['POST'])
def keeletase():
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
    nlp=nlp_all
    if language=='ru':
        nlp=nlp_ru_all
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

@app.route('/keerukus', methods=['POST'])
def keerukus():
    tekst=request.json["tekst"]
    return Response(json.dumps(hinda_keerukust(tekst)), mimetype="application/json")

piirid={"lix":[25, 35, 45, 55],
        "smog":[5, 10, 15, 20],
        "fk":[5, 10, 20, 25]}
vasted=["väga kerge", "kerge", "keskmine", "raske", "väga raske"]

def hinnang(indeks, arv):
  p=piirid[indeks]
  for i in range(len(p)):
    if arv<p[i]: return vasted[i]
  return vasted[-1]

def hinda_keerukust(tekst):
    laused = 0
    sonad = 0
    poly = 0
    silpide_arv = 0
    pikad_sonad = 0
    SMOG_hinnang = 0
    Flesch_hinnang = 0
    Flesch_hinnang2 = 0
    LIX_hinnang = 0
    nlp=nlp_tp
    doc=nlp(tekst)
    laused=len(doc.sentences)
    sonad=len([sona for lause in doc.sentences for sona in lause.words if sona.xpos!="Z"])
    if sonad==0:
        return [0]*8
    for lause in doc.sentences:
      for sona in lause.words:
         if sona.xpos!="Z":
           sonatekst = sona.text.replace('Š', 'S').replace('š', 's').replace('Ž', 'z').replace('ž', 'z')
           sonatekst = re.sub('[^0-9a-zA-ZõäöüšžÕÄÖÜŠŽ]+', '', sonatekst)
           if len(sonatekst)>=7: pikad_sonad+=1
           silbitatud=silbita_sisemine(sonatekst).replace('\n', '')
           silp=silbitatud.count('-')
           silpide_arv=silpide_arv+silp+1
           if silp>=2: poly+=1
    SMOG_hinnang = 1.0430 * math.sqrt(poly * (30/laused)) + 3.1291
    FK_hinnang = 0.39 * (sonad/laused) + 11.8 * (silpide_arv/sonad) - 15.59
    LIX_hinnang = sonad/laused + ((pikad_sonad * 100)/sonad)
    v=[0, 0, 0]
    v[0]=hinnang("smog", SMOG_hinnang)
    v[1]=hinnang("fk", FK_hinnang)
    v[2]=hinnang("lix", LIX_hinnang)
    v.append("/".join(list(set(v))))
    return [laused, sonad, poly, silpide_arv, pikad_sonad, SMOG_hinnang, FK_hinnang, int(LIX_hinnang)]+v

@app.route('/mitmekesisus', methods=['POST'])
def mitmekesisus():
    tekst=request.json["tekst"]
    return Response(json.dumps(hinda_mitmekesisust(tekst)), mimetype="application/json")

def hinda_mitmekesisust(tekst):
    import valemid_mitmekesisus
    nlp=nlp_tpl
    doc=nlp(tekst)

    words_array = []
    for s_sentence in doc.sentences:
        for w_word in s_sentence.words:
            if w_word.upos != "PUNCT" and w_word.upos != "NUM" and w_word.upos != "SYM" and w_word.upos != "PROPN" \
                and not (w_word._feats != None and (w_word._feats.find("NumForm=Digit") > 0 or w_word._feats.find("Abbr=Yes") >= 0)):
                words_array.append(w_word)

    #sõnade arv kokku
    words_count = len(words_array)
    new_text = ""
    for j in range (0, len(words_array)):
        new_text = new_text + " " + words_array[j].text

    #unikaalsete lemmade massiv
    text_lemmas = []

    for j in range(0, words_count):
        #teksti unikaalsed lemmad
        if words_array[j].lemma:
          if words_array[j].lemma.lower() not in text_lemmas:
                text_lemmas.append(words_array[j].lemma.lower())

    #lemmade arv tekstis
    lemmas_count = len(text_lemmas)
    if words_count<=50: return [0]*10+[words_count, lemmas_count]

    KLSS = round(lemmas_count / math.sqrt(2 * words_count), 4)
    JLSS = round(lemmas_count /  math.sqrt(words_count), 4)
    MAAS = round((math.log(words_count) - math.log(lemmas_count)) / math.ldexp(math.log(words_count), 2), 4)
    UBER = round(math.ldexp(math.log(words_count), 2) / (math.log(words_count) - math.log(lemmas_count)), 4)
    MTLD = round(valemid_mitmekesisus.mtld_calc(words_array, ttr_threshold = 0.72), 4)
    HDD = round(valemid_mitmekesisus.hdd(words_array, sample_size = 42.0), 4)
    MSTTR = round(valemid_mitmekesisus.msttr(new_text, window_length = 50), 4)
    return [KLSS, JLSS, MAAS, UBER, MTLD, HDD, MSTTR]+valemid_mitmekesisus.mitmekesisus_kaugused(KLSS, JLSS, MAAS, UBER, MTLD, HDD, MSTTR)+[words_count, lemmas_count]

app.run(host="0.0.0.0", threaded=True, port=5300)
