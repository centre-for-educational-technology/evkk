import json
import math
import os
import re
import subprocess

from flask import Flask
from flask import Response
from flask import request

from nlp import nlp_t, nlp_tp, nlp_tpl, nlp_all, nlp_ru_tp, nlp_ru_all
from tasemehindaja import arvuta

if os.path.isfile("/app/word_mapping.csv"):
    asendused = [rida.strip().split(",") for rida in open("/app/word_mapping.csv").readlines()]
else:
    asendused = []

mimetype = "application/json"
post = ['POST']
app = Flask(__name__)

piirid = {"lix": [25, 35, 45, 55],
          "smog": [5, 10, 15, 20],
          "fk": [5, 10, 20, 25]}
vasted = ["väga kerge", "kerge", "keskmine", "raske", "väga raske"]

sona_upos_piirang = ["PUNCT", "SYM"]
sona_upos_piirang_mitmekesisus = ["PUNCT", "SYM", "NUM", "PROPN"]
vormimargend_upos_piirang = ["ADP", "ADV", "CCONJ", "SCONJ", "INTJ", "X"]

eesti_tahestik = r'[a-zA-ZõÕäÄöÖüÜŽžŠš]+'


@app.route('/sonad-lemmad-silbid-sonaliigid-vormimargendid', methods=post)
def sonad_lemmad_silbid_sonaliigid_vormimargendid():
    nlp = nlp_tpl
    tekst = request.json["tekst"]
    doc = nlp(tekst)

    sonad = []
    eestikeelsed_sonad = []
    lemmad = []
    sonaliigid = []
    vormimargendid = []

    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos not in sona_upos_piirang:
                sonad.append(word.text)
                if sona_on_eestikeelne(word.text):
                    eestikeelsed_sonad.append(word.text)
                    lemmad.append(word.lemma)
                    sonaliigid.append(word.pos)
                    if word.upos not in vormimargend_upos_piirang:
                        vormimargendid.append([word.pos, word.feats])
                    else:
                        vormimargendid.append([word.pos, "–"])
                else:
                    eestikeelsed_sonad.append("–")
                    lemmad.append("–")
                    sonaliigid.append("–")
                    vormimargendid.append(["–", "–"])

    return Response(json.dumps({
        "sonad": sonad,
        "lemmad": lemmad,
        "silbid": silbita_sisemine(" ".join(puhasta_sonad(eestikeelsed_sonad))),
        "sonaliigid": sonaliigid,
        "vormimargendid": vormimargendid
    }), mimetype=mimetype)


@app.route('/sonaliik', methods=post)
def sonaliik():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                v1.append(word.pos)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/vormimargendid', methods=post)
def vormimargendid():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                if word.upos not in ["ADP", "ADV", "CCONJ", "SCONJ", "INTJ", "X"]:
                    v1.append([word.pos, word.feats, word.text])
                else:
                    v1.append([word.pos, "–", word.text])
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/silbid', methods=post)
def silbid():
    tekst = request.json["tekst"]
    return Response(json.dumps(silbita_sisemine(tekst)), mimetype=mimetype)


@app.route('/lemmad', methods=post)
def lemmad():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                v1.append(word.lemma)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/lemmadjaposinfo', methods=post)
def lemmadjaposinfo():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                v1.append({"word": word.lemma, "startChar": word.start_char, "endChar": word.end_char})
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/laused', methods=post)
def laused():
    nlp = nlp_t
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = [sentence.text]
        v1.append(v2)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/sonadlausetenajaposinfo', methods=post)
def sonadlausetenajaposinfo():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        for word in sentence.words:
            if word.upos != "PUNCT":
                v2.append({"word": word.text, "startChar": word.start_char, "endChar": word.end_char})
        v1.append(v2)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/lemmadlausetenajaposinfo', methods=post)
def lemmadlausetenajaposinfo():
    nlp = nlp_tpl
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        v2 = []
        for word in sentence.words:
            if word.upos != "PUNCT":
                v2.append({"word": word.lemma, "startChar": word.start_char, "endChar": word.end_char})
        v1.append(v2)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/sonad', methods=post)
def sonad():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                v1.append(word.text)
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/sonadjaposinfo', methods=post)
def sonadjaposinfo():
    nlp = nlp_tp
    doc = nlp(request.json["tekst"])
    v1 = []
    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos != "PUNCT":
                v1.append({"word": word.text, "startChar": word.start_char, "endChar": word.end_char})
    return Response(json.dumps(v1), mimetype=mimetype)


