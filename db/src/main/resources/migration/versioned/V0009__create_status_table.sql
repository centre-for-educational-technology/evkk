CREATE SCHEMA IF NOT EXISTS core;

CREATE TYPE status_name AS ENUM('DRAFT', 'IN_REVIEW', 'PUBLISHED', 'REJECTED');
CREATE TABLE IF NOT EXISTS core.status (
  id SERIAL PRIMARY KEY,
  status status_name
);

ALTER TABLE core.exercise
ADD status_id INTEGER REFERENCES core.status(id);
