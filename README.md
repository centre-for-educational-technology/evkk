# ELLE / EVKK

ELLE - Eesti keele õppe ja analüüsikeskkond õppiajatele, õpetajatele ja teadlastele.

## Ekraanipildid loodud lahendusest
[Ekraanipildid](https://github.com/diana-vladotsenko/evkk/tree/suvepraktika-screenshots/screenshots)

##  Eesmärk ja lühikirjeldus
Eesmärk oli luua õppevara leht, mis võimaldaks õppematerjalide ja interaktiivsete harjutuste loomist ning jagamist.
Harjutuste alamlehel saab sisselogitud kasutaja lisada harjutusi ning sisselogimata kasutajal on võimalik harjutusi lahendada ja jagada.
Õppematerjalide alamlehel saab sisselogitud kasutaja lisada uusi õppematerjale ning sisselogimata kasutajal on võimalik õppematerjale vaadata ning jagada.

##  Instituut
Projekti on loonud Tallinna Ülikooli digitehnoloogiate instituudi tarkvaraarenduse eriala esimese 
kursuse üliõpilased suvepraktika raames.

[Tallinna ülikooli Digitehnoloogiate instituut](https://www.tlu.ee/dt)

## Kasutatud tehnoloogiad ja nende versioonid
- JDK 11: https://openjdk.java.net/projects/jdk/11/
- Docker Engine 24.x: https://docs.docker.com/get-docker/
- Docker Compose 1.28+: https://docs.docker.com/compose/install/
- NodeJS 16.x: https://nodejs.org
- YARN (classic, 1.22.x): https://yarnpkg.com

# Testid ja testimise tulemus
Testimise tulemus: Kõik testjuhtumid on läbitud ning kriitilised vead on parandatud

  [Testjuhud](https://docs.google.com/document/d/1ocW2yakIuQNlGqa1mBacx0_xcsAvpL4ivgoB3Lv31IU/edit?usp=sharing),
  [Testplaan](https://docs.google.com/document/d/12NAGtziqYqr8AqTLG_ZMgskoH5dAjJja8rdz-rYic9I/edit?usp=sharing)


## Projekti autorite nimed
Agnessa Tund, Riina Kikkas, Sten Reins, Kerli Viitmaa, Diana Vladõtsenko, Patrick Lapimaa

# PAIGALDUSJUHISED

## General recommendations
- All commands should be executed from project's root directory if not stated otherwise.

## Local development

### Requirements
- JDK 11: https://openjdk.java.net/projects/jdk/11/
- Docker Engine 24.x: https://docs.docker.com/get-docker/
- Docker Compose 1.28+: https://docs.docker.com/compose/install/
- NodeJS 16.x: https://nodejs.org
- YARN (classic, 1.22.x): https://yarnpkg.com

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
7. Install H5P Standalone player: `yarn add h5p-standalone` [H5P Standalone Player](https://github.com/tunapanda/h5p-standalone)
8. Add dist folder to ui/public folder [dist](https://drive.google.com/drive/folders/1zgt2HTG2nD2BE2UMSsLGqcMYJp9Tfsqa?usp=sharing)

### Database migrations
Database migrations are implemented with Flyway migration tool: https://flywaydb.org/  
For running migrations execute gradle task `db:bootRun`.  
All standard Flyway commands are supported (see https://flywaydb.org/documentation/ for more information).  
Also, extra command `seed` has been implemented in order to provide sample data for development environment.  
Please note that seeds are **not** applied in production environment and are only used for demo data.  
For example: run **clean**, **migrate** and **seed** commands: `$ ./gradlew :db:bootRun --args 'clean migrate seed'`  

### Java development
Preferred IDE is IntelliJ IDEA but other widely adopted IDE-s should work as well.  
IntelliJ community edition download: https://www.jetbrains.com/idea/download/  

## Corpus license
The Estonian Interlanguage Corpus is licensed under a [Creative Commons Attribution 4.0 International (CC-BY-4.0) License](https://creativecommons.org/licenses/by/4.0/).
Copyright 2024 Tallinn University School of Digital Technologies and the corpus contributors.


