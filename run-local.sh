#!/bin/bash
set -e
./build-images.sh
COMPOSE_PROFILES=all docker-compose down --remove-orphans && COMPOSE_PROFILES="${COMPOSE_PROFILES:=all}" docker-compose up --build --abort-on-container-exit
