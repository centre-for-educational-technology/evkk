import stanza
import sys
import json

nlp = stanza.Pipeline(lang='et', processors='tokenize,pos,lemma')
doc = nlp(sys.stdin.readline())
v1 = []
for sentence in doc.sentences:
    for word in sentence.words:
        if word._upos!="PUNCT":
            v1.append(word.lemma)
print(json.dumps(v1))