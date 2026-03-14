/**
 * MERIDIAN ESPORTS — Subcategory Page Script
 * Handles: League Table, Team Stats, Player Stats, Match Calendar w/ Timers
 */

// ============================================================
// DEMO DATA — Replace / augment with real data from admin panel
// ============================================================
const SUBCAT_DATA = {
    category: "Meridian Contenders",
    game: "CS:GO",          // "CS:GO" | "LoL" | "Valorant"
    format: "BO3",
    status: "upcoming",         // "live" | "upcoming" | "completed"
    logoSrc: "assets/logos/meridian-contenders.png",
    description: "Nivel competitivo intermedio donde los equipos más fuertes compiten para demostrar su valía y ascender en el circuito.",

    teams: [
        { id: 1, name: "Eclipse Gaming",     tag: "EG",  icon: "🌑" },
        { id: 2, name: "Nova Syndicate",     tag: "NS",  icon: "💫" },
        { id: 3, name: "Iron Wolves",        tag: "IW",  icon: "🐺" },
        { id: 4, name: "Crimson Peak",       tag: "CP",  icon: "🔴" },
        { id: 5, name: "Phantom Force",      tag: "PF",  icon: "👻" },
        { id: 6, name: "Titan Breach",       tag: "TB",  icon: "⚡" },
        { id: 7, name: "Zenith Order",       tag: "ZO",  icon: "🏔️" },
        { id: 8, name: "Shadow Protocol",   tag: "SP",  icon: "🌑" },
    ],

    standings: [
        { teamId: 1, pj: 8, v: 7, d: 1, e: 0, pts: 21, form: ["W","W","W","L","W"] },
        { teamId: 2, pj: 8, v: 6, d: 2, e: 0, pts: 18, form: ["W","W","D","W","L"] },
        { teamId: 3, pj: 8, v: 5, d: 2, e: 1, pts: 16, form: ["W","D","W","W","L"] },
        { teamId: 4, pj: 8, v: 5, d: 3, e: 0, pts: 15, form: ["L","W","W","D","W"] },
        { teamId: 5, pj: 8, v: 4, d: 4, e: 0, pts: 12, form: ["W","L","L","W","W"] },
        { teamId: 6, pj: 8, v: 3, d: 5, e: 0, pts: 9,  form: ["L","L","W","L","W"] },
        { teamId: 7, pj: 8, v: 1, d: 6, e: 1, pts: 4,  form: ["L","D","L","L","L"] },
        { teamId: 8, pj: 8, v: 0, d: 8, e: 0, pts: 0,  form: ["L","L","L","L","L"] },
    ],

    teamStats: [
        { teamId: 1, kd: 1.42, avgRoundsWon: 14.3, avgMapsWon: 2.1, winRatePct: 87.5, streak: "W5",  sparkline: [55,60,70,65,80,85,90,88] },
        { teamId: 2, kd: 1.28, avgRoundsWon: 13.8, avgMapsWon: 1.9, winRatePct: 75.0, streak: "W3",  sparkline: [60,55,70,72,68,80,78,82] },
        { teamId: 3, kd: 1.18, avgRoundsWon: 13.1, avgMapsWon: 1.7, winRatePct: 62.5, streak: "W2",  sparkline: [50,60,55,65,62,70,68,72] },
        { teamId: 4, kd: 1.10, avgRoundsWon: 12.9, avgMapsWon: 1.6, winRatePct: 62.5, streak: "W1",  sparkline: [45,50,60,55,70,65,68,70] },
        { teamId: 5, kd: 1.03, avgRoundsWon: 12.4, avgMapsWon: 1.5, winRatePct: 50.0, streak: "W2",  sparkline: [50,45,55,60,55,65,60,62] },
        { teamId: 6, kd: 0.91, avgRoundsWon: 11.7, avgMapsWon: 1.2, winRatePct: 37.5, streak: "L2",  sparkline: [60,55,50,45,40,42,38,40] },
        { teamId: 7, kd: 0.82, avgRoundsWon: 10.5, avgMapsWon: 0.9, winRatePct: 12.5, streak: "L4",  sparkline: [45,40,38,35,30,28,25,22] },
        { teamId: 8, kd: 0.71, avgRoundsWon: 9.3,  avgMapsWon: 0.4, winRatePct: 0.0,  streak: "L8",  sparkline: [30,25,22,18,15,12,10,8]  },
    ],

    // Game-specific player stats
    players: [
        // CS:GO columns: kills, deaths, adr, winPct
        { teamId: 1, nick: "EclipseX",   role: "Rifler",  kills: 24.5, deaths: 14.2, adr: 92.1, winPct: 87.5 },
        { teamId: 1, nick: "VoidSnipe",  role: "AWPer",   kills: 22.1, deaths: 15.0, adr: 88.4, winPct: 87.5 },
        { teamId: 1, nick: "RushMaster", role: "Lurker",  kills: 20.8, deaths: 16.5, adr: 80.2, winPct: 87.5 },
        { teamId: 2, nick: "NovaPrime",  role: "IGL",     kills: 18.2, deaths: 15.8, adr: 75.6, winPct: 75.0 },
        { teamId: 2, nick: "SynthKill",  role: "Support", kills: 19.4, deaths: 17.1, adr: 78.9, winPct: 75.0 },
        { teamId: 2, nick: "OmegaDash",  role: "Rifler",  kills: 21.0, deaths: 16.2, adr: 82.3, winPct: 75.0 },
        { teamId: 3, nick: "WolfBite",   role: "AWPer",   kills: 20.3, deaths: 16.0, adr: 83.0, winPct: 62.5 },
        { teamId: 3, nick: "PackLeader", role: "IGL",     kills: 17.5, deaths: 17.2, adr: 72.1, winPct: 62.5 },
        { teamId: 4, nick: "CrimsonKS",  role: "Rifler",  kills: 22.8, deaths: 16.9, adr: 85.5, winPct: 62.5 },
        { teamId: 4, nick: "PeakSniper", role: "AWPer",   kills: 19.7, deaths: 15.6, adr: 81.2, winPct: 62.5 },
        { teamId: 5, nick: "PhantomX",   role: "Lurker",  kills: 18.9, deaths: 17.5, adr: 76.8, winPct: 50.0 },
        { teamId: 5, nick: "SpecterK",   role: "Support", kills: 16.2, deaths: 18.1, adr: 68.9, winPct: 50.0 },
        { teamId: 6, nick: "ThunderBolt",role: "Rifler",  kills: 17.3, deaths: 19.0, adr: 70.1, winPct: 37.5 },
        { teamId: 7, nick: "ZenithOne",  role: "IGL",     kills: 14.1, deaths: 19.8, adr: 58.3, winPct: 12.5 },
        { teamId: 8, nick: "ShadowGhost",role: "Support", kills: 12.5, deaths: 21.4, adr: 48.7, winPct: 0.0  },
    ],

    // Current week reference (week 1 = 2026-03-09)
    currentWeekOffset: 0,
    matches: [
        // Week 1
        {
            id: 1,  week: 1, date: "2026-03-09", time: "18:00",
            team1Id: 1, team2Id: 2, status: "completed",
            score1: 2, score2: 0
        },
        {
            id: 2,  week: 1, date: "2026-03-09", time: "20:30",
            team1Id: 3, team2Id: 4, status: "live",
            score1: 1, score2: 1
        },
        {
            id: 3,  week: 1, date: "2026-03-10", time: "19:00",
            team1Id: 5, team2Id: 6, status: "upcoming",
            score1: null, score2: null
        },
        {
            id: 4,  week: 1, date: "2026-03-11", time: "20:00",
            team1Id: 7, team2Id: 8, status: "upcoming",
            score1: null, score2: null
        },
        // Week 2
        {
            id: 5, week: 2, date: "2026-03-16", time: "19:00",
            team1Id: 1, team2Id: 3, status: "upcoming",
            score1: null, score2: null
        },
        {
            id: 6, week: 2, date: "2026-03-16", time: "21:00",
            team1Id: 2, team2Id: 4, status: "upcoming",
            score1: null, score2: null
        },
        {
            id: 7, week: 2, date: "2026-03-17", time: "19:00",
            team1Id: 5, team2Id: 7, status: "upcoming",
            score1: null, score2: null
        },
        {
            id: 8, week: 2, date: "2026-03-18", time: "20:00",
            team1Id: 6, team2Id: 8, status: "upcoming",
            score1: null, score2: null
        },
    ],
};

