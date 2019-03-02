import sys
from estnltk import Text

if(len(sys.argv) < 2): print("ErrNo1")
else: print(Text(str(sys.argv[1])).postags)