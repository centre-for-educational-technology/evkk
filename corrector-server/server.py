import jamspell
import json
from flask import Flask
from flask import Response
from flask import request

corrector = jamspell.TSpellCorrector()
corrector.LoadLangModel("/app/jamspell.et.bin")
app = Flask(__name__)


@app.route('/korrektuur', methods=['POST'])
def korrektuur():
    correction = corrector.FixFragment(request.json["tekst"])
    return Response(json.dumps([correction, request.json["tekst"]]), mimetype="application/json")


app.run(host="0.0.0.0", threaded=True, port=5200)
