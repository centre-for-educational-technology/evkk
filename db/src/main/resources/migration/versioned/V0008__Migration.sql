ALTER TABLE core.text
  ADD CONSTRAINT text_hash_unique UNIQUE (hash);
