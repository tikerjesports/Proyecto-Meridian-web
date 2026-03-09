document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navLinksContainer.classList.toggle('active');
            
            const icon = this.querySelector('ion-icon');
            if (icon) {
                if (navLinksContainer.classList.contains('active')) {
                    icon.setAttribute('name', 'close-outline');
                } else {
                    icon.setAttribute('name', 'menu-outline');
                }
            }
        });

        // Close mobile menu when clicking a link
        const navLinksAll = document.querySelectorAll('.nav-links a');
        navLinksAll.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileToggle.querySelector('ion-icon');
                if (icon) icon.setAttribute('name', 'menu-outline');
            });
        });
    }

    // 2. Intersection Observer for scroll animations (fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible to only animate once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 3. Navigation link active state update on scroll
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-btn)');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100; // offset for navbar

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current) && current !== '') {
                link.classList.add('active');
            }
        });
    });

    // 4. Smooth scrolling for internal anchor links and Page Transitioning
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (!href || href === '#') return;
            
            // Handle internal ID jumping
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    // Close mobile nav if open
                    if (navLinksContainer && navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                        if (mobileToggle) {
                            const icon = mobileToggle.querySelector('ion-icon');
                            if (icon) icon.setAttribute('name', 'menu-outline');
                        }
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // adjust for navbar height
                        behavior: 'smooth'
                    });
                }
            } 
            // Handle real page transitions (excluding external links starting with http or target blank)
            else if (!href.startsWith('http') && this.getAttribute('target') !== '_blank') {
                e.preventDefault();
                
                // Add fade out class to body
                document.body.classList.add('page-transitioning');
                
                // Wait for animation to finish then navigate
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // matches CSS transition duration
            }
        });
    });

    // On Load Page Transition (Fade In)
    document.body.classList.add('page-loaded');
    // 5. Ranking Tables Sorting Logic
    const sortableHeaders = document.querySelectorAll('.ranking-table th.sortable');
    
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const table = header.closest('table');
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.querySelectorAll('tr'));
            const sortType = header.getAttribute('data-sort'); // 'points' or 'wins'
            
            // Toggle active visual state
            table.querySelectorAll('th.sortable').forEach(th => th.classList.remove('active-sort'));
            table.querySelectorAll('th.sortable ion-icon').forEach(icon => icon.setAttribute('name', 'swap-vertical'));
            
            header.classList.add('active-sort');
            header.querySelector('ion-icon').setAttribute('name', 'chevron-down');
            
            // Determine column index to sort by dynamically based on content
            let colIndex = 3; // default for wins
            if (sortType === 'points') colIndex = 6;
            
            rows.sort((a, b) => {
                const aVal = parseInt(a.querySelectorAll('td')[colIndex].innerText.trim()) || 0;
                const bVal = parseInt(b.querySelectorAll('td')[colIndex].innerText.trim()) || 0;
                
                return bVal - aVal; // Descending order
            });
            
            // Re-append sorted rows with slight animation
            rows.forEach((row, index) => {
                row.style.opacity = '0';
                tbody.appendChild(row);
                
                // Keep the rank number sequential despite the sort
                row.querySelector('.rank-num').innerText = index + 1;
                
                setTimeout(() => {
                    row.style.opacity = '1';
                }, 50 * index);
            });
        });
    });

    // 6. Registration Form Logic
    const registerForm = document.getElementById('teamRegisterForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const submitText = document.getElementById('submitBtnText');
            const successIcon = document.getElementById('submitSuccessIcon');
            const successMessage = document.getElementById('formSuccessMessage');
            
            // Basic validation (HTML5 required attributes handle most of it, but checking here to ensure UI acts right)
            if (this.checkValidity()) {
                
                // Simulate loading state
                submitText.innerText = 'Procesando...';
                submitBtn.style.opacity = '0.7';
                
                // Simulate API Call / Processing
                setTimeout(() => {
                    // Success State Changes
                    submitBtn.classList.add('success-state');
                    submitBtn.style.opacity = '1';
                    submitText.innerText = 'Enviado';
                    successIcon.style.display = 'inline-block';
                    
                    // Show success message alert
                    successMessage.classList.add('show');
                    
                    // Reset inputs but keep visual success state
                    this.reset();
                    
                    // Bring user attention down to the success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                }, 1500);
            }
        });
    }
    
    // 7. Dynamic Data Loading from LocalStorage (Public Pages)
    // Only overwrite if we have mock data initialized from admin panel
    if (localStorage.getItem('meridian_competitions')) {
        loadPublicData();
    }
});