@app.route('/keeletase', methods=post)
def keeletase():
    return Response(json.dumps(arvuta(request.json["tekst"])), mimetype="application/json")


@app.route('/stanzaconllu', methods=post)
def stanzaconllu():
    if request.json["failinimi"]:
        keel = 'et'
        if request.json["keel"] and request.json["keel"] == "vene":
            keel = 'ru'
        vastus = margenda_stanza(request.json["tekst"], comments=True, filename=request.json["failinimi"],
                                 language=keel)
    else:
        vastus = margenda_stanza(request.json["tekst"], comments=False)
    return Response(json.dumps([vastus]), mimetype=mimetype)


@app.route('/tervitus', methods=['GET'])
def tervitus():
    return "abc " + __file__ + " " + os.getcwd()


@app.route('/tahedsonadlaused', methods=post)
def tahedsonadlaused():
    tekst = request.json["tekst"]
    keel = 'et'
    if request.json["keel"]:
        keel = request.json["keel"]
    nlp = nlp_tp
    if keel == "ru":
        nlp = nlp_ru_tp
    doc = nlp(tekst)
    v = [len(tekst), len([sona for lause in doc.sentences for sona in lause.words if sona.xpos != "Z"]),
         len(doc.sentences)]
    return Response(json.dumps(v), mimetype=mimetype)


@app.route('/keerukus', methods=post)
def keerukus():
    tekst = request.json["tekst"]
    return Response(json.dumps(hinda_keerukust(tekst)), mimetype=mimetype)


@app.route('/mitmekesisus', methods=post)
def mitmekesisus():
    tekst = request.json["tekst"]
    return Response(json.dumps(hinda_mitmekesisust(tekst)), mimetype=mimetype)


def silbita_sisemine(tekst):
    process = subprocess.Popen(["bash", "/app/poolita-ja-silbita.sh"], cwd="/app", stderr=subprocess.PIPE,
                               stdin=subprocess.PIPE, stdout=subprocess.PIPE)
    stdo, _ = process.communicate(tekst.encode())
    response = stdo.decode().rstrip().split()
    process.terminate()

    return [sona.replace("-", "–") if sona == "-" else sona for sona in response]


def margenda_stanza(tekst, comments=True, filename="document", language='et'):
    v = []
    nlp = nlp_all
    if language == 'ru':
        nlp = nlp_ru_all
    doc = nlp(tekst)
    index = 0
    if comments:
        v.append('# filename = ' + filename + '\n')
    for sent in doc.sentences:
        index = index + 1
        sentence = ' '.join([word.text for word in sent.words])
        sentence = re.sub(r'\s([.,?!:;])', r'\1', sentence)
        if comments:
            v.append('# sent_id = ' + filename + '_' + str(index) + '\n')
            v.append('# text = ' + str(sentence) + '\n')
        windex = 0
        for word in sent.words:
            viimasesisu = "SpaceAfter=No"
            if windex < len(sent.words) - 1:
                if sent.words[windex].end_char < sent.words[windex + 1].start_char:
                    viimasesisu = "_"
            else:
                viimasesisu = "_"
            vhead = (str(word.head) if word.head is not None else "_")
            vdeprel = (word.deprel if word.deprel else "_")
            vkoos = vhead + ":" + vdeprel
            if vkoos == "_:_": vkoos = "_"
            analysis = '\n'.join([f'{word.id}\t{word.text}\t{word.lemma}\t\
                    {word.upos}\t{word.xpos}\t{(word.feats if word.feats else "_")}\t{vhead}\t\
                    {vdeprel}\t{vkoos}\t{viimasesisu}'])
            v.append(analysis + '\n')
            windex += 1
        v.append('\n')
    v.append('\n')
    return "".join(v)


def asenda(t):
    for a in asendused:
        t = re.sub("([,-?!\"' ()])(" + a[0] + ")([,-?!\"' ()])", "\\1" + a[1] + "\\3", t)
        t = re.sub("([,-?!\"' ()])(" + a[0] + ")([,-?!\"' ()])", "\\1" + a[1] + "\\3", t)
    return t


def hinnang(indeks, arv):
    p = piirid[indeks]
    for i in range(len(p)):
        if arv < p[i]: return vasted[i]
    return vasted[-1]


