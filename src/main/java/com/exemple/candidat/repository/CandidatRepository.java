package com.exemple.candidat.repository;

import com.exemple.candidat.model.Candidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidatRepository extends JpaRepository<Candidat, Integer> {
    // Les méthodes CRUD de base (save, findById, findAll, deleteById) sont fournies par JpaRepository
}
