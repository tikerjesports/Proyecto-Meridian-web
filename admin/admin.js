// ==========================================
// MOCK DATA INITIALIZATION
// ==========================================
function initAdminData() {
    // Users
    if (!localStorage.getItem('meridian_users')) {
        const users = [
            { id: 1, name: 'Administrador', email: 'admin@meridian.com', password: 'admin', role: 'Administrador' },
            { id: 2, name: 'Editor', email: 'editor@meridian.com', password: 'editor', role: 'Editor' }
        ];
        localStorage.setItem('meridian_users', JSON.stringify(users));
    }
    
    // Competitions
    if (!localStorage.getItem('meridian_competitions')) {
        const comps = [
            { id: 1, name: 'Meridian Cup', category: 'Meridian Cup', format: 'BO3', startDate: '2026-04-15', endDate: '2026-04-30' },
            { id: 2, name: 'Meridian Contenders', category: 'Meridian Contenders', format: 'BO2 / BO3', startDate: '2026-05-10', endDate: '2026-06-15' },
            { id: 3, name: 'Meridian Test Series', category: 'Meridian Test Series', format: 'BO1', startDate: '2026-04-10', endDate: '2026-04-12' }
        ];
        localStorage.setItem('meridian_competitions', JSON.stringify(comps));
    }

    // Teams
    if (!localStorage.getItem('meridian_teams')) {
        const teams = [
            { id: 1, name: 'Falcons', logo: 'falcon.png', country: 'ES', players: 'A, B, C, D, E', subs: 'F' },
            { id: 2, name: 'Titans Esports', logo: 'titan.png', country: 'ES', players: 'U, V, W, X, Y', subs: 'Z' }
        ];
        localStorage.setItem('meridian_teams', JSON.stringify(teams));
    }

    // Matches
    if (!localStorage.getItem('meridian_matches')) {
        const matches = [];
        localStorage.setItem('meridian_matches', JSON.stringify(matches));
    }

    // Rankings
    if (!localStorage.getItem('meridian_rankings')) {
        const rankings = [ // Initial zeros
            { teamId: 1, pJugados: 0, pGanados: 0, pPerdidos: 0, mapDiff: 0, puntos: 0 },
            { teamId: 2, pJugados: 0, pGanados: 0, pPerdidos: 0, mapDiff: 0, puntos: 0 }
        ];
        localStorage.setItem('meridian_rankings', JSON.stringify(rankings));
    }

    // News
    if (!localStorage.getItem('meridian_news')) {
        const news = [
            { id: 1, title: 'Torneo Meridian Contenders Anunciado', content: 'Inscripciones abiertas para...', date: '2026-03-01' }
        ];
        localStorage.setItem('meridian_news', JSON.stringify(news));
    }
}

// ==========================================
// AUTHENTICATION
// ==========================================
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const pass = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');
    const users = JSON.parse(localStorage.getItem('meridian_users') || '[]');

    const user = users.find(u => u.email === email && u.password === pass);

    if (user) {
        // Handle Session
        sessionStorage.setItem('meridian_session', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        errorDiv.style.display = 'block';
        setTimeout(() => errorDiv.style.display = 'none', 3000);
    }
}

function checkAuth() {
    const session = sessionStorage.getItem('meridian_session');
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    const user = JSON.parse(session);
    
    // Update Sidebar
    document.getElementById('currentUserName').innerText = user.name;
    document.getElementById('currentUserRole').innerText = user.role;
    
    // Admins only sections
    if (user.role === 'Administrador') {
        document.getElementById('menu-users').style.display = 'block';
    }
    
    // Logout btn
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('meridian_session');
        window.location.href = 'index.html';
    });

    return user;
}

function getUser() {
    return JSON.parse(sessionStorage.getItem('meridian_session'));
}

// ==========================================
// DASHBOARD NAVIGATION & INITIALIZATION
// ==========================================
function initDashboard() {
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    const contentArea = document.getElementById('adminContent');
    const pageTitle = document.getElementById('pageTitle');
    
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const sidebar = document.getElementById('adminSidebar');
    
    if (mobileBtn) mobileBtn.addEventListener('click', () => sidebar.classList.add('active'));
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', () => sidebar.classList.remove('active'));

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            sidebar.classList.remove('active'); // Close mobile menu on navigate
            
            const section = link.getAttribute('data-section');
            pageTitle.innerText = link.querySelector('span').innerText;
            loadSection(section, contentArea);
        });
    });

    // Load default
    loadSection('dashboard', contentArea);
    
    // Modal events
    document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
}

