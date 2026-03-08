package com.exemple.candidat.controller;

import com.exemple.candidat.model.Matiere;
import com.exemple.candidat.service.MatiereService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matieres")
public class MatiereController {

    @Autowired
    private MatiereService matiereService;

    @GetMapping
    public List<Matiere> getAllMatieres() {
        return matiereService.getAllMatieres();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Matiere> getMatiereById(@PathVariable Integer id) {
        return matiereService.getMatiereById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Matiere createMatiere(@RequestBody Matiere matiere) {
        return matiereService.saveMatiere(matiere);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Matiere> updateMatiere(@PathVariable Integer id, @RequestBody Matiere matiereDetails) {
        return matiereService.getMatiereById(id)
                .map(existingMatiere -> {
                    existingMatiere.setNom(matiereDetails.getNom());
                    return ResponseEntity.ok(matiereService.saveMatiere(existingMatiere));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMatiere(@PathVariable Integer id) {
        return matiereService.getMatiereById(id)
                .map(matiere -> {
                    matiereService.deleteMatiere(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
