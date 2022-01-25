#!/usr/bin/python

import subprocess
import base64
import json

# So what is happening here? Why is stanza being called using subprocess interface?
# At the time of writing docker + flask + stanza combination has a really bad memory leak.
# Maybe in the future we can use stanza API directly, but for the time being we need this workaround.
# Without using this technique, server can use up all system memory and crash within a couple of minutes.
# Using subprocess means that stanza has to be re-initialized for every call but that is a tradeoff we need
# to make in order to avoid memory problems.
def _call_stanza_runner(tool, text):
  input = base64.b64encode(text.encode("utf-8"))
  result = subprocess.run(["python", "/app/stanza_runner.py", tool, input], stdout=subprocess.PIPE)
  result.check_returncode()
  stdout = result.stdout.decode("utf-8")
  return json.loads(stdout)

def lemmatize(text):
  return _call_stanza_runner("lemmatize", text)
