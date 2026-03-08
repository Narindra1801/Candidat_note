package com.exemple.candidat.repository;

import com.exemple.candidat.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoteRepository extends JpaRepository<Note, Integer> {
    List<Note> findByCandidatIdAndMatiereId(Integer candidatId, Integer matiereId);
    List<Note> findByCandidatId(Integer candidatId);
}
