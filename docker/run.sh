#!/bin/bash
set -e

echo "Running EVKK ..."

echo "Load images"
for file in ./images/*.tar; do docker load -i ${file}; done
echo "Loading images done"

echo "Stopping services"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.base.yml -f compose/docker-compose.yml down --remove-orphans
echo "Stopping services done"

echo "Running database migrations"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.db.yml -f compose/docker-compose.yml up --abort-on-container-exit --exit-code-from db
echo "Running database migrations done"

echo "Starting services"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.base.yml -f compose/docker-compose.yml up -d
echo "Starting services done"
