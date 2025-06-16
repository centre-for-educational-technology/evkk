INSERT INTO core.target_group (id, name) VALUES
(1, 'Emakeel'),
(2, 'Eesti keel teise keelena')
ON CONFLICT (id) DO NOTHING;
