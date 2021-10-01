#!/bin/bash
set -e

echo "Running EVKK ..."

echo "System cleanup"
docker system prune -f

echo "Load new images"
for file in ./images/*.tar; do docker load -i ${file}; done

echo "Running database migrations"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.db.yml -f compose/docker-compose.yml up --abort-on-container-exit --exit-code-from db

echo "Stopping services"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.base.yml -f compose/docker-compose.yml down

echo "Starting services"
docker-compose -f compose/docker-compose.postgres.yml -f compose/docker-compose.base.yml -f compose/docker-compose.yml up -d
