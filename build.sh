#!/bin/bash
set -e

echo "Building EVKK ..."

if [[ -z "$BUILD_TARGET" ]]; then
    echo "\$BUILD_TARGET is missing" 1>&2
    exit 1
fi

echo "BUILD_TARGET=$BUILD_TARGET"

# Remove build dir (if exists)
rm -rf ./build/

# Build docker images
docker build . -f ./docker/images/Dockerfile.backend -t evkk-backend --no-cache
docker build . -f ./docker/images/Dockerfile.ui -t evkk-ui --no-cache
docker build . -f ./docker/images/Dockerfile.stanza -t evkk-stanza --no-cache
docker build . -f ./docker/images/Dockerfile.sonarakendus -t evkk-sonarakendus --no-cache
docker build . -f ./docker/images/Dockerfile.me -t evkk-me --no-cache

# Save docker images
mkdir -p ./build/images/
docker save -o ./build/images/evkk-backend.tar evkk-backend
docker save -o ./build/images/evkk-ui.tar evkk-ui
docker save -o ./build/images/evkk-stanza.tar evkk-stanza
docker save -o ./build/images/evkk-sonarakendus.tar evkk-sonarakendus
docker save -o ./build/images/evkk-me.tar evkk-me

# Copy compose files
mkdir -p ./build/compose/
cp ./docker/compose/Caddyfile ./build/compose/Caddyfile
cp ./docker/compose/docker-compose.postgres.yml ./build/compose/docker-compose.postgres.yml
cp ./docker/compose/docker-compose.db.yml ./build/compose/docker-compose.db.yml
cp ./docker/compose/docker-compose.base.yml ./build/compose/docker-compose.base.yml
cp ./docker/compose/docker-compose.${BUILD_TARGET}.yml ./build/compose/docker-compose.yml

# Copy env files and remove `${BUILD_TARGET}_` prefix
mkdir -p ./build/conf/
for file in ./conf/${BUILD_TARGET}_*; do cp "$file" "./build/conf/${file#./conf/${BUILD_TARGET}_}"; done

# Copy run script
cp ./docker/run.sh ./build/run.sh

echo "Build completed"
