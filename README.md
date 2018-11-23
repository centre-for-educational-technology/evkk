# EVKK portal

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

## Local development

### Requirements
- JDK 8: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Docker 18: https://www.docker.com/get-started

### Running gradle tasks:
- Unix: `$ ./gradlew <tasks>`
- Windows: `$ gradlew.bat <tasks>`

### Getting started
1. Make sure *docker-compose* is installed correctly (should be OK if installed docker using official installer)  
   Can be checked with `docker-compose --version`  
   More info: https://docs.docker.com/compose/install/
2. Start docker containers `$ docker-compose up --abort-on-container-exit`  
   Ports 5432 (Postgres) and 6379 (Redis) should be now listening  
   You can check via `$ lsof -i :<port>`  
   If you want to remove docker images w/ data and start *from scratch*: `$ docker-compose down` and delete **.data** directory (`$ rm -rf ./.data`).

### Java development
Preferred IDE is IntelliJ IDEA but other widely adopted IDE-s should work just as well  
IntelliJ community edition download: https://www.jetbrains.com/idea/download/
