package com.exemple.candidat.model;

import jakarta.persistence.*;

@Entity
@Table(name = "t_operateur")
public class Operateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 1)
    private String operateur;

    public Operateur() {}

    public Operateur(String operateur) {
        this.operateur = operateur;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getOperateur() { return operateur; }
    public void setOperateur(String operateur) { this.operateur = operateur; }
}
