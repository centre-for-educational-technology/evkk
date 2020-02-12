# EVKK portal

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

### Running gradle tasks:
- Unix: `$ ./gradlew <tasks>`
- Windows: `$ gradlew.bat <tasks>`

## Local development

### Requirements
- JDK 11: https://openjdk.java.net/projects/jdk/11/
- Docker 19: https://www.docker.com/get-started
- NodeJS: https://nodejs.org
- YARN: https://yarnpkg.com

### Getting started
1. Make sure *docker-compose* is installed correctly (should be OK if installed docker using official installer)
   Can be checked with `docker-compose --version`
   More info: https://docs.docker.com/compose/install/
2. Start docker containers `$ docker-compose up`
   Ports 5432 (Postgres) and 6379 (Redis) should be now listening
   You can check via `$ lsof -i :<port>`
   If you want to remove docker images w/ data and start *from scratch*: `$ docker-compose down` and delete **.data** directory (`$ rm -rf ./.docker`).
3. Run database migrations and insert seed data: execute via gradle `:db:bootRun --args 'clean migrate seed'`
4. Make sure you have enabled annotation processing for IntelliJ IDEA: `Preferences -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing`
5. Run UI module: `$ yarn --cwd=./ui install && yarn --cwd=./ui start`
6. Run API module: `$ ./gradlew :api:bootRun`

### Database migrations
Database migrations are implemented with Flyway migration tool: https://flywaydb.org/
For running migrations execute gradle task `db:bootRun`.
All standard Flyway commands are supported (see https://flywaydb.org/documentation/ for more information).
Also extra command `seed` has been implemented in order to provide sample data for development environment.
Please note that seeds are **not** applied in production environment and are only used for demo data.
For example: run **clean**, **migrate** and **seed** commands under unix: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`

### Java development
Preferred IDE is IntelliJ IDEA but other widely adopted IDE-s should work just as well
IntelliJ community edition download: https://www.jetbrains.com/idea/download/
