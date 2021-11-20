#!/bin/bash
set -e
./build-images.sh
docker-compose down --remove-orphans && docker-compose build --no-cache && docker-compose up --always-recreate-deps
