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
        if(target === 'notes') loadNotes();
        if(target === 'resultats') loadResultats();
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
                        <button class="btn-primary" style="margin-right: 5px;" onclick="viewCandidatNotes(${c.id}, '${c.nom}', '${c.prenom}')">Voir Notes</button>
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
        const container = document.getElementById('parametres-cards-container');
        container.innerHTML = '';
        
        if (data.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; grid-column: 1 / -1;">Aucun paramètre enregistré</p>';
            return;
        }

        // Group by matiere name
        const grouped = {};
        data.forEach(p => {
            const matiereName = p.matiere.nom;
            if (!grouped[matiereName]) grouped[matiereName] = [];
            grouped[matiereName].push(p);
        });

        // Generate cards
        for (const [matiereName, params] of Object.entries(grouped)) {
            let paramsHtml = '';
            params.forEach(p => {
                paramsHtml += `
                    <div class="param-item">
                        <div class="param-info">
                            <span class="param-res">${p.resolution.nom}</span>
                            <span class="param-cond">${p.operateur.operateur} ${p.seuil}</span>
                        </div>
                        <div class="param-actions">
                            <button class="btn-edit" onclick="editParametre(${p.id}, ${p.matiere.id}, ${p.operateur.id}, ${p.resolution.id}, ${p.seuil})">Modifier</button>
                            <button class="btn-danger" onclick="deleteItem('parametres', ${p.id})">Supprimer</button>
                        </div>
                    </div>
                `;
            });

            container.innerHTML += `
                <div class="param-card">
                    <div class="param-card-header">
                        <h3>${matiereName}</h3>
                        <span class="param-count">${params.length} règle(s)</span>
                    </div>
                    <div class="param-card-body">
                        ${paramsHtml}
                    </div>
                </div>
            `;
        }
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

async function loadNotes() {
    try {
        const res = await fetch(`${API_BASE}/notes`);
        const data = await res.json();
        const container = document.getElementById('notes-cards-container');
        container.innerHTML = '';
        
        if (data.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; grid-column: 1 / -1;">Aucune note enregistrée</p>';
            return;
        }

        // Group by matiere name
        const groupedByMatiere = {};
        data.forEach(n => {
            const matiereName = n.matiere.nom;
            if (!groupedByMatiere[matiereName]) groupedByMatiere[matiereName] = {};
            
            const candidatId = n.candidat.id;
            const candidatName = `${n.candidat.nom} ${n.candidat.prenom}`;
            
            if (!groupedByMatiere[matiereName][candidatId]) {
                groupedByMatiere[matiereName][candidatId] = {
                    name: candidatName,
                    notes: []
                };
            }
            groupedByMatiere[matiereName][candidatId].notes.push(n);
        });

        // Generate cards
        for (const [matiereName, candidates] of Object.entries(groupedByMatiere)) {
            let cardBodyHtml = '';
            
            for (const [candId, candData] of Object.entries(candidates)) {
                let candidateNotesHtml = '';
                candData.notes.forEach(n => {
                    candidateNotesHtml += `
                        <div class="note-item sub-item">
                            <div class="note-info">
                                <span class="note-correcteur">Correcteur: ${n.correcteur.nom} ${n.correcteur.prenom}</span>
                            </div>
                            <div class="note-value-actions">
                                <span class="note-score">${n.note}</span>
                                <div class="note-actions">
                                    <button class="btn-edit" onclick="editNote(${n.id}, ${n.candidat.id}, ${n.matiere.id}, ${n.correcteur.id}, ${n.note})">Modifier</button>
                                    <button class="btn-danger" onclick="deleteItem('notes', ${n.id})">Supprimer</button>
                                </div>
                            </div>
                        </div>
                    `;
                });

                cardBodyHtml += `
                    <div class="candidate-group">
                        <h4 class="candidate-name-header">${candData.name}</h4>
                        ${candidateNotesHtml}
                    </div>
                `;
            }

            container.innerHTML += `
                <div class="note-card">
                    <div class="note-card-header">
                        <h3>${matiereName}</h3>
                    </div>
                    <div class="note-card-body">
                        ${cardBodyHtml}
                    </div>
                </div>
            `;
        }
    } catch(err) {
        console.error("Error loading notes", err);
    }
}

