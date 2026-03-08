CREATE DATABASE candidat;

\c candidat;

CREATE TABLE t_correcteur(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL
);

CREATE TABLE t_candidat(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    matricule VARCHAR(100) NOT NULL
);

CREATE TABLE t_matiere(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE t_resolution(
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);

CREATE TABLE t_operateur(
    id SERIAL PRIMARY KEY,
    operateur VARCHAR(1) NOT NULL
);

CREATE TABLE t_parametre(
    id SERIAL PRIMARY KEY,
    id_matiere INTEGER NOT NULL,
    id_operateur INTEGER NOT NULL,
    id_resolution INTEGER NOT NULL,
    seuil Float NOT NULL,
    FOREIGN KEY (id_matiere) REFERENCES t_matiere(id),
    FOREIGN KEY (id_resolution) REFERENCES t_resolution(id),
    FOREIGN KEY (id_operateur) REFERENCES t_operateur(id)
);

CREATE TABLE t_note(
    id SERIAL PRIMARY KEY,
    id_candidat INTEGER NOT NULL,
    id_matiere INTEGER NOT NULL,
    id_correcteur INTEGER NOT NULL,
    note Float NOT NULL,
    FOREIGN KEY (id_matiere) REFERENCES t_matiere(id),
    FOREIGN KEY (id_candidat) REFERENCES t_candidat(id),
    FOREIGN KEY (id_correcteur) REFERENCES t_correcteur(id)
);