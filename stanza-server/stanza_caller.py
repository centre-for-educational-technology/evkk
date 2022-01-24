#!/usr/bin/python

import subprocess
import base64
import json

def call_stanza_runner(tool, text):
  input = base64.b64encode(text.encode("utf-8"))
  result = subprocess.run(["python", "/app/stanza_runner.py", tool, input], stdout=subprocess.PIPE)
  result.check_returncode()
  stdout = result.stdout.decode("utf-8")
  return json.loads(stdout)
