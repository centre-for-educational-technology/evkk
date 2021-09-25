#!/bin/bash
set -e

BUILD_TARGET=prod #TODO:
echo "Building EVKK ..."

# Remove build dir (if exists)
rm -rf ./build/

# Build docker images
docker build . -f ./docker/images/Dockerfile.backend -t evkk-backend --no-cache
docker build . -f ./docker/images/Dockerfile.ui -t evkk-ui --no-cache

# Save docker images
mkdir -p ./build/images/
docker save -o ./build/images/evkk-backend.tar evkk-backend
docker save -o ./build/images/evkk-ui.tar evkk-ui

# Copy compose files
mkdir -p ./build/compose/
cp ./docker/compose/Caddyfile ./build/compose/Caddyfile
cp ./docker/compose/docker-compose.base.yml ./build/compose/docker-compose.base.yml
cp ./docker/compose/docker-compose.${BUILD_TARGET}.yml ./build/compose/docker-compose.yml

# Copy env files and remove `${BUILD_TARGET}_` prefix
mkdir -p ./build/conf/
for file in ./conf/${BUILD_TARGET}_*; do cp "$file" "./build/conf/${file#./conf/${BUILD_TARGET}_}"; done

# Copy run script
cp ./docker/run.sh ./build/run.sh
