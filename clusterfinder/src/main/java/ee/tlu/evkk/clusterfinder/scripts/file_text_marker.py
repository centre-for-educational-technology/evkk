import sys
from estnltk.syntax.parsers import VISLCG3Parser
from estnltk import Text

filename = "parsedText" + sys.argv[2] + ".txt"

# Retrieve file via called arguments
inputFile = open(sys.arv[1], "r")

# Convert file content to Text object
inputText=Text(inputFile.read())

parser = VISLCG3Parser()

# Parse and simplify the text
initial_output = parser.parse_text(text, return_type='vislcg3')
simplified_output = [ s if s.find("#") == -1 else s[ 0 : s.find("#") ] for s in initial_output ]

# Output the contents to another file
outputFile = open(filename, "w")
outputFile.write(simplified_output)
outputFile.close()
