INSERT INTO core.material_type (id, type) VALUES
(1, 'FILE'),
(2, 'LINK'),
(3, 'TEXT'),
(4, 'VIDEO')
ON CONFLICT (id) DO NOTHING;
