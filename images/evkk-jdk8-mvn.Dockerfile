FROM openjdk:8-jdk-stretch
RUN apt-get update && apt-get install maven -y
