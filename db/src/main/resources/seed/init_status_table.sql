INSERT INTO core.status (id, status) VALUES
(1, 'DRAFT'),
(2, 'IN_REVIEW'),
(3, 'PUBLISHED'),
(4, 'REJECTED')
ON CONFLICT (id) DO NOTHING;
