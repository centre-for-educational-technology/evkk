#!/bin/bash

# Clone the Vabamorf repository
git clone https://github.com/Filosoft/vabamorf.git

# Build the Docker image
docker build -t vabamorf -f vabamorf.Dockerfile ./

# Create and start a container
docker run --name vabamorf-container vabamorf

# Copy the compiled vmeta program to the parent directory
docker cp vabamorf-container:/usr/src/vabamorf/apps/cmdline/project/unix/vmeta ../

# Stop and remove the container
docker rm -f vabamorf-container

# Set the working directory for building lexicons
(
cd vabamorf/dct/sh/ || exit

# Make scripts executable
chmod +x ./*.sh

# Build the lexicons
./nullist-uus-sonastik.sh

# Copy the built et.dct lexicon to the parent directory
cp ../binary/et.dct ../../../../
)

# Remove the cloned repository
rm -rf vabamorf/
