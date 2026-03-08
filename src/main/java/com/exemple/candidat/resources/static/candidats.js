document.addEventListener('DOMContentLoaded', () => {

    const API_URL = '/candidats';
    const tbody = document.getElementById('candidatsTableBody');
    const paramLoader = document.getElementById('loader');
    
    // Modal Elements
    const modal = document.getElementById('candidatModal');
    const form = document.getElementById('candidatForm');
    const modalTitle = document.getElementById('modalTitle');
    const btnAdd = document.getElementById('addBtn');
    const btnCancel = document.getElementById('cancelBtn');
    
    // Form inputs
    const inputId = document.getElementById('candidatId');
    const inputMatricule = document.getElementById('matriculeInput');
    const inputNom = document.getElementById('nomInput');
    const inputPrenom = document.getElementById('prenomInput');

    // Init
    fetchAndDisplayCandidats();

    // -- EVENTS -- 
    
    btnAdd.addEventListener('click', () => openModal());
    btnCancel.addEventListener('click', closeModal);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveCandidat();
    });

    // -- FUNCTIONS --

    async function fetchAndDisplayCandidats() {
        showLoader(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Erreur de récupération des candidats");
            const candidats = await response.json();
            
            // Wait for smooth animation effect
            setTimeout(() => {
                renderTable(candidats);
                showLoader(false);
            }, 500);
        } catch (error) {
            console.error(error);
            showLoader(false);
        }
    }

    function renderTable(candidats) {
        tbody.innerHTML = '';
        
        candidats.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${c.id}</td>
                <td><strong style="color:var(--accent-blue)">${c.matricule}</strong></td>
                <td style="font-weight:600">${c.nom}</td>
                <td>${c.prenom}</td>
                <td style="text-align: right;">
                    <a href="index.html?id=${c.id}" class="icon-btn grade-btn" title="Évaluer"><i class="fas fa-chart-bar"></i></a>
                    <button class="icon-btn edit-btn" onclick="window.editCandidat(${c.id})" title="Modifier"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn delete-btn" onclick="window.deleteCandidat(${c.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    async function saveCandidat() {
        const id = inputId.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        const candidatData = {
            matricule: inputMatricule.value,
            nom: inputNom.value,
            prenom: inputPrenom.value
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(candidatData)
            });

            if (response.ok) {
                closeModal();
                fetchAndDisplayCandidats(); // Refresh data grid
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur saving:", error);
        }
    }

    // Expose functions globally for inline onclick handlers in table
    window.editCandidat = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const candidat = await response.json();
            openModal(candidat);
        } catch(e) {
            console.error(e);
        }
    };

    window.deleteCandidat = async (id) => {
        if(confirm("Êtes-vous sûr de vouloir supprimer définitivement ce candidat ?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchAndDisplayCandidats();
            } catch(e) {
                console.error(e);
            }
        }
    };

    function openModal(candidat = null) {
        if (candidat) {
            modalTitle.textContent = "Modifier le Candidat";
            inputId.value = candidat.id;
            inputMatricule.value = candidat.matricule;
            inputNom.value = candidat.nom;
            inputPrenom.value = candidat.prenom;
        } else {
            modalTitle.textContent = "Nouveau Candidat";
            form.reset();
            inputId.value = '';
        }
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        form.reset();
    }

    function showLoader(show) {
        if(show) {
            paramLoader.classList.remove('hidden');
            document.getElementById('resultsBoard').classList.add('hidden');
        } else {
            paramLoader.classList.add('hidden');
            document.getElementById('resultsBoard').classList.remove('hidden');
        }
    }

});
