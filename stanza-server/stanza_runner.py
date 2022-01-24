#!/usr/bin/python

import stanza
import sys
import base64
import json

def lemmatize(text):
  nlp = stanza.Pipeline(lang="et", processors="tokenize,pos,lemma", verbose=False)
  doc = nlp(text)
  result = []
  for sentence in doc.sentences:
    for word in sentence.words:
      if word.upos != "PUNCT":
        result.append(word.lemma)
  return result

def run_tool(tool, text):
  if (tool == "lemmatize"):
    return lemmatize(text)
  raise Exception(f"Unknown tool {tool}")

def main(args):
  if len(args) != 2:
    raise Exception(f"Expected exactly 2 arguments, got: {len(args)}")
  tool = args[0]
  text = base64.b64decode(args[1]).decode("utf-8")
  result = run_tool(tool, text)
  return json.dumps(result)

if __name__ == "__main__":
  args = sys.argv[1:]
  print(main(args))