// ============================================================
// UTILITY HELPERS
// ============================================================
let timerIntervals = [];

function getTeam(id) {
    return SUBCAT_DATA.teams.find(t => t.id === id) || { name: "TBD", tag: "?", icon: "?" };
}

function clearTimers() {
    timerIntervals.forEach(clearInterval);
    timerIntervals = [];
}

function formatCountdown(ms) {
    if (ms <= 0) return "00:00:00";
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    if (h > 0) return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// ============================================================
// HEADER BOOTSTRAP
// ============================================================
function initHeader() {
    const d = SUBCAT_DATA;
    document.getElementById('pageTitle').textContent = `${d.category} | Meridian Circuit`;
    document.getElementById('breadcrumbCat').textContent = d.category;
    document.getElementById('subcatTitle').textContent = d.category;
    document.getElementById('subcatDesc').textContent = d.description;
    document.getElementById('subcatGame').innerHTML = `<ion-icon name="game-controller-outline"></ion-icon> ${d.game}`;
    document.getElementById('subcatFormat').innerHTML = `<ion-icon name="trophy-outline"></ion-icon> ${d.format}`;
    document.getElementById('subcatTeams').innerHTML = `<ion-icon name="people-outline"></ion-icon> ${d.teams.length} Equipos`;
    document.getElementById('subcatLogoImg').src = d.logoSrc;

    const statusEl = document.getElementById('subcatStatus');
    if (d.status === 'live') {
        statusEl.className = 'subcat-status-badge status-live';
        statusEl.textContent = '🔴 En Directo';
    } else if (d.status === 'upcoming') {
        statusEl.className = 'subcat-status-badge status-upcoming';
        statusEl.textContent = 'Próximamente';
    } else {
        statusEl.className = 'subcat-status-badge status-done';
        statusEl.textContent = 'Finalizado';
    }
}

// ============================================================
// SECTION 1 — LEAGUE TABLE
// ============================================================
let leagueSortCol = 'pts';
let leagueSortAsc = false;

function renderLeagueTable() {
    const data = [...SUBCAT_DATA.standings];

    // Sort
    data.sort((a, b) => {
        const aVal = a[leagueSortCol] ?? 0;
        const bVal = b[leagueSortCol] ?? 0;
        return leagueSortAsc ? aVal - bVal : bVal - aVal;
    });

    const tbody = document.getElementById('leagueTableBody');
    tbody.innerHTML = '';

    const qualifyZone = 3;   // top 3 qualify
    const relegZone   = data.length - 1; // last 1 relegated

    data.forEach((row, i) => {
        const pos     = i + 1;
        const team    = getTeam(row.teamId);
        const posClass= pos === 1 ? 'pos-1' : pos === 2 ? 'pos-2' : pos === 3 ? 'pos-3' : '';
        const rowClass= pos <= qualifyZone ? 'qualify-zone' : pos > relegZone ? 'relegation-zone' : '';

        // Form badges
        const formHTML = (row.form || []).map(f => `<span class="form-badge ${f}">${f}</span>`).join('');

        const tr = document.createElement('tr');
        tr.className = rowClass;
        tr.innerHTML = `
            <td><span class="rank-position ${posClass}">${pos}</span></td>
            <td>
                <div class="team-cell-inner">
                    <div class="team-logo-mini"><span>${team.icon}</span></div>
                    <span class="team-name-text">${team.name}</span>
                </div>
            </td>
            <td>${row.pj}</td>
            <td>${row.v}</td>
            <td>${row.d}</td>
            <td>${row.e}</td>
            <td><span class="pts-value">${row.pts}</span></td>
            <td><div class="form-badges">${formHTML}</div></td>
        `;
        tbody.appendChild(tr);

        // Stagger row entrance
        tr.style.opacity = '0';
        tr.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            tr.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            tr.style.opacity = '1';
            tr.style.transform = '';
        }, 40 * i);
    });

    // Sync header active state
    document.querySelectorAll('#leagueTable thead th.sortable-col').forEach(th => {
        th.classList.remove('active-sort');
        const icon = th.querySelector('ion-icon');
        if (icon) icon.setAttribute('name', th.dataset.col === leagueSortCol ? (leagueSortAsc ? 'chevron-up-outline' : 'chevron-down-outline') : 'remove-outline');
        if (th.dataset.col === leagueSortCol) th.classList.add('active-sort');
    });
}

