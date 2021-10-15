#!/bin/bash
set -e

echo "Running DB backup ..."
docker exec -it evkk-postgres sh -c "pg_dump evkk -U db_user -f backup.sql -v"
echo "DB done ..."
