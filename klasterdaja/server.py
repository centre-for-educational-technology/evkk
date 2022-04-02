from flask import Flask
from flask import request
from flask import Response
from estnltk.syntax.parsers import VISLCG3Parser
from estnltk import Text
import json
import random
import subprocess
import os

app = Flask(__name__)

def parsi(tekst):
   inputText = Text(tekst)
   parser = VISLCG3Parser()
   initial_output = parser.parse_text(inputText, return_type='vislcg3')
   simplified_output = [ s if s.find("#") == -1 else s[ 0 : s.find("#") ] for s in initial_output ]
   return "\n".join(simplified_output)

def klasterda(parsitud_tekst, parameetrid):
   fnimi="fail"+str(random.randrange(1, 10000))
   f1=open(fnimi+".txt", "w")
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
   print(request.json["tekst"], file=open("puhver2.txt", "w"))
   if request.json.get("parsitud", "puudub")=="jah":
     return Response(klasterda(request.json["tekst"], request.json["parameetrid"]), mimetype="text/plain")
   else:
     return Response(klasterda(parsi(request.json["tekst"]), request.json["parameetrid"]), mimetype="text/plain")


app.run(host="0.0.0.0", port=5100)
