INSERT INTO core.category (id, name) VALUES
(1, 'Võõrsõnad'),
(2, 'Kääned'),
(3, 'Kokku- ja lahkukirjutamine'),
(4, 'Suur ja väike algustäht'),
(5, 'Liitlause'),
(6, 'Grammatika'),
(7, 'Tegusõnad ja ajavormid'),
(8, 'Sõnavara ja tähendus'),
(9, 'Sõnajärg lauses'),
(10, 'Täpild ja komad'),
(11, 'Sõnaliigid'),
(12, 'Kuulamine ja arusaamine')
ON CONFLICT (id) DO NOTHING;
