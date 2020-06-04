create user db_user with password 'password';
create user api_user with password 'password';
create user daemon_user with password 'password';
create user test_user with password 'password';
alter user db_user with superuser;

create role core_rw with nologin;
create role core_r with nologin;

create role sys_rw with nologin;
create role sys_r with nologin;

grant core_rw to api_user;
grant core_rw to daemon_user;
grant core_rw to test_user;

create database evkk lc_collate = 'en_US.utf8' lc_ctype = 'en_US.utf8' encoding = 'UTF8' template = template0;
drop schema public cascade;
alter database evkk set search_path to sys, core;

grant connect on database evkk to db_user;
grant connect on database evkk to api_user;
grant connect on database evkk to daemon_user;
grant connect on database evkk to test_user;
