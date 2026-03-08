package com.exemple.candidat.controller;

import com.exemple.candidat.model.Note;
import com.exemple.candidat.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notes")
public class NoteController {

    @Autowired
    private NoteService service;

    @GetMapping
    public List<Note> getAll() {
        return service.getAll();
    }

    @GetMapping("/candidat/{candidatId}")
    public List<Note> getByCandidatId(@PathVariable Integer candidatId) {
        return service.getByCandidatId(candidatId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getById(@PathVariable Integer id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Note create(@RequestBody Note note) {
        return service.save(note);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Note> update(@PathVariable Integer id, @RequestBody Note noteDetails) {
        return service.getById(id)
                .map(existing -> {
                    existing.setCandidat(noteDetails.getCandidat());
                    existing.setMatiere(noteDetails.getMatiere());
                    existing.setCorrecteur(noteDetails.getCorrecteur());
                    existing.setNote(noteDetails.getNote());
                    return ResponseEntity.ok(service.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        return service.getById(id)
                .map(n -> {
                    service.delete(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
