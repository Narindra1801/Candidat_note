package com.exemple.candidat.service;

import com.exemple.candidat.model.Correcteur;
import com.exemple.candidat.repository.CorrecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CorrecteurService {

    @Autowired
    private CorrecteurRepository correcteurRepository;

    public List<Correcteur> getAllCorrecteurs() {
        return correcteurRepository.findAll();
    }

    public Optional<Correcteur> getCorrecteurById(Integer id) {
        return correcteurRepository.findById(id);
    }

    public Correcteur saveCorrecteur(Correcteur correcteur) {
        return correcteurRepository.save(correcteur);
    }

    public void deleteCorrecteur(Integer id) {
        correcteurRepository.deleteById(id);
    }
}