function initLeagueTable() {
    renderLeagueTable();
    document.querySelectorAll('#leagueTable thead th.sortable-col').forEach(th => {
        th.addEventListener('click', () => {
            if (leagueSortCol === th.dataset.col) {
                leagueSortAsc = !leagueSortAsc;
            } else {
                leagueSortCol = th.dataset.col;
                leagueSortAsc = false;
            }
            renderLeagueTable();
        });
    });
}

// ============================================================
// SECTION 2 — TEAM STATS
// ============================================================
let teamCharts = {};

function renderTeamStats(sortKey = 'winRate') {
    const stats  = [...SUBCAT_DATA.teamStats];
    const sortMap = { winRate: 'winRatePct', kd: 'kd', streak: 'winRatePct' };
    const key = sortMap[sortKey] || 'winRatePct';
    stats.sort((a, b) => b[key] - a[key]);

    // Destroy old charts
    Object.values(teamCharts).forEach(c => c.destroy());
    teamCharts = {};

    const maxKd      = Math.max(...stats.map(s => s.kd));
    const maxRounds  = Math.max(...stats.map(s => s.avgRoundsWon));

    const grid = document.getElementById('teamStatsGrid');
    grid.innerHTML = '';

    stats.forEach((ts, idx) => {
        const team = getTeam(ts.teamId);
        const kdFill      = Math.min(100, (ts.kd / maxKd) * 100);
        const roundFill   = Math.min(100, (ts.avgRoundsWon / maxRounds) * 100);
        const winFill     = ts.winRatePct;

        // Streak style
        const streakNum   = parseInt(ts.streak.slice(1));
        const streakType  = ts.streak[0];
        const streakClass = streakType === 'W' ? 'streak-hot' : streakType === 'L' ? 'streak-cold' : 'streak-neutral';
        const streakIcon  = streakType === 'W' ? '🔥' : streakType === 'L' ? '❄️' : '➡️';
        const streakLabel = streakType === 'W' ? `${streakNum}V Racha` : streakType === 'L' ? `${streakNum}D Racha` : 'Neutro';

        const chartId = `sparkChart${ts.teamId}`;

        const card = document.createElement('div');
        card.className = 'team-stat-card fade-in';
        card.style.setProperty('--delay', `${idx * 0.07}s`);
        card.innerHTML = `
            <div class="team-stat-header">
                <div class="team-stat-logo"><span>${team.icon}</span></div>
                <span class="team-stat-name">${team.name}</span>
                <span class="team-stat-streak ${streakClass}">${streakIcon} ${streakLabel}</span>
            </div>
            <div class="team-stat-rows">
                <div class="team-stat-row">
                    <div class="team-stat-label">
                        <span>K/D Ratio</span>
                        <span class="team-stat-value">${ts.kd.toFixed(2)}</span>
                    </div>
                    <div class="progress-bar-wrap"><div class="progress-bar-fill bar-kd" style="width:0%" data-fill="${kdFill}%"></div></div>
                </div>
                <div class="team-stat-row">
                    <div class="team-stat-label">
                        <span>Prom. Rounds Ganados</span>
                        <span class="team-stat-value">${ts.avgRoundsWon.toFixed(1)}</span>
                    </div>
                    <div class="progress-bar-wrap"><div class="progress-bar-fill bar-rounds" style="width:0%" data-fill="${roundFill}%"></div></div>
                </div>
                <div class="team-stat-row">
                    <div class="team-stat-label">
                        <span>Prom. Mapas Ganados</span>
                        <span class="team-stat-value">${ts.avgMapsWon.toFixed(1)}</span>
                    </div>
                </div>
                <div class="team-stat-row">
                    <div class="team-stat-label">
                        <span>% Victorias Recientes</span>
                        <span class="team-stat-value">${ts.winRatePct.toFixed(1)}%</span>
                    </div>
                    <div class="progress-bar-wrap"><div class="progress-bar-fill bar-win" style="width:0%" data-fill="${winFill}%"></div></div>
                </div>
            </div>
            <div class="team-mini-chart">
                <canvas id="${chartId}"></canvas>
            </div>
        `;
        grid.appendChild(card);

        // Observe for animation
        observer.observe(card);

        // Animate bars after a brief delay
        setTimeout(() => {
            card.querySelectorAll('.progress-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.fill;
            });
        }, 200 + idx * 70);

        // Sparkline chart
        setTimeout(() => {
            const ctx = document.getElementById(chartId);
            if (ctx && typeof Chart !== 'undefined') {
                teamCharts[ts.teamId] = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ts.sparkline.map((_, i) => `P${i+1}`),
                        datasets: [{
                            data: ts.sparkline,
                            borderColor: streakType === 'W' ? '#00e564' : streakType === 'L' ? '#ff3366' : '#ffc800',
                            backgroundColor: streakType === 'W'
                                ? 'rgba(0, 229, 100, 0.08)'
                                : streakType === 'L'
                                ? 'rgba(255, 51, 102, 0.08)'
                                : 'rgba(255, 200, 0, 0.08)',
                            borderWidth: 1.5,
                            pointRadius: 0,
                            fill: true,
                            tension: 0.4,
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                        scales: { x: { display: false }, y: { display: false } },
                        animation: { duration: 800 },
                    }
                });
            }
        }, 300 + idx * 70);
    });
}

