#!/bin/bash
set -e
docker exec -it evkk-postgres sh -c "pg_dump evkk -U db_user"
