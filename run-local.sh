#!/bin/bash
set -e
./build-images.sh
docker-compose down --remove-orphans && docker-compose up --build
