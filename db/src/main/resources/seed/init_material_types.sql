INSERT INTO core.material_type (id, type) VALUES
(1, 'File'),
(2, 'Link'),
(3, 'Text'),
(4, 'Video')
ON CONFLICT (id) DO NOTHING;
