# EVKK

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

## Local development

### Requirements
- JDK 11: https://openjdk.java.net/projects/jdk/11/
- Docker engine 20.10+: https://docs.docker.com/get-docker/
- Docker Compose 1.28+: https://docs.docker.com/compose/install/

Making sure, that everything is installed:
- `$ java --version`
- `$ docker --version`
- `$ docker-compose --version`

### Getting started
1. Start docker containers `$ ./run-local.sh` (this can take several minutes first time around).  
   By default, this command will start **all** containers.  
   If you only want to start specific containers, you can do so using docker profiles.  
   For example: `$ COMPOSE_PROFILES=backend,ui ./run-local.sh` will only start backend and ui containers.  
   See all available profiles in `docker-compose.yml` file.
2. Run database migrations and insert seed data: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`
3. Run API module: `$ ./gradlew :api:bootRun` (other modules like `task-scheduler` work in a similar fashion).
4. Open browser at http://localhost:9999

### Database migrations
Database migrations are implemented with Flyway migration tool: https://flywaydb.org/  
For running migrations execute gradle task `db:bootRun`  
All standard Flyway commands are supported (see https://flywaydb.org/documentation/ for more information).  
Also, extra command `seed` has been implemented in order to provide sample data for development environment.  
Please note that seeds are **not** applied in production environment and are only used for demo data.  
For example: run **clean**, **migrate** and **seed** commands: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`  

### Java development
Preferred development tool is IntelliJ IDEA but other widely adopted IDE-s should work as well.  
IntelliJ community edition download: https://www.jetbrains.com/idea/download/  
Make sure you have enabled annotation processing for IntelliJ: `Preferences -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing`  
