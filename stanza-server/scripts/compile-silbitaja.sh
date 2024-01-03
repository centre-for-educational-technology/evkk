#!/bin/bash

# XFST script from https://www.cl.ut.ee/korpused/silbikorpus/silbita.xfscript

# Compile the XFST script
echo 'save stack silbitaja.hfst' | hfst-xfst -l silbita.xfscript

# Convert the transducer to efficient lookup format
hfst-fst2fst --optimized-lookup-weighted -i silbitaja.hfst -o silbitaja.hfst_olw

# Remove the unoptimized transducer
rm silbitaja.hfst

# Move the optimized transducer to the parent directory
mv silbitaja.hfst_olw ../

