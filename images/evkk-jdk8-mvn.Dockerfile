FROM openjdk:8-jdk-stretch
RUN apt-get update -q && apt-get install maven -y -q && apt-get clean -q