function initTeamStats() {
    renderTeamStats('winRate');
    document.getElementById('teamStatsSortBy').addEventListener('change', function () {
        renderTeamStats(this.value);
    });
}

// ============================================================
// SECTION 3 — PLAYER STATS
// ============================================================
let playerSortCol  = 0; // index into game-specific columns
let playerSortAsc  = false;
let playerTeamFilter = 'all';

function getGameColumns(game) {
    const shared = ['nick', 'role', 'winPct'];
    const gameMap = {
        'CS:GO':    ['kills', 'deaths', 'adr'],
        'LoL':      ['kda', 'gold', 'cs'],
        'Valorant': ['kda', 'acs', 'hs'],
    };
    return gameMap[game] || gameMap['CS:GO'];
}

const COLUMN_META = {
    nick:    { label: 'Jugador',       key: 'nick',    format: v => v,                class: '' },
    role:    { label: 'Rol',           key: 'role',    format: v => `<span class="role-badge">${v}</span>`, class: '' },
    kills:   { label: 'Kills',         key: 'kills',   format: v => v.toFixed(1),      class: 'stat-highlight' },
    deaths:  { label: 'Deaths',        key: 'deaths',  format: v => v.toFixed(1),      class: '' },
    adr:     { label: 'ADR',           key: 'adr',     format: v => v.toFixed(1),      class: 'stat-highlight' },
    kda:     { label: 'KDA',           key: 'kda',     format: v => v.toFixed(2),      class: 'stat-highlight' },
    gold:    { label: 'Oro (prom)',     key: 'gold',    format: v => v ? v.toFixed(0) : '-', class: '' },
    cs:      { label: 'CS/min',        key: 'cs',      format: v => v ? v.toFixed(1) : '-', class: '' },
    acs:     { label: 'ACS',           key: 'acs',     format: v => v ? v.toFixed(1) : '-', class: 'stat-highlight' },
    hs:      { label: 'HS %',          key: 'hs',      format: v => v ? `${v.toFixed(1)}%` : '-', class: '' },
    winPct:  { label: '% Victorias',   key: 'winPct',  format: () => '', class: '' }, // custom render
};

