CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.material_type (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS core.material (
  id SERIAL PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  description VARCHAR(300),
  downloads INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  language_level_id INTEGER REFERENCES core.language_level(id),
  category_id INTEGER REFERENCES core.category(id),
  status_id INTEGER REFERENCES core.status(id) DEFAULT 1,
  material_type_id INTEGER REFERENCES core.material_type(id)
);

CREATE TABLE IF NOT EXISTS core.file_material (
  id SERIAL PRIMARY KEY,
  file_path VARCHAR(500),
  file_size INTEGER,
  file_format VARCHAR(500),
  material_id INTEGER REFERENCES core.material(id)
);

CREATE TABLE IF NOT EXISTS core.link_material (
  id SERIAL PRIMARY KEY,
  url VARCHAR(250),
  material_id INTEGER REFERENCES core.material(id)
);

CREATE TABLE IF NOT EXISTS core.text_material (
  id SERIAL PRIMARY KEY,
  text TEXT,
  word_count INTEGER,
  material_id INTEGER REFERENCES core.material(id)
);

CREATE TABLE IF NOT EXISTS core.video_material (
  id SERIAL PRIMARY KEY,
  video_url VARCHAR(250),
  platform VARCHAR(100),
  embed_code TEXT,
  material_id INTEGER REFERENCES core.material(id)
);
