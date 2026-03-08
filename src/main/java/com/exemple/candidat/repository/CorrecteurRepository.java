package com.exemple.candidat.repository;

import com.exemple.candidat.model.Correcteur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CorrecteurRepository extends JpaRepository<Correcteur, Integer> {
}
