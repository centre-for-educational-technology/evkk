ALTER TABLE core.language_level
ALTER COLUMN level TYPE VARCHAR(20);

INSERT INTO core.language_level (id, level, label) VALUES (7, '1-3.klass', 'Algklass');
INSERT INTO core.language_level (id, level, label) VALUES (8, '4-6.klass', 'Põhikooli 1.aste');
INSERT INTO core.language_level (id, level, label) VALUES (9, '7-9.klass', 'Põhikooli 2.aste');
INSERT INTO core.language_level (id, level, label) VALUES (10, '10-12.klass', 'Gümnaasium');
