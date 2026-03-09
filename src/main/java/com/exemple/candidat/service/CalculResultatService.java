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

                    double sommeDiff = 0.0;
                    String status = "Admis";
                    Parametre activeParam = paramsMatiere.get(0);
                    
                    // On prend la note maximale pour l'affichage comme "Note Finale" demandée par le client
                    double maxNoteMatiere = notesPourMatiere.stream().mapToDouble(Note::getNote).max().orElse(0.0);

                    for (Parametre param : paramsMatiere) {
                        activeParam = param;
                        double noteEffective = appliquerResolution(notesPourMatiere, param.getResolution().getId());
                        sommeDiff += (noteEffective - param.getSeuil());

                        if (!verifierSeuil(noteEffective, param.getSeuil(), param.getOperateur().getOperateur())) {
                            status = "Ajourné";
                            break; 
                        }
                    }

                    dto.setSeuil(activeParam.getSeuil());
                    dto.setOperateur(activeParam.getOperateur().getOperateur());
                    dto.setNoteCalculee(Math.round(maxNoteMatiere * 100.0) / 100.0);
                    dto.setReliquat(Math.round(sommeDiff * 100.0) / 100.0);
                    dto.setStatus(status);

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
}
