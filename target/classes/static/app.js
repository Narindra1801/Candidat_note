const API_BASE = 'http://localhost:8081';

// Tab Switching Logic
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Add active class
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
        
        // Load data
        if(target === 'candidats') loadCandidats();
        if(target === 'correcteurs') loadCorrecteurs();
        if(target === 'matieres') loadMatieres();
        if(target === 'parametres') loadParametres();
    });
});

// Load Data
async function loadCandidats() {
    try {
        const res = await fetch(`${API_BASE}/candidats`);
        const data = await res.json();
        const tbody = document.getElementById('candidats-tbody');
        tbody.innerHTML = '';
        
        data.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.nom}</td>
                    <td>${c.prenom}</td>
                    <td>${c.matricule}</td>
                    <td>
                        <button class="btn-edit" onclick="editCandidat(${c.id}, '${c.nom}', '${c.prenom}', '${c.matricule}')">Modifier</button>
                        <button class="btn-danger" onclick="deleteItem('candidats', ${c.id})">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch(err) {
        console.error("Error loading candidats", err);
    }
}

async function loadCorrecteurs() {
    try {
        const res = await fetch(`${API_BASE}/correcteurs`);
        const data = await res.json();
        const tbody = document.getElementById('correcteurs-tbody');
        tbody.innerHTML = '';
        
        data.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.nom}</td>
                    <td>${c.prenom}</td>
                    <td>
                        <button class="btn-edit" onclick="editCorrecteur(${c.id}, '${c.nom}', '${c.prenom}')">Modifier</button>
                        <button class="btn-danger" onclick="deleteItem('correcteurs', ${c.id})">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch(err) {
        console.error("Error loading correcteurs", err);
    }
}

