import stanza
import sys
import json

nlp = stanza.Pipeline(lang='et', processors='tokenize,pos')
#doc = nlp(sys.argv[1])
doc = nlp(sys.stdin.readline())
v1 = []
for sentence in doc.sentences:
    #print("lsudr ", sentence.tokens)
    for word in sentence.words:
      #print(dir(token))
      #print(token._upos)
      if word._upos!="PUNCT":
         v1.append(word.text)
#for i, sentence in enumerate(doc.sentences):
    #print(*[f'{token.text}' for token in sentence.tokens], sep=' ')
print(json.dumps(v1))