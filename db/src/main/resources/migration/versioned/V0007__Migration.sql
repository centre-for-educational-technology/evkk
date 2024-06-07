-- Add user role

INSERT INTO core.role (name)
VALUES ('USER');

-- Drop old tables

DROP TABLE core.token;
DROP TABLE core.session_token;
DROP TABLE core.group_users;
DROP TABLE core.group;
DROP TABLE core.role_permission;
DROP TABLE core.user_file;
DROP TABLE core.user;

-- Create new tables

CREATE TABLE core.user
(
  user_id        uuid DEFAULT uuid_generate_v4(),
  first_name     text                             NOT NULL,
  last_name      text                             NOT NULL,
  email_address  citext                           NOT NULL,
  id_code        text                             NOT NULL,
  id_code_prefix text                             NOT NULL,
  role_name      text REFERENCES core.role (name) NOT NULL,
  ui_locales     text NULL,

  CONSTRAINT user_pk PRIMARY KEY (user_id),
  CONSTRAINT user_uq_id_code UNIQUE (id_code)
);

CALL core.attach_meta_trigger('core.user');
COMMENT ON TABLE core.user IS 'ELLE user accounts';

CREATE TABLE core.refresh_token
(
  token_id   uuid DEFAULT uuid_generate_v4(),
  token      text                                NOT NULL,
  expires_at timestamptz                         NOT NULL,
  user_id    UUID REFERENCES core.user (user_id) NOT NULL,

  CONSTRAINT refresh_token_pk PRIMARY KEY (token_id)
);

CALL core.attach_meta_trigger('core.refresh_token');
COMMENT ON TABLE core.user IS 'Refresh tokens for ELLE user accounts';
GRANT DELETE ON TABLE core.refresh_token TO api_user;
