#!/bin/bash

# Clone the ELG Syllabifier repository
git clone https://gitlab.com/tilluteenused/docker_elg_syllabifier.git

# Set the working directory for compiling the syllabifier
(
cd docker_elg_syllabifier/ || exit

# Compile the XFST script
echo 'save stack silbitaja.hfst' | hfst-xfst -l silbita.xfscript

# Convert the transducer to efficient lookup format
hfst-fst2fst -O -i silbitaja.hfst -o silbitaja.hfst_oluw

# Move the optimized transducer to the parent directory
mv silbitaja.hfst_oluw ../../
)

# Remove the cloned repository
rm -rf docker_elg_syllabifier/