function loadSection(section, container) {
    let html = '';
    switch(section) {
        case 'dashboard': html = getDashboardHTML(); break;
        case 'competitions': html = getCompetitionsHTML(); break;
        case 'teams': html = getTeamsHTML(); break;
        case 'matches': html = getMatchesHTML(); break;
        case 'results': html = getResultsHTML(); break;
        case 'rankings': html = getRankingsHTML(); break;
        case 'news': html = getNewsHTML(); break;
        case 'users': html = getUsersHTML(); break;
    }
    
    container.innerHTML = html;
    
    // Add event listeners for the section
    switch(section) {
        case 'competitions': initCompetitionsLogic(); break;
        case 'teams': initTeamsLogic(); break;
        case 'matches': initMatchesLogic(); break;
        case 'results': initResultsLogic(); break;
        // Other sections...
    }
}

// ==========================================
// MODAL HELPER
// ==========================================
function openModal(title, formHTML) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalBody').innerHTML = formHTML;
    document.getElementById('adminModal').classList.add('show');
}

function closeModal() {
    document.getElementById('adminModal').classList.remove('show');
}

// ==========================================
// VIEWS HTML GENERATORS
// ==========================================
function getDashboardHTML() {
    const teams = JSON.parse(localStorage.getItem('meridian_teams') || '[]');
    const comps = JSON.parse(localStorage.getItem('meridian_competitions') || '[]');
    const matches = JSON.parse(localStorage.getItem('meridian_matches') || '[]');
    
    return `
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-icon"><ion-icon name="people"></ion-icon></div>
                <div class="stat-details"><h3>${teams.length}</h3><p>Equipos Registrados</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><ion-icon name="trophy"></ion-icon></div>
                <div class="stat-details"><h3>${comps.length}</h3><p>Competiciones</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon"><ion-icon name="game-controller"></ion-icon></div>
                <div class="stat-details"><h3>${matches.length}</h3><p>Partidos Totales</p></div>
            </div>
        </div>
        
        <div class="admin-table-container">
            <div style="padding: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <h3>Próximos Partidos Rápidos</h3>
            </div>
            <table class="admin-table">
                <thead>
                    <tr><th>Fecha</th><th>Equipo 1</th><th>Equipo 2</th><th>Categoría</th><th>Estado</th></tr>
                </thead>
                <tbody>
                    ${matches.filter(m => m.status === 'Pendiente').slice(0, 5).map(m => `
                        <tr>
                            <td>${m.date} - ${m.time}</td>
                            <td>${getTeamName(m.team1)}</td>
                            <td>${getTeamName(m.team2)}</td>
                            <td>${m.category}</td>
                            <td><span class="status-badge status-pending">Pendiente</span></td>
                        </tr>
                    `).join('') || '<tr><td colspan="5" style="text-align:center;">No hay partidos pendientes</td></tr>'}
                </tbody>
            </table>
        </div>
    `;
}

// ==========================================
// CRUD LOGIC & TEMPLATES
// ==========================================

function getTeamName(id) {
    const teams = JSON.parse(localStorage.getItem('meridian_teams') || '[]');
    const t = teams.find(t => t.id == id);
    return t ? t.name : 'Desconocido';
}

