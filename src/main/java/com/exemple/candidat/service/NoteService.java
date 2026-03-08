package com.exemple.candidat.service;

import com.exemple.candidat.model.Note;
import com.exemple.candidat.repository.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    @Autowired
    private NoteRepository repository;

    public List<Note> getAll() {
        return repository.findAll();
    }

    public List<Note> getByCandidatId(Integer candidatId) {
        return repository.findByCandidatId(candidatId);
    }

    public Optional<Note> getById(Integer id) {
        return repository.findById(id);
    }

    public Note save(Note note) {
        return repository.save(note);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
