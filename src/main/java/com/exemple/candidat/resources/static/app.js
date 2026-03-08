document.addEventListener('DOMContentLoaded', () => {

    const searchBtn = document.getElementById('searchBtn');
    const inputId = document.getElementById('candidatIdInput');
    
    // States
    const emptyState = document.getElementById('emptyState');
    const loader = document.getElementById('loader');
    const errorState = document.getElementById('errorState');
    const resultsBoard = document.getElementById('resultsBoard');
    
    // UI Elements for Data
    const displayId = document.getElementById('displayId');
    const finalVerdict = document.getElementById('finalVerdict');
    const subjectsGrid = document.getElementById('subjectsGrid');

    // Mappage (hardcodé pour l'instant car l'API EvaluationController renvoie P.ex "Matiere 1")
    // L'idéal serait que l'API renvoie les vrais noms des matières
    const matieresMap = {
        "Matiere 1": "Mathématiques",
        "Matiere 2": "Physique",
        "Matiere 3": "Français",
        "Matiere 4": "Anglais",
        "Matiere 5": "Histoire",
        "Matiere 6": "Informatique"
    };

    searchBtn.addEventListener('click', fetchCandidateResults);
    
    // Support enter key
    inputId.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            fetchCandidateResults();
        }
    });

    async function fetchCandidateResults() {
        const id = inputId.value.trim();
        
        if(!id) return;

        showState('loader');

        try {
            // Appel à l'API existante Spring Boot
            const response = await fetch(`/evaluation/${id}`);
            
            if (!response.ok) {
                throw new Error("Candidat introuvable ou erreur serveur.");
            }

            const data = await response.json();
            
            // Simuler un très léger temps de traitement pour voir l'animation du loader
            setTimeout(() => {
                populateDashboard(data);
                showState('results');
            }, 600);

        } catch (error) {
            console.error("Erreur API:", error);
            showState('error');
        }
    }

    function populateDashboard(data) {
        // 1. Mise à jour de l'ID
        displayId.textContent = data.idCandidat;

        // 2. Mise à jour du verdict global
        finalVerdict.className = 'verdict-badge'; // Reset classes
        if (data.statutAdmission === "ADMIS") {
            finalVerdict.classList.add('badge-success');
            finalVerdict.textContent = "ADMIS";
        } else {
            finalVerdict.classList.add('badge-danger');
            finalVerdict.textContent = "AJOURNÉ";
        }

        // 3. Construction dynamique de la grille des matières
        subjectsGrid.innerHTML = '';
        
        const resultats = data.resultatsDetail;
        
        for (const [key, isPassed] of Object.entries(resultats)) {
            
            const realName = matieresMap[key] || key;
            const statusClass = isPassed ? 'status-passed' : 'status-failed';
            const statusText = isPassed ? 'Validé' : 'Échec';

            const card = document.createElement('div');
            card.className = 'subject-card glass-card';
            
            card.innerHTML = `
                <div class="subject-name">${realName}</div>
                <div class="status-indicator ${statusClass}">
                    <div class="dot"></div>
                    <span>${statusText}</span>
                </div>
            `;
            
            subjectsGrid.appendChild(card);
        }
    }

    function showState(stateName) {
        // Cacher toutes les boites
        emptyState.classList.add('hidden');
        loader.classList.add('hidden');
        errorState.classList.add('hidden');
        resultsBoard.classList.add('hidden');

        // Afficher la boite demandée
        if (stateName === 'loader') loader.classList.remove('hidden');
        else if (stateName === 'error') errorState.classList.remove('hidden');
        else if (stateName === 'results') resultsBoard.classList.remove('hidden');
        else emptyState.classList.remove('hidden');
    }

});