// COMPETITIONS
function getCompetitionsHTML() {
    const comps = JSON.parse(localStorage.getItem('meridian_competitions') || '[]');
    const userRole = getUser().role;
    
    let rows = comps.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td>${c.category}</td>
            <td>${c.format}</td>
            <td>${c.startDate} al ${c.endDate}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editComp(${c.id})"><ion-icon name="create-outline"></ion-icon></button>
                    ${userRole === 'Administrador' ? `<button class="btn-icon btn-delete" onclick="deleteComp(${c.id})"><ion-icon name="trash-outline"></ion-icon></button>` : ''}
                </div>
            </td>
        </tr>
    `).join('');

    return `
        <div class="admin-panel-header">
            <h2>Gestión de Torneos</h2>
            ${userRole === 'Administrador' ? `<button class="btn btn-primary btn-sm" onclick="newComp()">+ Nueva Competición</button>` : ''}
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Nombre</th><th>Categoría</th><th>Formato</th><th>Fechas</th><th>Acciones</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function initCompetitionsLogic() {
    window.newComp = () => {
        const formHTML = `
            <form id="compForm" class="modal-form">
                <input type="hidden" id="compId" value="">
                <div class="form-group"><label>Nombre</label><input type="text" id="compName" required></div>
                <div class="form-group"><label>Categoría</label>
                    <select id="compCat">
                        <option value="Meridian Test Series">Meridian Test Series</option>
                        <option value="Meridian Contenders">Meridian Contenders</option>
                        <option value="Meridian Cup">Meridian Cup</option>
                    </select>
                </div>
                <div class="form-group"><label>Formato</label>
                    <select id="compFormat"><option>BO1</option><option>BO3</option><option>BO5</option></select>
                </div>
                <div class="form-group"><label>Inicio</label><input type="date" id="compStart" required></div>
                <div class="form-group"><label>Fin</label><input type="date" id="compEnd" required></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        `;
        openModal('Nueva Competición', formHTML);
        document.getElementById('compForm').addEventListener('submit', saveComp);
    };

    window.editComp = (id) => {
        const comps = JSON.parse(localStorage.getItem('meridian_competitions'));
        const c = comps.find(c => c.id === id);
        if(!c) return;
        
        window.newComp(); // Open modal
        document.getElementById('modalTitle').innerText = 'Editar Competición';
        document.getElementById('compId').value = c.id;
        document.getElementById('compName').value = c.name;
        document.getElementById('compCat').value = c.category;
        document.getElementById('compFormat').value = c.format;
        document.getElementById('compStart').value = c.startDate;
        document.getElementById('compEnd').value = c.endDate;
    };

    window.saveComp = (e) => {
        e.preventDefault();
        let comps = JSON.parse(localStorage.getItem('meridian_competitions') || '[]');
        const id = document.getElementById('compId').value;
        const newObj = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('compName').value,
            category: document.getElementById('compCat').value,
            format: document.getElementById('compFormat').value,
            startDate: document.getElementById('compStart').value,
            endDate: document.getElementById('compEnd').value
        };

        if (id) {
            comps = comps.map(c => c.id == id ? newObj : c);
        } else {
            comps.push(newObj);
        }

        localStorage.setItem('meridian_competitions', JSON.stringify(comps));
        closeModal();
        loadSection('competitions', document.getElementById('adminContent'));
        alert('Guardado con éxito.');
    };

    window.deleteComp = (id) => {
        if(confirm('¿Seguro que quieres borrar esto?')) {
            let comps = JSON.parse(localStorage.getItem('meridian_competitions'));
            comps = comps.filter(c => c.id !== id);
            localStorage.setItem('meridian_competitions', JSON.stringify(comps));
            loadSection('competitions', document.getElementById('adminContent'));
        }
    };
}

