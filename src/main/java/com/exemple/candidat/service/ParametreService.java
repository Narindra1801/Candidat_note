package com.exemple.candidat.service;

import com.exemple.candidat.model.Parametre;
import com.exemple.candidat.repository.ParametreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ParametreService {

    @Autowired
    private ParametreRepository repository;

    public List<Parametre> getAll() {
        return repository.findAll();
    }

    public Optional<Parametre> getById(Integer id) {
        return repository.findById(id);
    }

    public Parametre save(Parametre parametre) {
        return repository.save(parametre);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
