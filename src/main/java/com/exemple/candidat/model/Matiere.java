package com.exemple.candidat.model;

import jakarta.persistence.*;

@Entity
@Table(name = "t_matiere")
public class Matiere {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String nom;

    // Constructeurs
    public Matiere() {
    }

    public Matiere(String nom) {
        this.nom = nom;
    }

    // Getters et Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}
