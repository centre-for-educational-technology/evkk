#!/bin/bash
set -e

docker build . -f ./images/evkk-stanza.Dockerfile -t evkk-stanza --no-cache
docker build . -f ./images/evkk-estnltk141.Dockerfile -t evkk-estnltk141 --no-cache
docker build . -f ./images/evkk-jdk8-mvn.Dockerfile -t evkk-jdk8-mvn --no-cache
