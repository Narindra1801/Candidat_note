package com.exemple.candidat.controller;

import com.exemple.candidat.dto.ResultatDTO;
import com.exemple.candidat.service.CalculResultatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/resultats")
public class CalculController {

    @Autowired
    private CalculResultatService calculService;

    @GetMapping
    public List<ResultatDTO> getResultats() {
        return calculService.calculerResultats();
    }
}
