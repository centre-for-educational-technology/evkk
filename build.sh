#!/bin/bash
set -e

# Remove build dir (if exists)
#rm -rf ./build/

# Build docker images
#docker build . -f ./docker/Dockerfile.backend -t evkk-backend --no-cache
#docker build . -f ./docker/Dockerfile.ui -t evkk-ui --no-cache

# Copy compose files
#mkdir -p ./build/compose/
#cp -r ./docker/compose/ ./build/compose/

# Save docker images
#mkdir -p ./build/images/
#docker save -o ./build/images/evkk-backend.tar evkk-backend
#docker save -o ./build/images/evkk-ui.tar evkk-ui

# Copy env files and remove prefix
mkdir -p ./build/conf/
for file in ./conf/demo_*; do cp "$file" "build/conf/${file#./conf/demo_}";done;
