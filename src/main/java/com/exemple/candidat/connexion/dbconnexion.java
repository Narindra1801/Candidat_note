package com.exemple.candidat.connexion;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class dbconnexion {

    private static final String URL = "jdbc:postgresql://localhost:5432/candidat";
    // Mettez le vrai nom d'utilisateur et mot de passe de votre base Postgres ici
    private static final String USER = "postgres";
    private static final String PASSWORD = "postgres"; 

    public static Connection getConnection() {
        Connection connection = null;
        try {
            Class.forName("org.postgresql.Driver");
            connection = DriverManager.getConnection(URL, USER, PASSWORD);
            System.out.println("Connexion à PostgreSQL réussie !");
        } catch (ClassNotFoundException e) {
            System.out.println("Erreur : Driver PostgreSQL introuvable.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Erreur : Impossible de se connecter à la base de données.");
            e.printStackTrace();
        }
        return connection;
    }
}
