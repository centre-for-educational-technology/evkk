#!/bin/bash
set -e

docker build . -f ./images/evkk-stanza.Dockerfile -t evkk-stanza
docker build . -f ./images/evkk-estnltk141.Dockerfile -t evkk-estnltk141
docker build . -f ./images/evkk-jdk8-mvn.Dockerfile -t evkk-jdk8-mvn