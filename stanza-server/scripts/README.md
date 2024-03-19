# Scripts for compiling vmeta and silbitaja.hfst_oluw

Prerequisites:
- git
- docker
- g++
- gmake
- gawk
- hfst

## compile-vmeta.sh
This script compiles Vabamorf's `vmeta` program, the morphological analyzer necessary for the syllabification process. It also builds the required `et.dct` lexicon.

Before running, make sure that the Python base image version set in `vabamorf.Dockerfile` matches the one set in `/images/evkk-stanza.Dockerfile` to possibly avoid any dependency issues.

## compile-silbitaja.sh
This script compiles the finite state transducer `silbitaja.hfst_oluw` used for syllabification.

## TODO
- Automatically update the Python base image version in `vabamorf.Dockerfile` when `/images/evkk-stanza.Dockerfile` gets updated
- Set up a task to periodically check for updates from repositories used in the scripts

