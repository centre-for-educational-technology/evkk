--------------------------------------------------------------
-- DO NOT PUT ANY SCHEMA/MIGRATION RELATED SCRIPTS HERE!    --
-- THIS FILE IS ONLY MEANT TO INITIALIZE DOCKER ENVIRONMENT --
--                                                          --
-- Ignoring this warning: -30EAP                            --
--------------------------------------------------------------

CREATE USER install    WITH PASSWORD 'password';
CREATE USER test       WITH PASSWORD 'password';
CREATE USER portaluser WITH PASSWORD 'password';

CREATE ROLE sys_rw WITH NOLOGIN;
CREATE ROLE sys_r  WITH NOLOGIN;

CREATE ROLE core_rw WITH NOLOGIN;
CREATE ROLE core_r  WITH NOLOGIN;

CREATE ROLE auth_rw WITH NOLOGIN;
CREATE ROLE auth_r  WITH NOLOGIN;

GRANT sys_rw  TO test;
GRANT core_rw TO test;
GRANT auth_rw TO test;

GRANT sys_r   TO portaluser;
GRANT core_rw TO portaluser;
GRANT auth_rw TO portaluser;

CREATE DATABASE evkk LC_COLLATE='en_US.utf8' LC_CTYPE='en_US.utf8' ENCODING='UTF8' TEMPLATE=template0;
REVOKE ALL ON DATABASE evkk FROM PUBLIC;
ALTER DATABASE evkk SET search_path TO sys;

ALTER USER install WITH SUPERUSER;
GRANT CONNECT ON DATABASE evkk TO test;
GRANT CONNECT ON DATABASE evkk TO portaluser;

\c evkk;
DROP SCHEMA PUBLIC CASCADE;