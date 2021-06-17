import stanza
import sys
import json

nlp = stanza.Pipeline(lang='et', processors='tokenize')
doc = nlp(sys.stdin.readline())
v1 = []
for sentence in doc.sentences:
    v2 = []
    v2.append(sentence.text)
    v1.append(v2)
print(json.dumps(v1))