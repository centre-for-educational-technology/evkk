import sys
from estnltk import Text
from estnltk.syntax.parsers import VISLCG3Parser

filename = "parsedText-" + sys.argv[1] + ".txt"

parser = VISLCG3Parser()

# Convert file content to Text object
inputText = Text(sys.argv[2])

# Parse and simplify the text
initial_output = parser.parse_text(inputText, return_type='vislcg3')
simplified_output = [ s if s.find("#") == -1 else s[ 0 : s.find("#") ] for s in initial_output ]

# Save the results to a file (to reduce the need to remark the provided text)
output_file = open(filename, "w")
output_file.write('\n'.join(simplified_output))
output_file.close()

# Print the filename (used for clustering)
print(filename)
