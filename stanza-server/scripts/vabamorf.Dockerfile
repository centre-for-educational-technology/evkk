# Set the base image
FROM python:3.12.2

# Install build tools and dependencies
RUN apt-get update && apt-get install -y build-essential libjsoncpp-dev

# Copy the cloned Vabamorf repository into the container
COPY vabamorf/ /usr/src/vabamorf/

# Set the working directory for compiling programs
WORKDIR /usr/src/vabamorf/apps/cmdline/project/unix/

# Compile the vmeta program
RUN make -s vmeta