function buildPlayerHeaders(game) {
    const cols = getGameColumns(game);
    const allCols = ['nick', 'role', ...cols, 'winPct'];
    const thead = document.getElementById('playerTableHead');
    thead.innerHTML = `<tr>${allCols.map((col, i) => {
        const m = COLUMN_META[col];
        return `<th class="${i === playerSortCol ? 'sort-' + (playerSortAsc ? 'asc' : 'desc') : ''}" data-ci="${i}">
            ${m.label}${i > 0 ? ' <ion-icon name="swap-vertical-outline"></ion-icon>' : ''}
        </th>`;
    }).join('')}</tr>`;

    // Attach sort listeners
    thead.querySelectorAll('th').forEach(th => {
        th.addEventListener('click', () => {
            const ci = parseInt(th.dataset.ci);
            if (playerSortCol === ci) {
                playerSortAsc = !playerSortAsc;
            } else {
                playerSortCol = ci;
                playerSortAsc = false;
            }
            renderPlayerTable(game);
        });
    });
}

function renderPlayerTable(game) {
    const cols = getGameColumns(game);
    const allCols = ['nick', 'role', ...cols, 'winPct'];
    const colKey = COLUMN_META[allCols[playerSortCol]]?.key || 'kills';

    // Filter
    let players = playerTeamFilter === 'all'
        ? [...SUBCAT_DATA.players]
        : SUBCAT_DATA.players.filter(p => p.teamId === parseInt(playerTeamFilter));

    // Sort
    players.sort((a, b) => {
        const av = a[colKey] ?? 0;
        const bv = b[colKey] ?? 0;
        if (typeof av === 'string') return playerSortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
        return playerSortAsc ? av - bv : bv - av;
    });

    const tbody = document.getElementById('playerTableBody');
    tbody.innerHTML = '';

    // Update header active state
    document.querySelectorAll('#playerTableHead th').forEach((th, i) => {
        th.classList.remove('sort-asc', 'sort-desc');
        if (i === playerSortCol) th.classList.add(playerSortAsc ? 'sort-asc' : 'sort-desc');
    });

    players.forEach((p, idx) => {
        const team = getTeam(p.teamId);
        const tr   = document.createElement('tr');

        const cells = allCols.map((col, ci) => {
            const m = COLUMN_META[col];
            if (col === 'nick') {
                return `<td>
                    <div class="player-name-cell">
                        <span class="player-avatar">${team.icon}</span>
                        <div>
                            <span class="player-nick">${p.nick}</span><br>
                            <span class="player-team-tag">${team.tag}</span>
                        </div>
                    </div>
                </td>`;
            }
            if (col === 'winPct') {
                return `<td>
                    <div class="winrate-bar-mini">
                        <span style="min-width:40px;font-family:var(--font-heading);font-weight:700;font-size:0.85rem;">${p.winPct.toFixed(1)}%</span>
                        <div class="winrate-mini-bar">
                            <div class="winrate-mini-fill" style="width:${p.winPct}%"></div>
                        </div>
                    </div>
                </td>`;
            }
            const val = p[m.key];
            const rendered = val !== undefined ? m.format(val) : '-';
            return `<td class="${ci === playerSortCol ? 'stat-highlight' : ''}">${rendered}</td>`;
        });

        tr.innerHTML = cells.join('');
        tr.style.opacity = '0';
        tbody.appendChild(tr);

        setTimeout(() => {
            tr.style.transition = 'opacity 0.3s ease';
            tr.style.opacity = '1';
        }, 30 * idx);
    });

    if (players.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${allCols.length}" style="text-align:center;padding:2rem;color:var(--text-muted);">No hay jugadores para este filtro.</td></tr>`;
    }
}

