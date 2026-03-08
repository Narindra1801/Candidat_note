package com.exemple.candidat.controller;

import com.exemple.candidat.model.Correcteur;
import com.exemple.candidat.service.CorrecteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/correcteurs")
public class CorrecteurController {

    @Autowired
    private CorrecteurService correcteurService;

    @GetMapping
    public List<Correcteur> getAllCorrecteurs() {
        return correcteurService.getAllCorrecteurs();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Correcteur> getCorrecteurById(@PathVariable Integer id) {
        return correcteurService.getCorrecteurById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Correcteur createCorrecteur(@RequestBody Correcteur correcteur) {
        return correcteurService.saveCorrecteur(correcteur);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Correcteur> updateCorrecteur(@PathVariable Integer id, @RequestBody Correcteur correcteurDetails) {
        return correcteurService.getCorrecteurById(id)
                .map(existingCorrecteur -> {
                    existingCorrecteur.setNom(correcteurDetails.getNom());
                    existingCorrecteur.setPrenom(correcteurDetails.getPrenom());
                    return ResponseEntity.ok(correcteurService.saveCorrecteur(existingCorrecteur));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCorrecteur(@PathVariable Integer id) {
        return correcteurService.getCorrecteurById(id)
                .map(correcteur -> {
                    correcteurService.deleteCorrecteur(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
