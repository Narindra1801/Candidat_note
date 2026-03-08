-- Supprimer les données dans l'ordre inverse des dépendances
DELETE FROM t_note;
DELETE FROM t_parametre;
DELETE FROM t_operateur;
DELETE FROM t_resolution;
DELETE FROM t_matiere;
DELETE FROM t_candidat;
DELETE FROM t_correcteur;

-- Réinitialiser les séquences d'auto-incrémentation (optionnel mais recommandé)
ALTER SEQUENCE t_note_id_seq RESTART WITH 1;
ALTER SEQUENCE t_parametre_id_seq RESTART WITH 1;
ALTER SEQUENCE t_operateur_id_seq RESTART WITH 1;
ALTER SEQUENCE t_resolution_id_seq RESTART WITH 1;
ALTER SEQUENCE t_matiere_id_seq RESTART WITH 1;
ALTER SEQUENCE t_candidat_id_seq RESTART WITH 1;
ALTER SEQUENCE t_correcteur_id_seq RESTART WITH 1;