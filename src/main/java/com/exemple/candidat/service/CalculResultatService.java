package com.exemple.candidat.service;

import com.exemple.candidat.dto.ResultatDTO;
import com.exemple.candidat.model.Candidat;
import com.exemple.candidat.model.Matiere;
import com.exemple.candidat.model.Note;
import com.exemple.candidat.model.Parametre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CalculResultatService {

    @Autowired
    private NoteService noteService;

    @Autowired
    private CandidatService candidatService;

    @Autowired
    private ParametreService parametreService;

    public List<ResultatDTO> calculerResultats() {
        List<Note> allNotes = noteService.getAll();
        return groupedCalculation(allNotes);
    }

    public List<ResultatDTO> calculerResultatsCandidat(Integer candidatId) {
        List<Note> notesCandidat = noteService.getByCandidatId(candidatId);
        return groupedCalculation(notesCandidat);
    }

    private List<ResultatDTO> groupedCalculation(List<Note> notes) {
        List<ResultatDTO> resultats = new ArrayList<>();
        List<Parametre> allParametres = parametreService.getAll();

        // Grouper les notes par Candidat puis par Matière
        Map<Candidat, Map<Matiere, List<Note>>> notesByCandidatAndMatiere = notes.stream()
                .collect(Collectors.groupingBy(Note::getCandidat,
                        Collectors.groupingBy(Note::getMatiere)));

        for (Map.Entry<Candidat, Map<Matiere, List<Note>>> entryCandidat : notesByCandidatAndMatiere.entrySet()) {
            Candidat candidat = entryCandidat.getKey();
            for (Map.Entry<Matiere, List<Note>> entryMatiere : entryCandidat.getValue().entrySet()) {
                Matiere matiere = entryMatiere.getKey();
                List<Note> notesPourMatiere = entryMatiere.getValue();

                // Récupérer tous les paramètres pour cette matière
                List<Parametre> paramsMatiere = allParametres.stream()
                        .filter(p -> p.getMatiere().getId().equals(matiere.getId()))
                        .collect(Collectors.toList());

                if (!paramsMatiere.isEmpty()) {
                    ResultatDTO dto = new ResultatDTO();
                    dto.setNomCandidat(candidat.getNom());
                    dto.setPrenomCandidat(candidat.getPrenom());
                    dto.setMatricule(candidat.getMatricule());
                    dto.setNomMatiere(matiere.getNom());

                    double diff = calculerSommeDiff(notesPourMatiere);

                    // 1. Filtrer les paramètres dont la condition est remplie par la différence
                    List<Parametre> paramsValides = new ArrayList<>();
                    for (Parametre param : paramsMatiere) {
                        if (verifierSeuil(diff, param.getSeuil(), param.getOperateur().getOperateur())) {
                            paramsValides.add(param);
                        }
                    }

                    // 2. S'il y a plusieurs paramètres valides, on cherche le seuil le plus proche
                    Parametre matchedParam = null;
                    if (!paramsValides.isEmpty()) {
                        double minDistance = Double.MAX_VALUE;
                        for (Parametre param : paramsValides) {
                            double currentDistance = Math.abs(diff - param.getSeuil());

                            if (matchedParam == null) {
                                matchedParam = param;
                                minDistance = currentDistance;
                            } else if (currentDistance < minDistance) {
                                // Plus proche
                                matchedParam = param;
                                minDistance = currentDistance;
                            } else if (currentDistance == minDistance) {
                                // En cas d'égalité (ex: milieu), prendre le plus petit seuil
                                if (param.getSeuil() < matchedParam.getSeuil()) {
                                    matchedParam = param;
                                }
                            }
                        }
                    }

                    if (matchedParam != null) {
                        double noteEffective = appliquerResolution(notesPourMatiere, matchedParam.getResolution().getId());
                        double reliquat = noteEffective - matchedParam.getSeuil(); 
                        
                        dto.setDiff(Math.round(diff * 100.0) / 100.0);
                        dto.setSeuil(matchedParam.getSeuil());
                        dto.setOperateur(matchedParam.getOperateur().getOperateur());
                        dto.setNoteCalculee(Math.round(noteEffective * 100.0) / 100.0);
                        dto.setReliquat(Math.round(reliquat * 100.0) / 100.0);
                        
                        dto.setStatus(verifierSeuil(noteEffective, matchedParam.getSeuil(), matchedParam.getOperateur().getOperateur()) ? "Admis" : "Ajourné");
                    } else {
                        // Fallback
                        double maxNote = notesPourMatiere.stream().mapToDouble(Note::getNote).max().orElse(0.0);
                        dto.setDiff(Math.round(diff * 100.0) / 100.0);
                        dto.setNoteCalculee(maxNote);
                        dto.setStatus("Ajourné");
                    }

                    resultats.add(dto);
                }

            }
        }
        return resultats;
    }

    private double appliquerResolution(List<Note> notes, Integer idResolution) {
        if (notes.isEmpty()) return 0.0;

        return switch (idResolution) {
            case 1 -> // le plus petit
                    notes.stream().mapToDouble(Note::getNote).min().orElse(0.0);
            case 2 -> // le plus grand
                    notes.stream().mapToDouble(Note::getNote).max().orElse(0.0);
            case 3 -> // la moyenne
                    notes.stream().mapToDouble(Note::getNote).average().orElse(0.0);
            default -> 0.0;
        };
    }

    private boolean verifierSeuil(double note, double seuil, String operateur) {
        if (">".equals(operateur)) {
            return note > seuil;
        }
        if ("<".equals(operateur)) {
            return note < seuil;
        }
        if ("<=".equals(operateur)) {
            return note <= seuil;
        }
        if (">=".equals(operateur)) {
            return note >= seuil;
        }
        return false;
    }

    private double calculerSommeDiff(List<Note> notes) {
        if (notes.isEmpty()) return 0.0;
        List<Integer> idNotesTraitees = new ArrayList<>();
        double sommeDiff = 0.0;
        for (int i = 0; i < notes.size(); i++) {
            idNotesTraitees.add(notes.get(i).getId());
            for (int j = 0; j < notes.size(); j++) {
                if (i != j && !idNotesTraitees.contains(notes.get(j).getId())) {
                    sommeDiff += Math.abs(notes.get(i).getNote() - notes.get(j).getNote());
                }
            }
        }
        return sommeDiff;
    }
}
