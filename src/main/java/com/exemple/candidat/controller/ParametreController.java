package com.exemple.candidat.controller;

import com.exemple.candidat.model.Parametre;
import com.exemple.candidat.service.ParametreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/parametres")
public class ParametreController {

    @Autowired
    private ParametreService service;

    @GetMapping
    public List<Parametre> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Parametre> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Parametre create(@RequestBody Parametre parametre) {
        return service.save(parametre);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Parametre> update(@PathVariable Integer id, @RequestBody Parametre parametreDetails) {
        return service.getById(id)
                .map(existing -> {
                    existing.setMatiere(parametreDetails.getMatiere());
                    existing.setOperateur(parametreDetails.getOperateur());
                    existing.setResolution(parametreDetails.getResolution());
                    existing.setSeuil(parametreDetails.getSeuil());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        return service.getById(id)
                .map(p -> {
                    service.delete(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
