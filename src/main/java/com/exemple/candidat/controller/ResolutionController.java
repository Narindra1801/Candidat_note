package com.exemple.candidat.controller;

import com.exemple.candidat.model.Resolution;
import com.exemple.candidat.service.ResolutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/resolutions")
public class ResolutionController {

    @Autowired
    private ResolutionService service;

    @GetMapping
    public List<Resolution> getAll() {
        return service.getAll();
    }
}
