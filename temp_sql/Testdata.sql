INSERT INTO t_candidat (id, nom, prenom, matricule) VALUES
(1,'Candidat1','Jean','MAT001'),
(2,'Candidat2','Marie','MAT002');


INSERT INTO t_correcteur (id, nom, prenom) VALUES
(1,'Correcteur1','Andry'),
(2,'Correcteur2','Hery'),
(3,'Correcteur3','Lala');


INSERT INTO t_matiere (id, nom) VALUES
(1,'JAVA'),
(2,'PHP');


INSERT INTO t_resolution (id, nom) VALUES
(1,'plus petit'),
(2,'plus grand'),
(3,'moyenne');


INSERT INTO t_operateur (id, operateur) VALUES
(1,'<'),
(2,'<='),
(3,'>'),
(4, '>=');



INSERT INTO t_parametre (id,id_matiere,id_resolution,id_operateur,seuil) VALUES
(1,1,2,1,7),
(2,1,3,4,7),
(3,2,1,2,2),
(4,2,2,3,2);


INSERT INTO t_note (id_candidat,id_matiere,id_correcteur,note) VALUES
(1,1,1,14.0),
(1,1,2,8.0),
(1,2,1,7),
(1,2,2,11),
(2,1,1,15.0),
(2,1,2,8.0),
(2,2,1,14),
(2,2,2,14);
