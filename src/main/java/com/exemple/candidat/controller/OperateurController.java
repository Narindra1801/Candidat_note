package com.exemple.candidat.controller;

import com.exemple.candidat.model.Operateur;
import com.exemple.candidat.service.OperateurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/operateurs")
public class OperateurController {

    @Autowired
    private OperateurService service;

    @GetMapping
    public List<Operateur> getAll() {
        return service.getAll();
    }
}
