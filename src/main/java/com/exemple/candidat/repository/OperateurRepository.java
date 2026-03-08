package com.exemple.candidat.repository;

import com.exemple.candidat.model.Operateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperateurRepository extends JpaRepository<Operateur, Integer> {
}
