INSERT INTO core.language_level (id, level, label) VALUES
(1, 'A1', 'Algajatele'),
(2, 'A2', 'Algajatele'),
(3, 'B1', 'Kesktasemele'),
(4, 'B2', 'Kesktasemele'),
(5, 'C1', 'Edasijõudnutele'),
(6, 'C2', 'Edasijõudnutele')
ON CONFLICT (id) DO NOTHING;
