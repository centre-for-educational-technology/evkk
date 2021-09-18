#!/bin/bash
set -e

BUILD_TARGET=demo #TODO:

# Remove build dir (if exists)
rm -rf ./build/

# Build docker images
docker build . -f ./docker/images/Dockerfile.backend -t evkk-backend --no-cache
docker build . -f ./docker/images/Dockerfile.ui -t evkk-ui --no-cache

# Copy compose files
mkdir -p ./build/compose/
cp -r ./docker/compose/ ./build/compose

# Save docker images
mkdir -p ./build/images/
docker save -o ./build/images/evkk-backend.tar evkk-backend
docker save -o ./build/images/evkk-ui.tar evkk-ui

# Copy env files and remove `${BUILD_TARGET}_` prefix
mkdir -p ./build/conf/
for file in ./conf/${BUILD_TARGET}_*; do cp "$file" "./build/conf/${file#./conf/${BUILD_TARGET}_}"; done

# Copy run script
cp ./docker/run.sh ./build/run.sh