async function loadMatieres() {
    try {
        const res = await fetch(`${API_BASE}/matieres`);
        const data = await res.json();
        const tbody = document.getElementById('matieres-tbody');
        tbody.innerHTML = '';
        
        data.forEach(m => {
            tbody.innerHTML += `
                <tr>
                    <td>${m.id}</td>
                    <td>${m.nom}</td>
                    <td>
                        <button class="btn-edit" onclick="editMatiere(${m.id}, '${m.nom}')">Modifier</button>
                        <button class="btn-danger" onclick="deleteItem('matieres', ${m.id})">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch(err) {
        console.error("Error loading matieres", err);
    }
}

async function loadParametres() {
    try {
        const res = await fetch(`${API_BASE}/parametres`);
        const data = await res.json();
        const tbody = document.getElementById('parametres-tbody');
        tbody.innerHTML = '';
        
        data.forEach(p => {
            tbody.innerHTML += `
                <tr>
                    <td>${p.id}</td>
                    <td>${p.matiere.nom}</td>
                    <td>${p.operateur.operateur}</td>
                    <td>${p.resolution.nom}</td>
                    <td>${p.seuil}</td>
                    <td>
                        <button class="btn-edit" onclick="editParametre(${p.id}, ${p.matiere.id}, ${p.operateur.id}, ${p.resolution.id}, ${p.seuil})">Modifier</button>
                        <button class="btn-danger" onclick="deleteItem('parametres', ${p.id})">Supprimer</button>
                    </td>
                </tr>
            `;
        });
    } catch(err) {
        console.error("Error loading parametres", err);
    }
}

async function loadSelectOptions() {
    try {
        const [matieresRes, operateursRes, resolutionsRes] = await Promise.all([
            fetch(`${API_BASE}/matieres`),
            fetch(`${API_BASE}/operateurs`),
            fetch(`${API_BASE}/resolutions`)
        ]);
        
        const matieres = await matieresRes.json();
        const operateurs = await operateursRes.json();
        const resolutions = await resolutionsRes.json();
        
        const matSelect = document.getElementById('form-matiere');
        const opSelect = document.getElementById('form-operateur');
        const resSelect = document.getElementById('form-resolution');
        
        matSelect.innerHTML = matieres.map(m => `<option value="${m.id}">${m.nom}</option>`).join('');
        opSelect.innerHTML = operateurs.map(o => `<option value="${o.id}">${o.operateur}</option>`).join('');
        resSelect.innerHTML = resolutions.map(r => `<option value="${r.id}">${r.nom}</option>`).join('');
        
    } catch (err) {
        console.error("Error loading options", err);
    }
}

// Modal Logic
const modal = document.getElementById('modal');

function showAddForm(type) {
    document.getElementById('data-form').reset();
    document.getElementById('form-id').value = '';
    document.getElementById('form-type').value = type;
    
    let title = '';
    if (type === 'candidat') title = 'Nouveau Candidat';
    else if (type === 'correcteur') title = 'Nouveau Correcteur';
    else if (type === 'matiere') title = 'Nouvelle Matière';
    else title = 'Nouveau Paramètre';
    
    document.getElementById('modal-title').innerText = title;
    
    // Show/hide fields
    const isParam = type === 'parametre';
    document.getElementById('matricule-group').style.display = type === 'candidat' ? 'block' : 'none';
    
    const nomGroup = document.getElementById('form-nom').parentElement;
    nomGroup.style.display = isParam ? 'none' : 'block';
    
    const prenomGroup = document.getElementById('form-prenom').parentElement;
    prenomGroup.style.display = (type === 'candidat' || type === 'correcteur') ? 'block' : 'none';
    
    document.getElementById('matiere-group').style.display = isParam ? 'block' : 'none';
    document.getElementById('operateur-group').style.display = isParam ? 'block' : 'none';
    document.getElementById('resolution-group').style.display = isParam ? 'block' : 'none';
    document.getElementById('seuil-group').style.display = isParam ? 'block' : 'none';
    
    if (isParam) {
        loadSelectOptions();
    }
    
    modal.classList.add('show');
}

function editCandidat(id, nom, prenom, matricule) {
    document.getElementById('form-id').value = id;
    document.getElementById('form-type').value = 'candidat';
    document.getElementById('form-nom').value = nom;
    document.getElementById('form-prenom').value = prenom;
    document.getElementById('form-matricule').value = matricule;
    
    document.getElementById('modal-title').innerText = 'Modifier Candidat';
    document.getElementById('matricule-group').style.display = 'block';
    document.getElementById('form-nom').parentElement.style.display = 'block';
    document.getElementById('form-prenom').parentElement.style.display = 'block';
    hideParamFields();
    
    modal.classList.add('show');
}

function editCorrecteur(id, nom, prenom) {
    document.getElementById('form-id').value = id;
    document.getElementById('form-type').value = 'correcteur';
    document.getElementById('form-nom').value = nom;
    document.getElementById('form-prenom').value = prenom;
    
    document.getElementById('modal-title').innerText = 'Modifier Correcteur';
    document.getElementById('matricule-group').style.display = 'none';
    document.getElementById('form-nom').parentElement.style.display = 'block';
    document.getElementById('form-prenom').parentElement.style.display = 'block';
    hideParamFields();
    
    modal.classList.add('show');
}

function editMatiere(id, nom) {
    document.getElementById('form-id').value = id;
    document.getElementById('form-type').value = 'matiere';
    document.getElementById('form-nom').value = nom;
    
    document.getElementById('modal-title').innerText = 'Modifier Matière';
    document.getElementById('matricule-group').style.display = 'none';
    document.getElementById('form-nom').parentElement.style.display = 'block';
    document.getElementById('form-prenom').parentElement.style.display = 'none';
    hideParamFields();
    
    modal.classList.add('show');
}

function hideParamFields() {
    if(document.getElementById('matiere-group')) {
        document.getElementById('matiere-group').style.display = 'none';
        document.getElementById('operateur-group').style.display = 'none';
        document.getElementById('resolution-group').style.display = 'none';
        document.getElementById('seuil-group').style.display = 'none';
    }
}

async function editParametre(id, matiereId, operateurId, resolutionId, seuil) {
    document.getElementById('form-id').value = id;
    document.getElementById('form-type').value = 'parametre';
    
    await loadSelectOptions();
    
    document.getElementById('form-matiere').value = matiereId;
    document.getElementById('form-operateur').value = operateurId;
    document.getElementById('form-resolution').value = resolutionId;
    document.getElementById('form-seuil').value = seuil;
    
    document.getElementById('modal-title').innerText = 'Modifier Paramètre';
    
    document.getElementById('matricule-group').style.display = 'none';
    document.getElementById('form-nom').parentElement.style.display = 'none';
    document.getElementById('form-prenom').parentElement.style.display = 'none';
    
    document.getElementById('matiere-group').style.display = 'block';
    document.getElementById('operateur-group').style.display = 'block';
    document.getElementById('resolution-group').style.display = 'block';
    document.getElementById('seuil-group').style.display = 'block';
    
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

// Form Submission
document.getElementById('data-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const id = document.getElementById('form-id').value;
    const type = document.getElementById('form-type').value; 
    let endpoint = type + 's'; // candidats, correcteurs, matieres
    
    const payload = {};
    const isParam = type === 'parametre';
    
    if (!isParam) {
        payload.nom = document.getElementById('form-nom').value;
        if (type !== 'matiere') {
            payload.prenom = document.getElementById('form-prenom').value;
        }
        if (type === 'candidat') {
            payload.matricule = document.getElementById('form-matricule').value;
        } 
    } else {
        payload.matiere = { id: parseInt(document.getElementById('form-matiere').value) };
        payload.operateur = { id: parseInt(document.getElementById('form-operateur').value) };
        payload.resolution = { id: parseInt(document.getElementById('form-resolution').value) };
        payload.seuil = parseFloat(document.getElementById('form-seuil').value);
    }
    
    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_BASE}/${endpoint}/${id}` : `${API_BASE}/${endpoint}`;

    try {
        await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        closeModal();
        if(type === 'candidat') loadCandidats();
        else if(type === 'correcteur') loadCorrecteurs();
        else if(type === 'matiere') loadMatieres();
        else loadParametres();
        
    } catch(err) {
        alert("Une erreur est survenue !");
        console.error(err);
    }
});

// Delete Logic
async function deleteItem(endpoint, id) {
    if(confirm('Voulez-vous vraiment supprimer cet élément ?')) {
        try {
            await fetch(`${API_BASE}/${endpoint}/${id}`, {
                method: 'DELETE'
            });
            if(endpoint === 'candidats') loadCandidats();
            else if(endpoint === 'correcteurs') loadCorrecteurs();
            else if(endpoint === 'matieres') loadMatieres();
            else loadParametres();
        } catch(err) {
            alert("Erreur lors de la suppression");
        }
    }
}

// Initial load
loadCandidats();
