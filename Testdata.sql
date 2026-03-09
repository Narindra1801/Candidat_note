

INSERT INTO t_candidat (id, nom, prenom, matricule) VALUES
(1,'Rakoto','Jean','MAT001'),
(2,'Rabe','Marie','MAT002'),
(3,'Andrianina','Paul','MAT003');


INSERT INTO t_correcteur (id, nom, prenom) VALUES
(1,'Rasoa','Andry'),
(2,'Rasoanaivo','Hery'),
(3,'Rajaonarison','Lala'),
(4,'Rakotondrazaka','Mamy'),
(5,'Ratsimbazafy','Fidy'),
(6,'Rakotomalala','Sofia');


INSERT INTO t_matiere (id, nom) VALUES
(1,'Mathematiques'),
(2,'Physique'),
(3,'Chimie');


INSERT INTO t_resolution (id, nom) VALUES
(1,'plus petit'),
(2,'plus grand'),
(3,'moyenne');


INSERT INTO t_operateur (id, operateur) VALUES
(1,'<'),
(2,'>'),
(3,'=');



INSERT INTO t_parametre (id,id_matiere,id_resolution,id_operateur,seuil) VALUES
(1,1,1,1,8),
(2,1,2,2,7),
(3,2,1,1,6),
(4,2,2,2,3),
(5,3,1,1,12),
(6,3,2,2,10);


INSERT INTO t_note (id_candidat,id_matiere,id_correcteur,note) VALUES
(1,1,1,10.5),
(1,1,2,9),
(1,1,3,13),
(1,2,4,12),
(1,2,5,12),
(1,2,6,12),
(1,3,1,17),
(1,3,2,9),
(1,3,3,14),

(2,1,4,8),
(2,1,5,11),
(2,1,6,9),
(2,2,1,10),
(2,2,2,12),
(2,2,3,11),
(2,3,4,13),
(2,3,5,12),
(2,3,6,14),

(3,1,1,15),
(3,1,2,14),
(3,1,3,16),
(3,2,4,9),
(3,2,5,10),
(3,2,6,11),
(3,3,1,18),
(3,3,2,17),
(3,3,3,16);