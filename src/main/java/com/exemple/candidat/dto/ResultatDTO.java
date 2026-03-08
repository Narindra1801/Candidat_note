package com.exemple.candidat.dto;

public class ResultatDTO {
    private String nomCandidat;
    private String prenomCandidat;
    private String matricule;
    private String nomMatiere;
    private Double noteCalculee;
    private Double seuil;
    private String operateur;
    private String status; // "Admis" ou "Ajourné"

    public ResultatDTO() {}

    public String getNomCandidat() { return nomCandidat; }
    public void setNomCandidat(String nomCandidat) { this.nomCandidat = nomCandidat; }
    public String getPrenomCandidat() { return prenomCandidat; }
    public void setPrenomCandidat(String prenomCandidat) { this.prenomCandidat = prenomCandidat; }
    public String getMatricule() { return matricule; }
    public void setMatricule(String matricule) { this.matricule = matricule; }
    public String getNomMatiere() { return nomMatiere; }
    public void setNomMatiere(String nomMatiere) { this.nomMatiere = nomMatiere; }
    public Double getNoteCalculee() { return noteCalculee; }
    public void setNoteCalculee(Double noteCalculee) { this.noteCalculee = noteCalculee; }
    public Double getSeuil() { return seuil; }
    public void setSeuil(Double seuil) { this.seuil = seuil; }
    public String getOperateur() { return operateur; }
    public void setOperateur(String operateur) { this.operateur = operateur; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
