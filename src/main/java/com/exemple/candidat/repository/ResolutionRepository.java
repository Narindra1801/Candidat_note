package com.exemple.candidat.repository;

import com.exemple.candidat.model.Resolution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResolutionRepository extends JpaRepository<Resolution, Integer> {
}
