#!/bin/bash
set -e
./build-images.sh && docker-compose up --build --remove-orphans