def hinda_keerukust(tekst):
    poly = 0
    silpide_arv = 0
    pikad_sonad = 0
    nlp = nlp_tp
    doc = nlp(tekst)
    sonad = []
    eestikeelsed_sonad = []

    for sentence in doc.sentences:
        for word in sentence.words:
            if word.upos not in sona_upos_piirang and word.xpos != "Z":
                sonad.append(word.text)
                if len(word.text) >= 7: pikad_sonad += 1
                if sona_on_eestikeelne(word.text):
                    eestikeelsed_sonad.append(word.text)
    lausetearv = len(doc.sentences)
    sonadearv = len(sonad)
    if sonadearv == 0:
        return [0] * 8
    silbitatud = silbita_sisemine(" ".join(puhasta_sonad(eestikeelsed_sonad)))
    for sona in silbitatud:
        silp = sona.count('-')
        silpide_arv += silp + 1
        if silp > 2: poly += 1
    SMOG_hinnang = 1.0430 * math.sqrt(poly * (30 / lausetearv)) + 3.1291
    FK_hinnang = 0.39 * (sonadearv / lausetearv) + 11.8 * (silpide_arv / sonadearv) - 15.59
    LIX_hinnang = sonadearv / lausetearv + ((pikad_sonad * 100) / sonadearv)
    v = [0, 0, 0]
    v[0] = hinnang("smog", SMOG_hinnang)
    v[1] = hinnang("fk", FK_hinnang)
    v[2] = hinnang("lix", LIX_hinnang)
    v.append("/".join(list(set(v))))
    return [lausetearv, sonadearv, poly, silpide_arv, pikad_sonad, SMOG_hinnang, FK_hinnang, int(LIX_hinnang)] + v


def puhasta_sonad(words):
    return [word.replace("'", "").replace("*", "").replace("\n", "") for word in words]


def sona_on_eestikeelne(sona):
    return bool(re.fullmatch(eesti_tahestik, sona))


def hinda_mitmekesisust(tekst):
    import valemid_mitmekesisus
    nlp = nlp_tpl
    doc = nlp(tekst)

    words_array = []
    for s_sentence in doc.sentences:
        for w_word in s_sentence.words:
            if w_word.upos not in sona_upos_piirang_mitmekesisus \
                and not (
                w_word.feats is not None and (
                w_word.feats.find("NumForm=Digit") > 0 or w_word.feats.find("Abbr=Yes") >= 0)):
                words_array.append(w_word)

    # sõnade arv kokku
    words_count = len(words_array)
    new_text = ""
    for j in range(0, len(words_array)):
        new_text = new_text + " " + words_array[j].text

    # unikaalsete lemmade massiv
    text_lemmas = []

    for j in range(0, words_count):
        # teksti unikaalsed lemmad
        if words_array[j].lemma:
            if words_array[j].lemma.lower() not in text_lemmas:
                text_lemmas.append(words_array[j].lemma.lower())

    # lemmade arv tekstis
    lemmas_count = len(text_lemmas)

    KLSS = round(lemmas_count / math.sqrt(2 * words_count), 4)
    JLSS = round(lemmas_count / math.sqrt(words_count), 4)
    # MAAS = round((math.log(words_count) - math.log(lemmas_count)) / math.ldexp(math.log(words_count), 2), 4)
    MAAS = 0
    # if words_count < 50:
    #     UBER = 0
    # else:
    #     UBER = round(math.ldexp(math.log(words_count), 2) / (math.log(words_count) - math.log(lemmas_count)), 4)
    UBER = 0
    MTLD = round(valemid_mitmekesisus.mtld_calc(words_array, ttr_threshold=0.72), 4)
    if words_count < 42:
        HDD = 0
    else:
        HDD = round(valemid_mitmekesisus.hdd(words_array, sample_size=42.0), 4)
    # MSTTR = round(valemid_mitmekesisus.msttr(new_text, window_length = 30), 4)
    MSTTR = 0
    return [KLSS, JLSS, MAAS, UBER, MTLD, HDD, MSTTR] + valemid_mitmekesisus.mitmekesisus_kaugused(KLSS, JLSS, MAAS,
                                                                                                   UBER, MTLD, HDD,
                                                                                                   MSTTR) + [
        words_count, lemmas_count]


app.run(host="0.0.0.0", threaded=True, port=5300)
