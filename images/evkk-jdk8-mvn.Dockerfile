FROM openjdk:8-jdk-bullseye
RUN apt-get update && apt-get install maven -y && apt-get clean
