# EVKK portal

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

### Running gradle tasks:
- Unix: `$ ./gradlew <tasks>`
- Windows: `$ gradlew.bat <tasks>`

## Local development

### Requirements
- JDK 11: https://openjdk.java.net/projects/jdk/11/
- Docker 20+: https://docs.docker.com/get-docker/
- Docker Compose: https://docs.docker.com/compose/install/
- NodeJS: https://nodejs.org
- YARN: https://yarnpkg.com

### Getting started
1. Make sure *docker-compose* is installed correctly: `docker-compose --version`
2. Start docker containers `$ ./run-local.sh` (this can take several minutes first time around).  
   By default, this command will start **all** containers.  
   If you only want to start specific containers, you can do so using docker profiles.  
   For example: `COMPOSE_PROFILES=backend,stanza ./run-local.sh`  
   See all available profiles in `docker-compose.yml` file.
3. Run database migrations and insert seed data: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`
4. Make sure you have enabled annotation processing for IntelliJ IDEA: `Preferences -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing`
5. Run UI module: `$ yarn --cwd=./ui install && yarn --cwd=./ui start`
6. Run API module: `$ ./gradlew :api:bootRun` (other modules like `task-scheduler` work in similar fashion)

### Database migrations
Database migrations are implemented with Flyway migration tool: https://flywaydb.org/  
For running migrations execute gradle task `db:bootRun`.  
All standard Flyway commands are supported (see https://flywaydb.org/documentation/ for more information).  
Also, extra command `seed` has been implemented in order to provide sample data for development environment.  
Please note that seeds are **not** applied in production environment and are only used for demo data.  
For example: run **clean**, **migrate** and **seed** commands: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`  

### Java development
Preferred IDE is IntelliJ IDEA but other widely adopted IDE-s should work just as well.  
IntelliJ community edition download: https://www.jetbrains.com/idea/download/  
