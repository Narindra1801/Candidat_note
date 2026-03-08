package com.exemple.candidat.repository;

import com.exemple.candidat.model.Parametre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametreRepository extends JpaRepository<Parametre, Integer> {
}
