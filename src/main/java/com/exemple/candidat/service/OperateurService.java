package com.exemple.candidat.service;

import com.exemple.candidat.model.Operateur;
import com.exemple.candidat.repository.OperateurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OperateurService {
    @Autowired
    private OperateurRepository repository;

    public List<Operateur> getAll() {
        return repository.findAll();
    }
}