async function loadResultats() {
    try {
        const res = await fetch(`${API_BASE}/resultats`);
        const data = await res.json();
        const container = document.getElementById('resultats-cards-container');
        container.innerHTML = '';
        
        if (data.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center; width: 100%; grid-column: 1 / -1;">Aucun résultat calculé</p>';
            return;
        }

        // Group by candidate
        const groupedByCandidate = {};
        data.forEach(r => {
            const candidateKey = r.matricule;
            if (!groupedByCandidate[candidateKey]) {
                groupedByCandidate[candidateKey] = {
                    nom: r.nomCandidat,
                    prenom: r.prenomCandidat,
                    matricule: r.matricule,
                    results: []
                };
            }
            groupedByCandidate[candidateKey].results.push(r);
        });

        for (const [key, candData] of Object.entries(groupedByCandidate)) {
            let resultsHtml = '';
            candData.results.forEach(r => {
                const statusClass = r.status === 'Admis' ? 'status-admis' : 'status-ajourne';
                resultsHtml += `
                    <div class="result-item">
                        <div class="result-info">
                            <span class="result-matiere">${r.nomMatiere}</span>
                            <span class="result-condition">Condition: ${r.operateur} ${r.seuil}</span>
                        </div>
                        <div class="result-score-status">
                            <span class="result-score">${r.noteCalculee}</span>
                            <span class="result-status ${statusClass}">${r.status}</span>
                        </div>
                    </div>
                `;
            });

            container.innerHTML += `
                <div class="result-card">
                    <div class="result-card-header">
                        <h3>${candData.nom} ${candData.prenom}</h3>
                        <span class="matricule-badge">${candData.matricule}</span>
                    </div>
                    <div class="result-card-body">
                        ${resultsHtml}
                    </div>
                </div>
            `;
        }
    } catch(err) {
        console.error("Error loading resultats", err);
    }
}

