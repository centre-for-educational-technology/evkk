CREATE SCHEMA IF NOT EXISTS core;

CREATE TABLE IF NOT EXISTS core.target_group (
  id SERIAL PRIMARY KEY,
  name VARCHAR(250)
);

CREATE TABLE IF NOT EXISTS core.exercise_target_group (
  id SERIAL PRIMARY KEY,
  exercise_id INTEGER REFERENCES core.exercise(id),
  target_group_id INTEGER REFERENCES core.target_group(id)
);

CREATE TABLE IF NOT EXISTS core.material_target_group (
  id SERIAL PRIMARY KEY,
  material_id INTEGER REFERENCES core.material(id),
  target_group_id INTEGER REFERENCES core.target_group(id)
);
