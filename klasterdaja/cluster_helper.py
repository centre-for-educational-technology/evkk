import re
import sys
import subprocess

def getClusteringParams():
  return " ".join(sys.argv[3:])

# Output filename is provided via parameters (defaults to "abiandmed.csv" if not provided)
outputFileName = re.sub(".txt", ".csv", sys.argv[2])

process = subprocess.Popen(
  "java -jar klastrileidja.jar " + sys.argv[1] + " " + sys.argv[2] + " " + getClusteringParams(),
  shell=True, stderr=subprocess.PIPE, stdout=subprocess.PIPE)
stdout, stderr = process.communicate()

# Read output from the
outputFile = open(outputFileName, "r")
output = outputFile.readlines()
output = output[:-1]
outputFile.close()

print(output)
