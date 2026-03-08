package com.exemple.candidat.controller;

import com.exemple.candidat.model.Candidat;
import com.exemple.candidat.service.CandidatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/candidats")
public class CandidatController {

    @Autowired
    private CandidatService candidatService;

    // Récupérer tous les candidats
    @GetMapping
    public List<Candidat> getAllCandidats() {
        return candidatService.getAllCandidats();
    }

    // Récupérer un candidat par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Candidat> getCandidatById(@PathVariable Integer id) {
        return candidatService.getCandidatById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Ajouter un nouveau candidat
    @PostMapping
    public Candidat createCandidat(@RequestBody Candidat candidat) {
        return candidatService.saveCandidat(candidat);
    }

    // Modifier un candidat existant
    @PutMapping("/{id}")
    public ResponseEntity<Candidat> updateCandidat(@PathVariable Integer id, @RequestBody Candidat candidatDetails) {
        return candidatService.getCandidatById(id)
                .map(existingCandidat -> {
                    existingCandidat.setNom(candidatDetails.getNom());
                    existingCandidat.setPrenom(candidatDetails.getPrenom());
                    existingCandidat.setMatricule(candidatDetails.getMatricule());
                    Candidat updatedCandidat = candidatService.saveCandidat(existingCandidat);
                    return ResponseEntity.ok(updatedCandidat);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Supprimer un candidat
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCandidat(@PathVariable Integer id) {
        return candidatService.getCandidatById(id)
                .map(candidat -> {
                    candidatService.deleteCandidat(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