function initPlayerStats() {
    const game = SUBCAT_DATA.game;
    buildPlayerHeaders(game);
    renderPlayerTable(game);

    // Populate team filter
    const teamSel = document.getElementById('playerTeamFilter');
    SUBCAT_DATA.teams.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        teamSel.appendChild(opt);
    });

    teamSel.addEventListener('change', function () {
        playerTeamFilter = this.value;
        renderPlayerTable(game);
    });

    // Game filter
    const gameFilterSel = document.getElementById('playerGameFilter');
    // Set current game as selected
    [...gameFilterSel.options].forEach(opt => {
        if (opt.value.toLowerCase().replace(' ', '') === game.toLowerCase().replace(':', '').replace(' ', '')) {
            opt.selected = true;
        }
    });
    gameFilterSel.addEventListener('change', function () {
        const gMap = { csgo: 'CS:GO', lol: 'LoL', valorant: 'Valorant' };
        const newGame = gMap[this.value] || 'CS:GO';
        playerSortCol = 0;
        playerSortAsc = false;
        buildPlayerHeaders(newGame);
        renderPlayerTable(newGame);
    });
}

// ============================================================
// SECTION 4 — MATCH CALENDAR
// ============================================================
let currentWeek  = 1;
let calTeamFilter = 'all';
const MAX_WEEK   = Math.max(...SUBCAT_DATA.matches.map(m => m.week));

