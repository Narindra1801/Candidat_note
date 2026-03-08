document.addEventListener('DOMContentLoaded', () => {

    const API_URL = '/correcteurs';
    const tbody = document.getElementById('correcteursTableBody');
    const paramLoader = document.getElementById('loader');
    
    // Modal Elements
    const modal = document.getElementById('correcteurModal');
    const form = document.getElementById('correcteurForm');
    const modalTitle = document.getElementById('modalTitle');
    const btnAdd = document.getElementById('addBtn');
    const btnCancel = document.getElementById('cancelBtn');
    
    // Form inputs
    const inputId = document.getElementById('correcteurId');
    const inputNom = document.getElementById('nomInput');
    const inputPrenom = document.getElementById('prenomInput');

    // Init
    fetchAndDisplayCorrecteurs();

    // -- EVENTS -- 
    
    btnAdd.addEventListener('click', () => openModal());
    btnCancel.addEventListener('click', closeModal);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await saveCorrecteur();
    });

    // -- FUNCTIONS --

    async function fetchAndDisplayCorrecteurs() {
        showLoader(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Erreur de récupération des correcteurs");
            const correcteurs = await response.json();
            
            setTimeout(() => {
                renderTable(correcteurs);
                showLoader(false);
            }, 500);
        } catch (error) {
            console.error(error);
            showLoader(false);
        }
    }

    function renderTable(correcteurs) {
        tbody.innerHTML = '';
        
        correcteurs.forEach(c => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><span style="background: rgba(239,68,68,0.2); color:#ef4444; padding:4px 8px; border-radius:6px; font-weight:bold;">#${c.id}</span></td>
                <td style="font-weight:600; font-size: 1.1rem;">${c.nom.toUpperCase()}</td>
                <td>${c.prenom}</td>
                <td style="text-align: right;">
                    <button class="icon-btn edit-btn" onclick="window.editCorrecteur(${c.id})" title="Modifier"><i class="fas fa-edit"></i></button>
                    <button class="icon-btn delete-btn" onclick="window.deleteCorrecteur(${c.id})" title="Supprimer"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    async function saveCorrecteur() {
        const id = inputId.value;
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/${id}` : API_URL;

        const correcteurData = {
            nom: inputNom.value,
            prenom: inputPrenom.value
        };

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(correcteurData)
            });

            if (response.ok) {
                closeModal();
                fetchAndDisplayCorrecteurs(); 
            } else {
                alert("Erreur lors de l'enregistrement");
            }
        } catch (error) {
            console.error("Erreur saving:", error);
        }
    }

    window.editCorrecteur = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const correcteur = await response.json();
            openModal(correcteur);
        } catch(e) {
            console.error(e);
        }
    };

    window.deleteCorrecteur = async (id) => {
        if(confirm("Attention : Supprimer ce correcteur entraînera peut-être des erreurs si des notes lui sont associées. Confirmer ?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                fetchAndDisplayCorrecteurs();
            } catch(e) {
                console.error(e);
            }
        }
    };

    function openModal(correcteur = null) {
        if (correcteur) {
            modalTitle.textContent = "Modifier le Correcteur";
            inputId.value = correcteur.id;
            inputNom.value = correcteur.nom;
            inputPrenom.value = correcteur.prenom;
        } else {
            modalTitle.textContent = "Nouveau Correcteur";
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
