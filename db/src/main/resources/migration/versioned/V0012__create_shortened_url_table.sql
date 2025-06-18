CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.short_url (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50),
  original_url VARCHAR(250),
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);