function loadPublicData() {
    const path = window.location.pathname;
    const isIndex = path.endsWith('index.html') || path.endsWith('/');
    const isComps = path.includes('competitions.html');
    const isRankings = path.includes('rankings.html');
    const isNews = path.includes('news.html');
    
    // Helper to get team name
    const getTeamName = (id) => {
        const teams = JSON.parse(localStorage.getItem('meridian_teams') || '[]');
        const t = teams.find(t => t.id == id);
        return t ? t.name : 'Equipo Desconocido';
    };

    const comps = JSON.parse(localStorage.getItem('meridian_competitions') || '[]');
    const matches = JSON.parse(localStorage.getItem('meridian_matches') || '[]');
    const news = JSON.parse(localStorage.getItem('meridian_news') || '[]');
    const ranks = JSON.parse(localStorage.getItem('meridian_rankings') || '[]');

    // Helper to get competition logo
    const getCompLogo = (category) => {
        if (category === 'Meridian Cup') return 'assets/logos/meridian-cup.png';
        if (category === 'Meridian Contenders') return 'assets/logos/meridian-contenders.png';
        if (category === 'Meridian Test Series') return 'assets/logos/meridian-test-series.png';
        return 'assets/logos/meridian-logo.png';
    };

    // --- 1. RANKINGS ---
    if (isRankings || document.querySelector('.ranking-page')) {
        ranks.sort((a,b) => b.puntos - a.puntos || b.mapDiff - a.mapDiff);
        
        const renderTable = (tableElement, data) => {
            if (!tableElement) return;
            let html = '';
            data.forEach((r, i) => {
                let rankClass = i === 0 ? 'rank-up' : (i === 1 ? 'rank-same' : 'rank-down');
                let mapClass = r.mapDiff > 0 ? 'positive' : (r.mapDiff < 0 ? 'negative' : 'neutral');
                let mapSign = r.mapDiff > 0 ? '+' : '';
                
                html += `
                <tr class="${rankClass}">
                    <td><span class="rank-num">${i+1}</span></td>
                    <td class="team-cell"><div class="team-logo-placeholder"><ion-icon name="shield"></ion-icon></div> ${getTeamName(r.teamId)}</td>
                    <td>${r.pJugados}</td>
                    <td>${r.pGanados}</td>
                    <td>${r.pPerdidos}</td>
                    <td class="${mapClass}">${mapSign}${r.mapDiff}</td>
                    <td class="points-col">${r.puntos}</td>
                </tr>`;
            });
            tableElement.innerHTML = html || '<tr><td colspan="7" class="text-center" style="padding: 2rem;">No hay datos para esta división aún</td></tr>';
        };

        const cupTable = document.querySelector('.data-table[data-tier="cup"] tbody');
        const contendersTable = document.querySelector('.data-table[data-tier="contenders"] tbody');
        const testTable = document.querySelector('.data-table[data-tier="test"] tbody');
        
        // For demonstration, map all teams to Cup if less than 5, or distribute.
        if (ranks.length > 0) {
            renderTable(cupTable, ranks);
            // Clear others
            if(contendersTable) renderTable(contendersTable, []);
            if(testTable) renderTable(testTable, []);
        }
    }

    // --- 2. NEXT MATCH WIDGET ---
    const nextMatchWidget = document.getElementById('nextMatchWidget');
    if (nextMatchWidget) {
        const pendingMatches = matches.filter(m => m.status === 'Pendiente' && m.date && m.time);
        if (pendingMatches.length > 0) {
            pendingMatches.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));
            const nextMatch = pendingMatches[0];
            const matchDate = new Date(`${nextMatch.date}T${nextMatch.time}`).getTime();
            
            document.getElementById('nmCategory').innerText = nextMatch.category;
            document.getElementById('nmTeam1').innerText = getTeamName(nextMatch.team1);
            document.getElementById('nmTeam2').innerText = getTeamName(nextMatch.team2);
            
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = matchDate - now;

                if (distance < 0) {
                    clearInterval(timer);
                    ['cdDays','cdHours','cdMins','cdSecs'].forEach(id => document.getElementById(id).innerText = "00");
                    return;
                }

                document.getElementById('cdDays').innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                document.getElementById('cdHours').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                document.getElementById('cdMins').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                document.getElementById('cdSecs').innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
            }, 1000);
        } else {
            nextMatchWidget.style.display = 'none';
        }
    }

    // --- 3. COMPETITIONS PAGE ---
    if (isComps) {
        const renderCompCard = (comp, type) => {
            let statusClass = "status-upcoming";
            let statusText = "Próximamente";
            const curDate = new Date();
            const startDate = new Date(comp.startDate);
            const endDate = new Date(comp.endDate);
            
            if (curDate >= startDate && curDate <= endDate) {
                statusClass = "status-live";
                statusText = "En Directo";
            } else if (curDate > endDate) {
                statusClass = "status-completed";
                statusText = "Finalizado";
            }

            const dStr = startDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) + ' - ' + endDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

            return `
                <div class="comp-card fade-in ${type}-card visible">
                    <div class="comp-status ${statusClass}">${statusText}</div>
                    <div class="comp-logo-container">
                        <img src="${getCompLogo(comp.category)}" alt="${comp.category} Logo" class="comp-logo-img">
                    </div>
                    <div class="comp-main">
                        <h3 class="comp-title">${comp.name}</h3>
                        <div class="comp-details">
                            <span class="detail-item"><ion-icon name="game-controller-outline"></ion-icon> ${comp.format}</span>
                            <span class="detail-item"><ion-icon name="calendar-outline"></ion-icon> ${dStr}</span>
                            <span class="detail-item"><ion-icon name="people-outline"></ion-icon> Varios Equipos</span>
                        </div>
                    </div>
                    <div class="comp-action">
                        <a href="#" class="btn btn-outline btn-sm">Ver Torneo</a>
                    </div>
                </div>
            `;
        };

        const cupContainer = document.querySelector('.cup-section .comps-list');
        const contendersContainer = document.querySelector('.contenders-section .comps-list');
        const testContainer = document.querySelector('.test-section .comps-list');

        const cupComps = comps.filter(c => c.category === 'Meridian Cup');
        const contComps = comps.filter(c => c.category === 'Meridian Contenders');
        const testComps = comps.filter(c => c.category === 'Meridian Test Series');

        if (cupContainer && cupComps.length > 0) cupContainer.innerHTML = cupComps.map(c => renderCompCard(c, 'premium')).join('');
        if (contendersContainer && contComps.length > 0) contendersContainer.innerHTML = contComps.map(c => renderCompCard(c, 'contenders')).join('');
        if (testContainer && testComps.length > 0) testContainer.innerHTML = testComps.map(c => renderCompCard(c, 'test')).join('');
    }

    // --- 4. INDEX PAGE RECENT COMPETITIONS ---
    if (isIndex && comps.length > 0) {
        const tList = document.querySelector('.tournament-list');
        if (tList) {
            tList.innerHTML = comps.slice(0, 3).map(c => {
                let badgeClass = '', indClass = '';
                if(c.category === 'Meridian Cup') { badgeClass = 'premium-badge'; indClass = 'premium'; }
                else if(c.category === 'Meridian Contenders') { badgeClass = 'contenders-badge'; indClass = 'contenders'; }
                else { badgeClass = 'test-badge'; indClass = 'test'; }

                const ds = new Date(c.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                const de = new Date(c.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
                return `
                <div class="tourney-item fade-in visible">
                    <div class="tourney-indicator ${indClass}"></div>
                    <div class="tourney-logo-col">
                        <img src="${getCompLogo(c.category)}" alt="${c.category} Logo" class="tourney-logo-img">
                    </div>
                    <div class="tourney-info">
                        <span class="tourney-badge ${badgeClass}">${c.category}</span>
                        <h3 class="tourney-name">${c.name}</h3>
                    </div>
                    <div class="tourney-meta">
                        <div class="meta-item"><ion-icon name="calendar-outline"></ion-icon><span>${ds} - ${de}</span></div>
                        <div class="meta-item"><ion-icon name="people-outline"></ion-icon><span>${c.format}</span></div>
                    </div>
                    <div class="tourney-action"><a href="competitions.html" class="btn btn-outline btn-sm">Ver Detalles</a></div>
                </div>`;
            }).join('');
        }
    }

    // --- 5. NEWS PAGE ---
    if (isNews && news.length > 0) {
        const newsGrid = document.querySelector('.news-detailed-section .news-grid');
        if (newsGrid) {
            newsGrid.innerHTML = news.map(n => `
                <article class="news-card fade-in twitter-card visible">
                    <div class="tweet-header">
                        <div class="tweet-author">
                            <div class="author-avatar"><ion-icon name="game-controller"></ion-icon></div>
                            <div class="author-info">
                                <span class="author-name">Meridian Admin</span>
                                <span class="author-handle">@Meridiancircuit</span>
                            </div>
                        </div>
                        <ion-icon name="logo-twitter" class="twitter-icon"></ion-icon>
                    </div>
                    <div class="tweet-content">
                        <h4 class="tweet-title">${n.title}</h4>
                        <p class="tweet-excerpt">${n.content}</p>
                    </div>
                    <div class="tweet-footer">
                        <span class="tweet-date">${n.date}</span>
                        <a href="https://x.com/Meridiancircuit" target="_blank" class="btn btn-outline btn-sm">Ver Pub.</a>
                    </div>
                </article>
            `).join('');
        }
    }
}


