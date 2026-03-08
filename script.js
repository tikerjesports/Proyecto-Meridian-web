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
});
