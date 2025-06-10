INSERT INTO core.duration (id, value, label) VALUES
(1, 5, 'Kuni 5'),
(2, 10, 'Kuni 10'),
(3, 15, 'Kuni 15'),
(4, 20, 'Kuni 20'),
(5, 25, 'Kuni 25')
ON CONFLICT (id) DO NOTHING;
