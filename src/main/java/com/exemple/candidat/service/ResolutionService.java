package com.exemple.candidat.service;

import com.exemple.candidat.model.Resolution;
import com.exemple.candidat.repository.ResolutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ResolutionService {
    @Autowired
    private ResolutionRepository repository;

    public List<Resolution> getAll() {
        return repository.findAll();
    }
}
