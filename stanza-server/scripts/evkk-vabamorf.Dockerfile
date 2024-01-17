# Set the base image as Debian 10 (Buster), which comes with glibc version 2.28
FROM debian:buster

# Install build tools and dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libjsoncpp-dev

# Copy Vabamorf's source code into the container
COPY vabamorf_github/ /usr/src/vabamorf/

# Set the working directory for compiling programs
WORKDIR /usr/src/vabamorf/apps/cmdline/project/unix/

# Compile the vmeta program
RUN make -s vmeta

