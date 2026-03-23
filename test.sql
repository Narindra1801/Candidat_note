-- Insertion des correcteurs
INSERT INTO t_correcteur (nom, prenom) VALUES
('Martin', 'Sophie'),
('Dubois', 'Pierre'),
('Bernard', 'Claire'),
('Petit', 'Thomas');

-- Insertion des candidats
INSERT INTO t_candidat (nom, prenom, matricule) VALUES
('Leroy', 'Emma', 'CAND001'),
('Moreau', 'Lucas', 'CAND002'),
('Fournier', 'Chloé', 'CAND003'),
('Girard', 'Hugo', 'CAND004'),
('Bonnet', 'Léa', 'CAND005'),
('Roux', 'Nathan', 'CAND006');

-- Insertion des matières
INSERT INTO t_matiere (nom) VALUES
('Mathématiques'),
('Physique'),
('Français'),
('Anglais'),
('Histoire'),
('Informatique');

-- Insertion des types de résolution
INSERT INTO t_resolution (nom) VALUES
('le plus petit'),
('le plus grand'),
('la moyenne');

-- Insertion des opérateurs de comparaison
INSERT INTO t_operateur (operateur) VALUES
('>'),
('<');

-- Insertion des paramètres (seuils par matière)
INSERT INTO t_parametre (id_matiere, id_operateur, id_resolution, seuil) VALUES
(1, 1, 1, 10.0),  -- Maths: la plus petite note > 10
(1, 2, 2, 12.0),  -- Maths: la plus grande note < 12
(2, 1, 3, 8.0),   -- Physique: la moyenne > 8
(2, 2, 1, 15.0),  -- Physique: la plus petite note < 15
(3, 1, 2, 12.0),  -- Français: la plus grande note > 12
(3, 2, 3, 14.0),  -- Français: la moyenne < 14
(4, 1, 1, 10.0),  -- Anglais: la plus petite note > 10
(4, 2, 2, 18.0),  -- Anglais: la plus grande note < 18
(5, 1, 3, 12.0),  -- Histoire: la moyenne > 12
(5, 2, 1, 8.0),   -- Histoire: la plus petite note < 8
(6, 1, 2, 15.0),  -- Informatique: la plus grande note > 15
(6, 2, 3, 10.0);  -- Informatique: la moyenne < 10

-- Insertion des notes
INSERT INTO t_note (id_candidat, id_matiere, id_correcteur, note) VALUES
-- Notes pour Emma Leroy (id_candidat=1)
(1, 1, 1, 14.5),  -- Emma - Maths - Sophie Martin
(1, 2, 2, 12.0),  -- Emma - Physique - Pierre Dubois
(1, 3, 3, 15.5),  -- Emma - Français - Claire Bernard
(1, 4, 4, 16.0),  -- Emma - Anglais - Thomas Petit
(1, 5, 1, 13.0),  -- Emma - Histoire - Sophie Martin
(1, 6, 2, 17.5),  -- Emma - Informatique - Pierre Dubois

-- Notes pour Lucas Moreau (id_candidat=2)
(2, 1, 2, 8.5),   -- Lucas - Maths - Pierre Dubois
(2, 2, 3, 9.0),   -- Lucas - Physique - Claire Bernard
(2, 3, 4, 12.0),  -- Lucas - Français - Thomas Petit
(2, 4, 1, 14.5),  -- Lucas - Anglais - Sophie Martin
(2, 5, 2, 10.5),  -- Lucas - Histoire - Pierre Dubois
(2, 6, 3, 11.0),  -- Lucas - Informatique - Claire Bernard

-- Notes pour Chloé Fournier (id_candidat=3)
(3, 1, 4, 16.0),  -- Chloé - Maths - Thomas Petit
(3, 2, 1, 14.0),  -- Chloé - Physique - Sophie Martin
(3, 3, 2, 18.5),  -- Chloé - Français - Pierre Dubois
(3, 4, 3, 19.0),  -- Chloé - Anglais - Claire Bernard
(3, 5, 4, 15.5),  -- Chloé - Histoire - Thomas Petit
(3, 6, 1, 16.5),  -- Chloé - Informatique - Sophie Martin

-- Notes pour Hugo Girard (id_candidat=4)
(4, 1, 2, 11.5),  -- Hugo - Maths - Pierre Dubois
(4, 2, 3, 10.0),  -- Hugo - Physique - Claire Bernard
(4, 3, 4, 9.5),   -- Hugo - Français - Thomas Petit
(4, 4, 1, 13.0),  -- Hugo - Anglais - Sophie Martin
(4, 5, 2, 14.0),  -- Hugo - Histoire - Pierre Dubois
(4, 6, 3, 12.5),  -- Hugo - Informatique - Claire Bernard

-- Notes pour Léa Bonnet (id_candidat=5)
(5, 1, 4, 13.0),  -- Léa - Maths - Thomas Petit
(5, 2, 1, 15.0),  -- Léa - Physique - Sophie Martin
(5, 3, 2, 14.5),  -- Léa - Français - Pierre Dubois
(5, 4, 3, 12.0),  -- Léa - Anglais - Claire Bernard
(5, 5, 4, 17.0),  -- Léa - Histoire - Thomas Petit
(5, 6, 1, 14.0),  -- Léa - Informatique - Sophie Martin

-- Notes pour Nathan Roux (id_candidat=6)
(6, 1, 2, 7.5),   -- Nathan - Maths - Pierre Dubois
(6, 2, 3, 8.5),   -- Nathan - Physique - Claire Bernard
(6, 3, 4, 11.0),  -- Nathan - Français - Thomas Petit
(6, 4, 1, 9.0),   -- Nathan - Anglais - Sophie Martin
(6, 5, 2, 12.5),  -- Nathan - Histoire - Pierre Dubois
(6, 6, 3, 10.0);  -- Nathan - Informatique - Claire Bernard