function renderCalendar() {
    clearTimers();

    let matches = SUBCAT_DATA.matches.filter(m => m.week === currentWeek);
    if (calTeamFilter !== 'all') {
        const tid = parseInt(calTeamFilter);
        matches = matches.filter(m => m.team1Id === tid || m.team2Id === tid);
    }

    document.getElementById('weekLabel').textContent = `Semana ${currentWeek}`;
    document.getElementById('prevWeekBtn').disabled = currentWeek <= 1;
    document.getElementById('nextWeekBtn').disabled = currentWeek >= MAX_WEEK;

    const hasLive = matches.some(m => m.status === 'live');
    document.getElementById('liveBanner').style.display = hasLive ? 'flex' : 'none';

    const list  = document.getElementById('calendarList');
    const empty = document.getElementById('calendarEmpty');
    list.innerHTML = '';

    if (matches.length === 0) {
        empty.style.display = 'block';
        list.style.display = 'none';
        return;
    }
    empty.style.display = 'none';
    list.style.display = 'flex';

    matches.forEach((m, idx) => {
        const t1   = getTeam(m.team1Id);
        const t2   = getTeam(m.team2Id);
        const dt   = new Date(`${m.date}T${m.time}:00`);
        const day  = dt.getDate().toString().padStart(2, '0');
        const mon  = dt.toLocaleDateString('es-ES', { month: 'short' }).toUpperCase();
        const timeStr = m.time;
        const matchMs = dt.getTime();

        let statusBadge = '';
        let scoreBlock  = '';
        let timerBlock  = '';

        if (m.status === 'live') {
            statusBadge = `<span class="match-status-badge status-live"><span class="live-dot"></span> En Directo</span>`;
            scoreBlock  = `<div class="match-score-display">
                <span class="match-score-num">${m.score1}</span>
                <span class="match-score-sep">:</span>
                <span class="match-score-num">${m.score2}</span>
            </div>`;
        } else if (m.status === 'completed') {
            statusBadge = `<span class="match-status-badge status-done">Finalizado</span>`;
            scoreBlock  = `<div class="match-score-display">
                <span class="match-score-num" style="color:${m.score1 > m.score2 ? 'var(--accent-primary)' : 'var(--text-muted)'}">${m.score1}</span>
                <span class="match-score-sep">:</span>
                <span class="match-score-num" style="color:${m.score2 > m.score1 ? 'var(--accent-primary)' : 'var(--text-muted)'}">${m.score2}</span>
            </div>`;
        } else {
            statusBadge = `<span class="match-status-badge status-upcoming">Próximamente</span>`;
            // Timer placeholder
            timerBlock  = `<div class="match-timer-block">
                <span class="match-timer-label">Empieza en</span>
                <span class="match-timer-value" id="timer_${m.id}">--:--:--</span>
            </div>`;
        }

        const cardClass = m.status === 'live' ? 'match-live' : m.status === 'completed' ? 'match-completed' : '';

        const card = document.createElement('div');
        card.className = `match-card ${cardClass}`;
        card.style.opacity = '0';
        card.innerHTML = `
            <div class="match-card-inner">
                <div class="match-datetime">
                    <span class="match-date-month">${mon}</span>
                    <span class="match-date-day">${day}</span>
                    <span class="match-time">${timeStr}</span>
                </div>

                <div class="match-teams-display">
                    <div class="match-team-entry left">
                        <div class="match-team-emblem">${t1.icon}</div>
                        <span class="match-team-name">${t1.name}</span>
                    </div>

                    <div class="match-vs-divider">
                        ${m.status === 'completed' || m.status === 'live' ? scoreBlock : 'VS'}
                    </div>

                    <div class="match-team-entry right">
                        <div class="match-team-emblem">${t2.icon}</div>
                        <span class="match-team-name">${t2.name}</span>
                    </div>
                </div>

                <div class="match-right-col">
                    ${statusBadge}
                    ${timerBlock}
                </div>
            </div>
        `;
        list.appendChild(card);

        // Animate in
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
        }, 60 * idx);

        // Start timer if upcoming
        if (m.status === 'upcoming') {
            const timerEl = document.getElementById(`timer_${m.id}`);
            if (timerEl) {
                const tick = () => {
                    const diff = matchMs - Date.now();
                    if (diff <= 0) {
                        timerEl.textContent = '¡AHORA!';
                        timerEl.classList.add('soon');
                        return;
                    }
                    timerEl.textContent = formatCountdown(diff);
                    if (diff < 3600000) timerEl.classList.add('soon'); // < 1 hour: glow
                    else timerEl.classList.remove('soon');
                };
                tick();
                timerIntervals.push(setInterval(tick, 1000));
            }
        }
    });
}

