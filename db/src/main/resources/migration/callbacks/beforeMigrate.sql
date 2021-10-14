----------------------
-- HELPER FUNCTIONS --
----------------------

create procedure pg_temp.create_role(name text) as
$$
begin
    execute format('create role %s with nologin', name);
exception
    when duplicate_object then null;
    when others then raise;
end;
$$ language plpgsql;

create procedure pg_temp.create_user(name text, password text) as
$$
declare
    current_database_name text;
begin
    select current_database from current_database() into current_database_name;
    begin
        execute format('create user %s with password ''%s''', name, password);
    exception
        when duplicate_object then null;
        when others then raise;
    end;
    execute format('revoke all privileges on database %s from %s', current_database_name, name);
    execute format('grant connect on database %s to %s', current_database_name, name);
end;
$$ language plpgsql;

------------------
-- CREATE USERS --
------------------

call pg_temp.create_user('api_user', '${EVKK_API_DATASOURCE_PASSWORD}');
call pg_temp.create_user('backup_user', '${EVKK_BACKUP_DATASOURCE_PASSWORD}');
--todo: call pg_temp.create_user('daemon_user', '{EVKK_DAEMON_DATASOURCE_PASSWORD}');

------------------
-- CREATE ROLES --
------------------

call pg_temp.create_role('sys_rw');
call pg_temp.create_role('sys_r');

call pg_temp.create_role('core_rw');
call pg_temp.create_role('core_r');

-----------------
-- GRANT ROLES --
-----------------

grant sys_r to backup_user;
grant core_r to backup_user;

grant core_rw to api_user;

-----------------------
-- CONFIGURE SCHEMAS --
-----------------------

drop schema if exists public cascade;

create schema if not exists sys;
grant usage on schema sys to public;

create schema if not exists core;
grant usage on schema core to public;

----------------
-- PRIVILEGES --
----------------

grant select on all table in schema sys to sys_r;

alter default privileges in schema sys grant select, insert, update on tables to group sys_rw;
alter default privileges in schema sys grant usage on sequences to group sys_rw;

alter default privileges in schema sys grant select on tables to group sys_r;
alter default privileges in schema sys grant select on sequences to group sys_r;

alter default privileges in schema core grant select, insert, update on tables to group core_rw;
alter default privileges in schema core grant usage on sequences to group core_rw;
alter default privileges in schema core grant select on tables to group core_r;
alter default privileges in schema core grant select on sequences to group core_r;

----------------
-- EXTENSIONS --
----------------

create extension if not exists "hstore";
create extension if not exists "uuid-ossp";
create extension if not exists "citext";

---------------------------
-- CONFIGURE SEARCH PATH --
---------------------------

do
$$
    declare
        current_database_name text;
    begin
        select current_database from current_database() into current_database_name;
        execute format('alter database %s set search_path to sys', current_database_name);
    end;
$$ language plpgsql;
