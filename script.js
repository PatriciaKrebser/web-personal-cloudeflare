document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // Mobile Navigation Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close mobile menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================================================
    // Sticky Header Scroll Effect
    // ==========================================================================
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once at load

    // ==========================================================================
    // Active Navigation Link Highlighting on Scroll
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            // Adjust offset for fixed header (80px)
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            
            const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (activeLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    activeLink.classList.add('active');
                } else {
                    activeLink.classList.remove('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // ==========================================================================
    // Reveal Animations on Scroll (Intersection Observer)
    // ==========================================================================
    // Add reveal class to sections & grids for smooth entry animation
    const animateElements = [
        document.querySelector('.about-info'),
        document.querySelector('.about-stat-card'),
        document.querySelector('.skills-grid'),
        document.getElementById('project-ai-map'),
        document.getElementById('project-upcoming'),
        document.querySelector('.timeline'),
        document.querySelector('.contact-info-block'),
        document.querySelector('.contact-form-block')
    ];

    animateElements.forEach(el => {
        if (el) el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it's the stat card, animate the skill bar widths
                if (entry.target.classList.contains('about-stat-card')) {
                    animateStatBars(entry.target);
                }
                
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(reveal => revealObserver.observe(reveal));

    // ==========================================================================
    // Stat Bars Animation Lógica
    // ==========================================================================
    const animateStatBars = (card) => {
        const fills = card.querySelectorAll('.stat-bar-fill');
        fills.forEach(fill => {
            // Get target width from CSS and set it initially to 0, then transition to target
            let targetWidth = '0%';
            if (fill.classList.contains('fill-front')) targetWidth = '80%';
            if (fill.classList.contains('fill-back')) targetWidth = '75%';
            if (fill.classList.contains('fill-ai')) targetWidth = '70%';
            
            fill.style.width = '0%';
            // Force reflow
            fill.offsetHeight;
            fill.style.width = targetWidth;
        });
    };

    // ==========================================================================
    // Contact Form Submission & Validation Simulation
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('btn-submit-form');

    if (contactForm && formFeedback && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get inputs
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();
            
            // Basic Validation
            if (!name || !email || !message) {
                showFeedback('Por favor, rellena todos los campos.', 'error');
                return;
            }
            
            // Save original button content
            const originalBtnText = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Enviando... <span class="spinner-button"></span>';
            submitBtn.style.opacity = '0.7';
            
            // Simulate API Request
            setTimeout(() => {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.opacity = '1';
                
                // Show Success Feedback
                showFeedback('¡Mensaje enviado con éxito! Me pondré en contacto contigo muy pronto.', 'success');
                
                // Reset Form
                contactForm.reset();
            }, 1800);
        });
    }

    const showFeedback = (msg, type) => {
        formFeedback.textContent = msg;
        formFeedback.className = `form-feedback show ${type}`;
        
        // Hide feedback after 5 seconds
        setTimeout(() => {
            formFeedback.classList.remove('show');
        }, 5000);
    };
});
