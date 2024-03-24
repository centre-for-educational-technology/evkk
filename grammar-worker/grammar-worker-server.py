import json
from dataclasses import asdict
from flask import Flask, Response, request
from gec_worker import GEC, read_gec_config
from gec_worker import MultiCorrector
from gec_worker import Speller, read_speller_config
from gec_worker.dataclasses import Request

app = Flask(__name__)

gec_config = read_gec_config('models/GEC-nelb-1.3b.yaml')
gec = GEC(gec_config)

# Load spelling model
speller_config = read_speller_config("models/spell_etnc19_reference_corpus_6000000_web_2019_600000.yaml")
speller = Speller(speller_config)

# Make model list and add models
multi_corrector = MultiCorrector()
multi_corrector.add_corrector(speller)
multi_corrector.add_corrector(gec)


def run_multiple_correction_model(source_text):
    request = Request(text=source_text, language='et')
    response = multi_corrector.process_request(request)
    return asdict(response)


@app.route('/grammarchecker', methods=['POST'])
def grammar_checker():
    source_text = request.json["tekst"]
    text_request = Request(text=source_text, language='et')
    corrected_text = gec.process_request(text_request)
    json_str = json.dumps(asdict(corrected_text))

    return Response(json_str, mimetype='application/json')


@app.route('/spellchecker', methods=['POST'])
def spell_checker():
    source_text = request.json["tekst"]
    text_request = Request(text=source_text, language='et')
    corrected_text = speller.process_request(text_request)
    json_str = json.dumps(asdict(corrected_text))

    return Response(json_str, mimetype='application/json')

    # Run the Flask app on 0.0.0.0:4000


app.run(host="0.0.0.0", threaded=True, port=4000)
