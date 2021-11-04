#!/bin/bash
set -e
docker exec -t evkk-postgres sh -c "pg_dump evkk -U db_user"