async function loadSelectOptionsNotes() {
    try {
        const [candidatsRes, matieresRes, correcteursRes] = await Promise.all([
            fetch(`${API_BASE}/candidats`),
            fetch(`${API_BASE}/matieres`),
            fetch(`${API_BASE}/correcteurs`)
        ]);
        
        const candidats = await candidatsRes.json();
        const matieres = await matieresRes.json();
        const correcteurs = await correcteursRes.json();
        
        const candSelect = document.getElementById('form-candidat');
        const matSelect = document.getElementById('form-matiere');
        const corrSelect = document.getElementById('form-correcteur');
        
        candSelect.innerHTML = candidats.map(c => `<option value="${c.id}">${c.nom} ${c.prenom}</option>`).join('');
        matSelect.innerHTML = matieres.map(m => `<option value="${m.id}">${m.nom}</option>`).join('');
        corrSelect.innerHTML = correcteurs.map(c => `<option value="${c.id}">${c.nom} ${c.prenom}</option>`).join('');
        
    } catch (err) {
        console.error("Error loading options for notes", err);
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
    else if (type === 'parametre') title = 'Nouveau Paramètre';
    else title = 'Nouvelle Note';
    
    document.getElementById('modal-title').innerText = title;
    
    // Show/hide fields
    const isParam = type === 'parametre';
    const isNote = type === 'note';
    
    document.getElementById('matricule-group').style.display = type === 'candidat' ? 'block' : 'none';
    
    const nomGroup = document.getElementById('form-nom').parentElement;
    nomGroup.style.display = (isParam || isNote) ? 'none' : 'block';
    
    const prenomGroup = document.getElementById('form-prenom').parentElement;
    prenomGroup.style.display = (type === 'candidat' || type === 'correcteur') ? 'block' : 'none';
    
    document.getElementById('candidat-group').style.display = isNote ? 'block' : 'none';
    document.getElementById('matiere-group').style.display = (isParam || isNote) ? 'block' : 'none';
    document.getElementById('correcteur-group').style.display = isNote ? 'block' : 'none';
    
    document.getElementById('operateur-group').style.display = isParam ? 'block' : 'none';
    document.getElementById('resolution-group').style.display = isParam ? 'block' : 'none';
    document.getElementById('seuil-group').style.display = isParam ? 'block' : 'none';
    
    document.getElementById('note-group').style.display = isNote ? 'block' : 'none';
    
    if (isParam) loadSelectOptions();
    if (isNote) loadSelectOptionsNotes();
    
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
        document.getElementById('candidat-group').style.display = 'none';
        document.getElementById('matiere-group').style.display = 'none';
        document.getElementById('correcteur-group').style.display = 'none';
        document.getElementById('operateur-group').style.display = 'none';
        document.getElementById('resolution-group').style.display = 'none';
        document.getElementById('seuil-group').style.display = 'none';
        document.getElementById('note-group').style.display = 'none';
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

async function editNote(id, candidatId, matiereId, correcteurId, note) {
    document.getElementById('form-id').value = id;
    document.getElementById('form-type').value = 'note';
    
    await loadSelectOptionsNotes();
    
    document.getElementById('form-candidat').value = candidatId;
    document.getElementById('form-matiere').value = matiereId;
    document.getElementById('form-correcteur').value = correcteurId;
    document.getElementById('form-note').value = note;
    
    document.getElementById('modal-title').innerText = 'Modifier Note';
    
    document.getElementById('matricule-group').style.display = 'none';
    document.getElementById('form-nom').parentElement.style.display = 'none';
    document.getElementById('form-prenom').parentElement.style.display = 'none';
    
    hideParamFields();
    document.getElementById('candidat-group').style.display = 'block';
    document.getElementById('matiere-group').style.display = 'block';
    document.getElementById('correcteur-group').style.display = 'block';
    document.getElementById('note-group').style.display = 'block';
    
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
    let endpoint = type + 's'; // candidats, correcteurs, matieres, parametres, notes
    
    const payload = {};
    const isParam = type === 'parametre';
    const isNote = type === 'note';
    
    if (!isParam && !isNote) {
        payload.nom = document.getElementById('form-nom').value;
        if (type !== 'matiere') {
            payload.prenom = document.getElementById('form-prenom').value;
        }
        if (type === 'candidat') {
            payload.matricule = document.getElementById('form-matricule').value;
        } 
    } else if (isParam) {
        payload.matiere = { id: parseInt(document.getElementById('form-matiere').value) };
        payload.operateur = { id: parseInt(document.getElementById('form-operateur').value) };
        payload.resolution = { id: parseInt(document.getElementById('form-resolution').value) };
        payload.seuil = parseFloat(document.getElementById('form-seuil').value);
    } else if (isNote) {
        payload.candidat = { id: parseInt(document.getElementById('form-candidat').value) };
        payload.matiere = { id: parseInt(document.getElementById('form-matiere').value) };
        payload.correcteur = { id: parseInt(document.getElementById('form-correcteur').value) };
        payload.note = parseFloat(document.getElementById('form-note').value);
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
        else if(type === 'parametre') loadParametres();
        else loadNotes();
        
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
            else if(endpoint === 'parametres') loadParametres();
            else loadNotes();
        } catch(err) {
            alert("Erreur lors de la suppression");
        }
    }
}

// Initial load
loadCandidats();

// Candidat Notes Modal
async function viewCandidatNotes(candidatId, nom, prenom) {
    document.getElementById('notes-modal-title').innerText = `Notes de: ${nom} ${prenom}`;
    const tbody = document.getElementById('candidat-notes-detail-tbody');
    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">Chargement...</td></tr>';
    
    document.getElementById('notes-modal').classList.add('show');
    
    try {
        const res = await fetch(`${API_BASE}/resultats/candidat/${candidatId}`);
        const results = await res.json();
        
        tbody.innerHTML = '';
        if (results.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Aucun résultat calculé</td></tr>';
        } else {
            results.forEach(r => {
                const statusClass = r.status === 'Admis' ? 'status-admis' : 'status-ajourne';
                tbody.innerHTML += `
                    <tr>
                        <td>${r.nomMatiere}</td>
                        <td><strong>${r.noteCalculee}</strong></td>
                        <td>${r.operateur} ${r.seuil}</td>
                        <td><span class="result-status ${statusClass}" style="font-size: 0.7rem;">${r.status}</span></td>
                    </tr>
                `;
            });
        }
    } catch (err) {
        console.error("Error fetching results for candidat", err);
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: red;">Erreur de chargement</td></tr>';
    }
}

function closeNotesModal() {
    document.getElementById('notes-modal').classList.remove('show');
}
