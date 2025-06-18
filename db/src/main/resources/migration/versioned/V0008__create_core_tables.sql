CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.category (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL
);

CREATE TABLE IF NOT EXISTS core.language_level (
  id SERIAL PRIMARY KEY,
  level VARCHAR(4) NOT NULL,
  label VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS core.duration (
  id SERIAL PRIMARY KEY,
  value INTEGER NOT NULL,
  label VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS core.exercise (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  description TEXT,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by_email VARCHAR(250),
  duration_id INTEGER REFERENCES core.duration(id),
  likes INTEGER DEFAULT 0,
  file_path VARCHAR(150),
  language_level_id INTEGER REFERENCES core.language_level(id),
  category_id INTEGER REFERENCES core.category(id),
  external_id VARCHAR(10)
);
