import os.path
import sys
from estnltk.syntax.parsers import VISLCG3Parser
from estnltk import Text

filename = "parsedText" + sys.argv[1] + ".txt"

# If file with provided UUID exists return the file's content
if os.path.exists(filename):
  file = open(filename, "r")
  print(f.read())
else:
  parser = VISLCG3Parser()

  # Convert file content to Text object
  inputText=Text(sys.argv[2])

  # Parse and simplify the text
  initial_output = parser.parse_text(inputText, return_type='vislcg3')
  simplified_output = [ s if s.find("#") == -1 else s[ 0 : s.find("#") ] for s in initial_output ]

  # Save the results to a file (to reduce the need to remark the provided text)
  output_file = open(filename, "w")
  output_file.write(simplified_output)
  output_file.close()
