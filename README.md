# EVKK portal

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

### Running gradle tasks:
- Unix: `$ ./gradlew <tasks>`
- Windows: `$ gradlew.bat <tasks>`

## Local development

### Requirements
- JDK 8: https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
- Docker 18: https://www.docker.com/get-started
- NodeJS: https://nodejs.org
- YARN: https://yarnpkg.com

### Getting started
1. Make sure *docker-compose* is installed correctly (should be OK if installed docker using official installer)  
   Can be checked with `docker-compose --version`  
   More info: https://docs.docker.com/compose/install/
2. Start docker containers `$ docker-compose up --abort-on-container-exit`  
   Ports 5432 (Postgres) and 6379 (Redis) should be now listening  
   You can check via `$ lsof -i :<port>`  
   If you want to remove docker images w/ data and start *from scratch*: `$ docker-compose down` and delete **.data** directory (`$ rm -rf ./.data`).
3. Run database migrations and insert seed data: execute via gradle `db:bootRun -Pargs=clean,migrate,seed`
4. Make sure you have enabled annotation processing for IntelliJ IDEA: `Preferences -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing`
   
### Database migrations
Database migrations are implemented with Flyway migration tool: https://flywaydb.org/  
For running migrations execute gradle task `db:bootRun`.  
Commands can be passed as comma separated list with flag `-Pargs`.  
All standard Flyway commands are supported (see https://flywaydb.org/documentation/ for more information).  
Also extra command `seed` has been implemented in order to provide sample data for development environment.
Please note that seeds are **not** applied in production environment and are only used for demo data.    
For example: run **clean**, **migrate** and **seed** commands under unix: `$ ./gradlew db:bootRun -Pargs=clean,migrate,seed`  
Migration files are located in `./db/migrations/` and seed files are located in `./db/seeds/`  

### Java development
Preferred IDE is IntelliJ IDEA but other widely adopted IDE-s should work just as well  
IntelliJ community edition download: https://www.jetbrains.com/idea/download/