function initCalendar() {
    // Populate team filter
    const calSel = document.getElementById('calTeamFilter');
    SUBCAT_DATA.teams.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        calSel.appendChild(opt);
    });

    calSel.addEventListener('change', function () {
        calTeamFilter = this.value;
        renderCalendar();
    });

    document.getElementById('prevWeekBtn').addEventListener('click', () => {
        if (currentWeek > 1) { currentWeek--; renderCalendar(); }
    });
    document.getElementById('nextWeekBtn').addEventListener('click', () => {
        if (currentWeek < MAX_WEEK) { currentWeek++; renderCalendar(); }
    });

    renderCalendar();
}

// ============================================================
// TABS NAVIGATION
// ============================================================
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            btn.classList.add('active');
            const target = document.getElementById(btn.dataset.target);
            if (target) {
                const offset = document.querySelector('.sticky-tabs').offsetHeight + 20;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Highlight active tab on scroll
    const sections = document.querySelectorAll('.subcat-section');
    window.addEventListener('scroll', () => {
        let found = '';
        const stickyH = document.querySelector('.sticky-tabs')?.offsetHeight || 80;
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= stickyH + 60 && rect.bottom > stickyH) {
                found = sec.id;
            }
        });
        if (found) {
            tabs.forEach(t => {
                t.classList.toggle('active', t.dataset.target === found);
            });
        }
    }, { passive: true });
}

// ============================================================
// INTERSECTION OBSERVER (reuse for team stat cards)
// ============================================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

// ============================================================
// INIT ON DOM READY
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initTabs();
    initLeagueTable();
    initTeamStats();
    initPlayerStats();
    initCalendar();

    // Observe existing fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
