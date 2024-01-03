#!/bin/bash

# Clone Vabamorf's repository
git clone https://github.com/Filosoft/vabamorf.git vabamorf_github/

# Build Docker image
docker build -t evkk-vabamorf -f evkk-vabamorf.Dockerfile ./

# Create and start a container
docker run --name evkk-vabamorf-container evkk-vabamorf

# Copy the compiled vmeta program to the parent directory
docker cp evkk-vabamorf-container:/usr/src/vabamorf/apps/cmdline/project/unix/vmeta ../

# Stop and remove the container
docker rm -f evkk-vabamorf-container

# Set the working directory for building lexicons
cd vabamorf_github/dct/sh/

# Make scripts executable
chmod +x *.sh

# Build the lexicons
./nullist-uus-sonastik.sh

# Copy the built et.dct lexicon to the parent directory
cp ../binary/et.dct ../../../../

# Navigate to the original directory
cd -

# Remove the cloned repository
rm -rf vabamorf_github/

