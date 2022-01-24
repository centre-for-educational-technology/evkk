#!/usr/bin/python

import stanza
import sys
import base64
import json

if len(sys.argv) != 2:
  raise Exception("NLP can only take 1 argument")

text = base64.b64decode(sys.argv[1]).decode("utf-8")
nlp = stanza.Pipeline(lang="et", processors="tokenize,pos,lemma", verbose=False)
doc = nlp(text)
result = []
for sentence in doc.sentences:
  for word in sentence.words:
    if word.upos != "PUNCT":
      result.append(word.lemma)

print(json.dumps(result))
