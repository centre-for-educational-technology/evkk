from flask import Flask
from flask import request
from flask import Response
from estnltk.syntax.parsers import VISLCG3Parser
from estnltk import Text
import json
import random
import subprocess
import os
import re

app = Flask(__name__)

# Although regex expressions are compiled and cached during usage, could still do before that (Improves performance a little bit)
UNNECESSARY_MARKUP_REGEXP = re.compile('("\s)(L(\w+))')
VERB_AND_ADPOSITION_MARKUP_REGEXP = re.compile('(<cap>|<nom>|<gen>|<part>|<el>|<term>|<kom>|<FinV>|<partic>|<nud>|<tud>|<tav>|<v>|<mata>|<mine>|<Intr>|<NGP-P>|<NGP>|<Part-P>|<Part>|<InfP>|<Ill>|<In>|<El>|<All>|<Ad>|<Abl>|<Tr>|<Ter>|<Es>|<Kom>)(\s)')

def removeUnnecessaryMarkup(value, removeOptionalMarkup):
  valueWithoutUnnecessaryMarkup = re.sub(UNNECESSARY_MARKUP_REGEXP, r'\1<redacted>', value)
  return valueWithoutUnnecessaryMarkup if removeOptionalMarkup == "ei" else re.sub(VERB_AND_ADPOSITION_MARKUP_REGEXP, '<redacted>\2', valueWithoutUnnecessaryMarkup)

def parsi(tekst, eemaldaValikulised):
   inputText = Text(tekst)
   parser = VISLCG3Parser()
   initial_output = parser.parse_text(inputText, return_type='vislcg3')
   simplified_output = [ s if s.find("#") == -1 else removeUnnecessaryMarkup(s[ 0 : s.find("#") ], eemaldaValikulised) for s in initial_output ]
   return "\n".join(simplified_output)

def klasterda(parsitud_tekst, parameetrid):
   fnimi="fail"+str(random.randrange(1, 10000))
   f1=open(fnimi+".txt", "w", encoding="utf-8")
   f1.write(parsitud_tekst)
   f1.close()
   process = subprocess.Popen(
  "java -jar klastrileidja.jar -e -f "+fnimi+".txt "+parameetrid, shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
   stdout, stderr = process.communicate()
   vastus=open(fnimi+".csv").read()
   os.remove(fnimi+".txt")
   os.remove(fnimi+".csv")
   return vastus


@app.route('/parsi', methods=['POST'])
def t2():
   return Response(parsi(request.json["tekst"]), mimetype="text/plain")

@app.route('/klasterda', methods=['POST'])
def t3():
   if request.json.get("parsitud", "puudub")=="jah":
     return Response(klasterda(request.json["tekst"], request.json["parameetrid"]), mimetype="text/plain")
   else:
     return Response(klasterda(parsi(request.json["tekst"], request.json["eemaldaValikulised"]), request.json["parameetrid"]), mimetype="text/plain")


app.run(host="0.0.0.0", port=5100)
