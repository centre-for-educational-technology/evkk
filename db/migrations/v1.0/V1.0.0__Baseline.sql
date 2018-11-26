----------------
-- EXTENSIONS --
----------------

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"  SCHEMA sys;
CREATE EXTENSION IF NOT EXISTS "btree_gist" SCHEMA sys;
CREATE EXTENSION IF NOT EXISTS "citext"     SCHEMA sys;

------------------
-- SCHEMA SETUP --
------------------

ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA auth GRANT SELECT, INSERT, UPDATE ON TABLES    TO GROUP auth_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA auth GRANT USAGE                  ON SEQUENCES TO GROUP auth_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA auth GRANT SELECT                 ON TABLES    TO GROUP auth_r;

ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA core GRANT SELECT, INSERT, UPDATE ON TABLES    TO GROUP core_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA core GRANT USAGE                  ON SEQUENCES TO GROUP core_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA core GRANT SELECT                 ON TABLES    TO GROUP core_r;

ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA sys GRANT SELECT, INSERT, UPDATE ON TABLES    TO GROUP sys_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA sys GRANT USAGE                  ON SEQUENCES TO GROUP sys_rw;
ALTER DEFAULT PRIVILEGES FOR ROLE CURRENT_USER IN SCHEMA sys GRANT SELECT                 ON TABLES    TO GROUP sys_r;

GRANT USAGE ON SCHEMA auth TO PUBLIC;
GRANT USAGE ON SCHEMA core TO PUBLIC;
GRANT USAGE ON SCHEMA sys  TO PUBLIC;

---------------
-- FUNCTIONS --
---------------

-- meta field trigger function

CREATE FUNCTION update_meta_field()
RETURNS TRIGGER AS $$
    DECLARE
        now  TEXT = transaction_timestamp()::TEXT;
        user TEXT = current_user::TEXT;
    BEGIN
        NEW._meta = jsonb_object(ARRAY[
          'updated_at', now,
          'updated_by', user,
          'created_at', COALESCE(NEW._meta->>'created_at', now),
          'created_by', COALESCE(NEW._meta->>'created_by', user)
        ]);
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

-- attach meta field trigger function

CREATE FUNCTION attach_meta_trigger(full_table_name REGCLASS)
RETURNS VOID AS $$
  DECLARE
    schema_name TEXT;
    table_name  TEXT;
  BEGIN
    SELECT relnamespace::regnamespace::text, relname::text
      INTO schema_name, table_name
      FROM pg_catalog.pg_class
     WHERE oid = full_table_name;

    EXECUTE FORMAT('ALTER TABLE %1$s.%2$s ADD COLUMN _meta JSONB NOT NULL', schema_name, table_name);
    EXECUTE FORMAT('CREATE TRIGGER %2$s_meta_trigger BEFORE INSERT OR UPDATE ON %1$s.%2$s FOR EACH ROW EXECUTE PROCEDURE update_meta_field()', schema_name, table_name);
  END;
$$ LANGUAGE plpgsql;

-----------------
-- CORE SCHEMA --
-----------------

CREATE TABLE core.user_account (
  user_account_id UUID   PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_address   CITEXT NOT NULL,
  password_hash   TEXT   NOT NULL,

  CONSTRAINT user_account_uq_email_address UNIQUE (email_address)
);

SELECT attach_meta_trigger('core.user_account');

COMMENT ON TABLE  core.user_account               IS 'EVKK user accounts and passwords';
COMMENT ON COLUMN core.user_account.email_address IS 'Unique email address';
COMMENT ON COLUMN core.user_account.password_hash IS 'Password hash';