// MATCHES & RESULTS LOGIC
function getMatchesHTML() {
    const matches = JSON.parse(localStorage.getItem('meridian_matches') || '[]');
    let rows = matches.map(m => `
        <tr>
            <td>${m.date} - ${m.time}</td>
            <td>${getTeamName(m.team1)} vs ${getTeamName(m.team2)}</td>
            <td>${m.category}</td>
            <td><span class="status-badge status-${m.status.toLowerCase()}">${m.status}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editMatch(${m.id})"><ion-icon name="create"></ion-icon></button>
                    ${m.status !== 'Finalizado' ? `<button class="btn-icon btn-resolve" onclick="resolveMatch(${m.id})" title="Resolver Resultados"><ion-icon name="checkmark-done-circle"></ion-icon></button>` : ''}
                </div>
            </td>
        </tr>
    `).join('');

    return `
        <div class="admin-panel-header">
            <h2>Gestión de Partidos</h2>
            <button class="btn btn-primary btn-sm" onclick="newMatch()">+ Nuevo Partido</button>
        </div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>Fecha / Hora</th><th>Enfrentamiento</th><th>Categoría</th><th>Estado</th><th>Acciones</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function initMatchesLogic() {
    window.newMatch = () => {
        const teams = JSON.parse(localStorage.getItem('meridian_teams') || '[]');
        let teamOpts = teams.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
        
        const formHTML = `
            <form id="matchForm" class="modal-form">
                <input type="hidden" id="matchId" value="">
                <div style="display:flex; gap:1rem;">
                    <div class="form-group" style="flex:1"><label>Equipo 1</label><select id="mTeam1">${teamOpts}</select></div>
                    <div class="form-group" style="flex:1"><label>Equipo 2</label><select id="mTeam2">${teamOpts}</select></div>
                </div>
                <div style="display:flex; gap:1rem;">
                    <div class="form-group" style="flex:1"><label>Fecha</label><input type="date" id="mDate" required></div>
                    <div class="form-group" style="flex:1"><label>Hora</label><input type="time" id="mTime" required></div>
                </div>
                <div class="form-group"><label>Categoría</label>
                    <select id="mCat">
                        <option>Meridian Test Series</option>
                        <option>Meridian Contenders</option>
                        <option>Meridian Cup</option>
                    </select>
                </div>
                <div class="form-group"><label>Estado</label>
                    <select id="mStatus"><option>Pendiente</option><option>En directo</option><option>Finalizado</option></select>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </form>
        `;
        openModal('Nuevo Partido', formHTML);
        document.getElementById('matchForm').addEventListener('submit', saveMatch);
    };

    window.editMatch = (id) => {
        const matches = JSON.parse(localStorage.getItem('meridian_matches'));
        const m = matches.find(x => x.id === id);
        if(!m) return;
        
        window.newMatch();
        document.getElementById('modalTitle').innerText = 'Editar Partido';
        document.getElementById('matchId').value = m.id;
        document.getElementById('mTeam1').value = m.team1;
        document.getElementById('mTeam2').value = m.team2;
        document.getElementById('mDate').value = m.date;
        document.getElementById('mTime').value = m.time;
        document.getElementById('mCat').value = m.category;
        document.getElementById('mStatus').value = m.status;
    };

    window.saveMatch = (e) => {
        e.preventDefault();
        let list = JSON.parse(localStorage.getItem('meridian_matches') || '[]');
        const id = document.getElementById('matchId').value;
        const newObj = {
            id: id ? parseInt(id) : Date.now(),
            team1: document.getElementById('mTeam1').value,
            team2: document.getElementById('mTeam2').value,
            date: document.getElementById('mDate').value,
            time: document.getElementById('mTime').value,
            category: document.getElementById('mCat').value,
            status: document.getElementById('mStatus').value,
            score1: 0,
            score2: 0,
            winner: null
        };
        
        // Setup default ranking rows if completely new teams are added to match
        ensureTeamInRanking(newObj.team1);
        ensureTeamInRanking(newObj.team2);

        if(id) list = list.map(x => x.id == id ? newObj : x);
        else list.push(newObj);

        localStorage.setItem('meridian_matches', JSON.stringify(list));
        closeModal();
        loadSection('matches', document.getElementById('adminContent'));
    };

    window.resolveMatch = (id) => {
        const matches = JSON.parse(localStorage.getItem('meridian_matches'));
        const m = matches.find(x => x.id === id);
        
        const formHTML = `
            <form id="resolveForm" class="modal-form">
                <input type="hidden" id="resolveId" value="${m.id}">
                <div style="display:flex; gap:1rem; align-items:center; justify-content:center; text-align:center; margin-bottom: 2rem;">
                    <div style="flex: 1;">
                        <h4>${getTeamName(m.team1)}</h4>
                        <input type="number" id="scores1" value="0" min="0" max="3" style="font-size: 2rem; text-align:center;">
                    </div>
                    <div style="font-size:2rem; font-weight:bold; color:var(--text-muted)">VS</div>
                    <div style="flex: 1;">
                        <h4>${getTeamName(m.team2)}</h4>
                        <input type="number" id="scores2" value="0" min="0" max="3" style="font-size: 2rem; text-align:center;">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar y Calcular</button>
                </div>
            </form>
        `;
        openModal('Resolver Resultados', formHTML);

        document.getElementById('resolveForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const s1 = parseInt(document.getElementById('scores1').value);
            const s2 = parseInt(document.getElementById('scores2').value);
            
            m.score1 = s1;
            m.score2 = s2;
            m.status = 'Finalizado';
            m.winner = s1 > s2 ? m.team1 : (s2 > s1 ? m.team2 : null);

            let allM = JSON.parse(localStorage.getItem('meridian_matches'));
            allM = allM.map(x => x.id == id ? m : x);
            localStorage.setItem('meridian_matches', JSON.stringify(allM));
            
            // Automatic Rankings Calculation
            updateRankings(m);
            
            closeModal();
            loadSection('matches', document.getElementById('adminContent'));
            alert('Partido resuelto y clasificaciones actualizadas.');
        });
    };
}

function ensureTeamInRanking(teamIdStr) {
    const tid = parseInt(teamIdStr);
    let r = JSON.parse(localStorage.getItem('meridian_rankings') || '[]');
    if(!r.find(x => x.teamId === tid)) {
        r.push({ teamId: tid, pJugados: 0, pGanados: 0, pPerdidos: 0, mapDiff: 0, puntos: 0 });
        localStorage.setItem('meridian_rankings', JSON.stringify(r));
    }
}

function updateRankings(match) {
    if(match.winner === null) return; // Ties ignored for now based on CS rules usually

    let rankings = JSON.parse(localStorage.getItem('meridian_rankings') || '[]');
    let r1 = rankings.find(x => x.teamId == match.team1);
    let r2 = rankings.find(x => x.teamId == match.team2);

    if(!r1 || !r2) return;

    r1.pJugados++;
    r2.pJugados++;

    const mapDiff1 = match.score1 - match.score2;
    const mapDiff2 = match.score2 - match.score1;

    r1.mapDiff += mapDiff1;
    r2.mapDiff += mapDiff2;

    if(match.winner == match.team1) {
        r1.pGanados++;
        r2.pPerdidos++;
        r1.puntos += 3;
    } else {
        r2.pGanados++;
        r1.pPerdidos++;
        r2.puntos += 3;
    }

    localStorage.setItem('meridian_rankings', JSON.stringify(rankings));
}

// STUB FOR OTHER MODULES (Teams, Results, Rankings, News, Users)
function getTeamsHTML() { return `<div class="admin-panel-header"><h2>Equipos</h2></div><p>Gestionar equipos (Mock)</p>`; }
function initTeamsLogic() {}

function getResultsHTML() { return `<div class="admin-panel-header"><h2>Resultados</h2></div><p>Ver resultados históricos (Mock)</p>`; }
function initResultsLogic() {}

function getRankingsHTML() { 
    const ranks = JSON.parse(localStorage.getItem('meridian_rankings') || '[]');
    ranks.sort((a,b) => b.puntos - a.puntos || b.mapDiff - a.mapDiff);
    
    let rows = ranks.map((r, i) => `
        <tr>
            <td>${i+1}</td>
            <td><strong>${getTeamName(r.teamId)}</strong></td>
            <td>${r.pJugados}</td>
            <td>${r.pGanados}</td>
            <td>${r.pPerdidos}</td>
            <td>${r.mapDiff}</td>
            <td style="color:var(--accent-primary); font-weight:bold;">${r.puntos}</td>
        </tr>
    `).join('');

    return `
        <div class="admin-panel-header"><h2>Clasificaciones</h2></div>
        <div class="admin-table-container">
            <table class="admin-table">
                <thead><tr><th>#</th><th>Equipo</th><th>PJ</th><th>V</th><th>D</th><th>Dif Mapas</th><th>Puntos</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>
        </div>
    `;
}

function getNewsHTML() { return `<div class="admin-panel-header"><h2>Noticias</h2></div><p>Gestionar noticias (Mock)</p>`; }
function getUsersHTML() { return `<div class="admin-panel-header"><h2>Usuarios Admin</h2></div><p>Gestionar roles (Mock)</p>`; }
