-- Alter user table

ALTER TABLE core.user
  DROP COLUMN password_hash;

ALTER TABLE core.user
  DROP COLUMN created_at;

ALTER TABLE core.user
  ADD COLUMN id_code TEXT NOT NULL;

ALTER TABLE core.user
  ADD COLUMN id_code_prefix TEXT NOT NULL;

ALTER TABLE core.user
  ADD COLUMN first_name TEXT NOT NULL;

ALTER TABLE core.user
  ADD COLUMN last_name TEXT NOT NULL;

ALTER TABLE core.user
  ADD COLUMN ui_locales TEXT NOT NULL;

ALTER TABLE core.user
  DROP CONSTRAINT user_uq_email_address;

ALTER TABLE core.user
  ALTER COLUMN email_address DROP NOT NULL;

ALTER TABLE core.user
  ADD CONSTRAINT user_uq_id_code UNIQUE (id_code);

COMMENT ON TABLE core.user IS 'EVKK user accounts';

COMMENT ON COLUMN core.user.email_address IS NULL;

-- Alter token table

ALTER TABLE core.token
  DROP CONSTRAINT token_ck_type;

ALTER TABLE core.token
  DROP COLUMN data;

ALTER TABLE core.token
  DROP COLUMN type;

ALTER TABLE core.token
  DROP COLUMN validity;

ALTER TABLE core.token
  DROP COLUMN consumed_at;

ALTER TABLE core.token
  DROP COLUMN created_at;

ALTER TABLE core.token
  ADD COLUMN token TEXT NOT NULL;

ALTER TABLE core.token
  ADD COLUMN expires_at timestamptz NOT NULL;

ALTER TABLE core.token
  ADD COLUMN user_id UUID NOT NULL REFERENCES core.user (user_id);

COMMENT ON TABLE core.token IS 'Refresh tokens with expiration timestamps';

GRANT DELETE ON TABLE core.token TO api_user;

ALTER TABLE core.token
  RENAME TO refresh_token;

-- Add user role

INSERT INTO core.role
VALUES (gen_random_uuid(), 'USER');

-- Drop role permissions table

DROP TABLE core.role_permission;
