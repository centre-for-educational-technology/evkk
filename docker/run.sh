#!/bin/bash
set -e

echo "Running EVKK ..."
for file in ./images/*.tar; do docker load -i ${file}; done
docker-compose -f compose/docker-compose.base.yml -f compose/docker-compose.yml up
