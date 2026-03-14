/**
 * MERIDIAN ESPORTS — Subcategory Page Script
 * Handles: League Table, Team Stats, Player Stats, Match Calendar w/ Timers
 */

// ============================================================
// DEMO DATA — Replace / augment with real data from admin panel
// ============================================================
const SUBCAT_DATA = {
    category: "Meridian Cup",
    game: "CS:GO",          // "CS:GO" | "LoL" | "Valorant"
    format: "BO3",
    status: "live",         // "live" | "upcoming" | "completed"
    logoSrc: "assets/logos/meridian-cup.png",
    description: "El nivel más alto del circuito Meridian donde los mejores equipos compiten por el título principal.",

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
        { teamId: 1, pj: 3, v: 3, d: 0, mapDiff: 6, pts: 9 },
        { teamId: 2, pj: 3, v: 2, d: 1, mapDiff: 2, pts: 6 },
        { teamId: 3, pj: 2, v: 1, d: 1, mapDiff: 0, pts: 3 },
        { teamId: 4, pj: 2, v: 1, d: 1, mapDiff: -1, pts: 3 },
        { teamId: 5, pj: 1, v: 0, d: 1, mapDiff: -2, pts: 0 },
        { teamId: 6, pj: 1, v: 0, d: 1, mapDiff: -2, pts: 0 },
        { teamId: 7, pj: 1, v: 0, d: 1, mapDiff: -2, pts: 0 },
        { teamId: 8, pj: 1, v: 0, d: 1, mapDiff: -2, pts: 0 },
    ],

    bracket: {
        quarterfinals: [
            { id: 'q1', top: { teamId: 1, score: 2 }, bottom: { teamId: 8, score: 0 }, status: 'completed' },
            { id: 'q2', top: { teamId: 4, score: 2 }, bottom: { teamId: 5, score: 1 }, status: 'completed' },
            { id: 'q3', top: { teamId: 3, score: 2 }, bottom: { teamId: 6, score: 0 }, status: 'completed' },
            { id: 'q4', top: { teamId: 2, score: 2 }, bottom: { teamId: 7, score: 0 }, status: 'completed' }
        ],
        semifinals: [
            { id: 's1', top: { teamId: 1, score: 2 }, bottom: { teamId: 4, score: 0 }, status: 'completed' },
            { id: 's2', top: { teamId: 3, score: 1 }, bottom: { teamId: 2, score: 2 }, status: 'live' }
        ],
        final: [
            { id: 'f1', top: { teamId: 1, score: 0 }, bottom: { teamId: null, score: 0 }, status: 'upcoming', format: 'BO5' }
        ]
    },

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
// SECTION 1 — TOURNAMENT BRACKET
// ============================================================
function renderBracketMatchSlot(teamData, isWinner) {
    if (!teamData || teamData.teamId === null) {
        return `
            <div class="match-slot empty-slot">
                <span class="slot-name">Por determinar</span>
                <span class="slot-score">-</span>
            </div>
        `;
    }
    const team = getTeam(teamData.teamId);
    const classes = isWinner ? "match-slot winner" : "match-slot";
    return `
        <div class="${classes}">
            <div class="slot-team-info">
                <span class="slot-icon">${team.icon}</span>
                <span class="slot-name">${team.name}</span>
            </div>
            <span class="slot-score">${teamData.score}</span>
        </div>
    `;
}

function renderBracketNode(match) {
    let topWinner = false;
    let bottomWinner = false;

    if (match.status === 'completed') {
        topWinner = match.top.score > match.bottom.score;
        bottomWinner = match.bottom.score > match.top.score;
    }

    let statusText = match.status === 'live' ? 'En Directo' : match.status === 'completed' ? 'Finalizado' : 'Próximamente';
    let statusClass = match.status === 'live' ? 'status-live' : match.status === 'completed' ? 'status-done' : 'status-upcoming';
    let format = match.format || 'BO3';

    return `
        <div class="bracket-match">
            <div class="bracket-match-header">
                <span class="bracket-format">${format}</span>
                <span class="bracket-status ${statusClass}">${statusText}</span>
            </div>
            <div class="bracket-match-body">
                ${renderBracketMatchSlot(match.top, topWinner)}
                ${renderBracketMatchSlot(match.bottom, bottomWinner)}
            </div>
        </div>
    `;
}

function initBracket() {
    const container = document.getElementById('bracketContainer');
    if (!container) return;

    const b = SUBCAT_DATA.bracket;
    let html = '';

    // QF
    html += '<div class="bracket-round">';
    html += '<h3 class="bracket-round-title">Cuartos de Final</h3>';
    b.quarterfinals.forEach(m => { html += renderBracketNode(m); });
    html += '</div>';

    // SF
    html += '<div class="bracket-round">';
    html += '<h3 class="bracket-round-title">Semifinales</h3>';
    b.semifinals.forEach(m => { html += renderBracketNode(m); });
    html += '</div>';

    // Final
    html += '<div class="bracket-round bracket-final">';
    html += '<h3 class="bracket-round-title">Gran Final</h3>';
    b.final.forEach(m => { html += renderBracketNode(m); });
    html += '</div>';

    container.innerHTML = html;
}

// ============================================================
// SECTION 2 — TOURNAMENT STATS
// ============================================================
let cupSortCol = 'pts';
let cupSortAsc = false;

function renderCupStats() {
    const data = [...SUBCAT_DATA.teamStats];

    // Sort
    data.sort((a, b) => {
        const aVal = a[cupSortCol] ?? 0;
        const bVal = b[cupSortCol] ?? 0;
        return cupSortAsc ? aVal - bVal : bVal - aVal;
    });

    const tbody = document.getElementById('cupStatsBody');
    if(!tbody) return;
    tbody.innerHTML = '';

    data.forEach((row, i) => {
        const team    = getTeam(row.teamId);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="team-cell-inner">
                    <div class="team-logo-mini"><span>${team.icon}</span></div>
                    <span class="team-name-text">${team.name}</span>
                </div>
            </td>
            <td>${row.pj}</td>
            <td>${row.v}</td>
            <td>${row.d}</td>
            <td>${row.mapDiff > 0 ? '+'+row.mapDiff : row.mapDiff}</td>
            <td><span class="pts-value">${row.pts}</span></td>
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
    document.querySelectorAll('#cupStatsTable thead th.sortable-col').forEach(th => {
        th.classList.remove('active-sort');
        const icon = th.querySelector('ion-icon');
        if (icon) icon.setAttribute('name', th.dataset.col === cupSortCol ? (cupSortAsc ? 'chevron-up-outline' : 'chevron-down-outline') : 'remove-outline');
        if (th.dataset.col === cupSortCol) th.classList.add('active-sort');
    });
}

function initCupStats() {
    renderCupStats();
    document.querySelectorAll('#cupStatsTable thead th.sortable-col').forEach(th => {
        th.addEventListener('click', () => {
            if (cupSortCol === th.dataset.col) {
                cupSortAsc = !cupSortAsc;
            } else {
                cupSortCol = th.dataset.col;
                cupSortAsc = false;
            }
            renderCupStats();
        });
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
    initBracket();
    initCupStats();
    initCalendar();

    // Observe existing fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
});
