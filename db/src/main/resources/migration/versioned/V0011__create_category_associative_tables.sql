CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.exercise_category (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES core.category(id),
  exercise_id INTEGER REFERENCES core.exercise(id)
);

CREATE TABLE IF NOT EXISTS core.material_category (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES core.category(id),
  material_id INTEGER REFERENCES core.material(id)
);

ALTER TABLE core.material DROP COLUMN category_id;
ALTER TABLE core.exercise DROP COLUMN category_id;
