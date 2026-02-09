// ===== SKY Conference Website JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initCarousel();
    initEditionTabs();
    initSmoothScroll();
    initScrollAnimations();
    initOptimizedScrollHandlers();
    initModals();
    
    // Initialize language toggle (from translations.js)
    if (typeof initLanguageToggle === 'function') {
        initLanguageToggle();
    }
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let isScrolled = false;
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY > 50;

                if (scrolled !== isScrolled) {
                    if (scrolled) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                    isScrolled = scrolled;
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ===== Mobile Menu Toggle =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Image Carousel =====
function initCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;
    
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    let currentSlide = 0;
    let autoplayInterval;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.dot');
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function goToSlide(index) {
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        updateCarousel();
        resetAutoplay();
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    carousel.addEventListener('mouseleave', startAutoplay);
    
    // Interactive slide clicks
    slides.forEach(slide => {
        slide.addEventListener('click', () => {
            const action = slide.dataset.action;
            const target = slide.dataset.target;
            
            if (action === 'modal') {
                openModal(target);
            } else if (action === 'link') {
                // Switch to the edition tab and scroll
                const tabs = document.querySelectorAll('.tab-btn');
                const contents = document.querySelectorAll('.edition-content');
                const edition = target.replace('edition-', '');
                
                tabs.forEach(t => {
                    t.classList.remove('active');
                    if (t.dataset.edition === edition) {
                        t.classList.add('active');
                    }
                });
                
                contents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === target) {
                        content.classList.add('active');
                    }
                });
                
                // Scroll to editions section
                const editionsSection = document.getElementById('editions');
                if (editionsSection) {
                    const offset = 80;
                    const targetPosition = editionsSection.getBoundingClientRect().top + window.pageYOffset - offset;
                    smoothScrollTo(targetPosition, 400);
                }
            }
        });
    });
}

// ===== Edition Tabs =====
function initEditionTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.edition-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const edition = tab.dataset.edition;
            
            // Update active states
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            contents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `edition-${edition}`) {
                    content.classList.add('active');
                }
            });
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Use faster custom scroll for better UX
                smoothScrollTo(targetPosition, 400);
            }
        });
    });
}

// Custom smooth scroll with configurable duration
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth deceleration
        const easeOutQuad = progress * (2 - progress);
        
        window.scrollTo(0, startPosition + distance * easeOutQuad);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    // Check if user has reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Skip animations for users who prefer reduced motion
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px 0px 0px'
    };
    
    // Track scroll speed for adaptive animations
    let lastScrollY = window.scrollY;
    let scrollSpeed = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollSpeed = Math.abs(currentScrollY - lastScrollY);
        lastScrollY = currentScrollY;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollSpeed = 0;
        }, 100);
    }, { passive: true });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Fast scroll = instant animation, slow scroll = smooth animation
                const isFastScroll = scrollSpeed > 50;
                
                if (isFastScroll) {
                    entry.target.style.transition = 'none';
                    entry.target.classList.add('animate-in');
                } else {
                    entry.target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    entry.target.classList.add('animate-in');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add animation classes to elements
    const animateElements = document.querySelectorAll(
        '.about-card, .aim-card, .speaker-card, .register-card, .initiator-card, .section-header'
    );
    
    animateElements.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
    
    // Add animate-in class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Instantly show elements already in viewport on page load
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.transition = 'none';
                el.classList.add('animate-in');
                observer.unobserve(el);
            }
        });
    }, 50);
}

// ===== Optimized Scroll Handlers (Active Nav & Parallax) =====
function initOptimizedScrollHandlers() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const orbs = document.querySelectorAll('.gradient-orb');
    
    // Cache section offsets to prevent layout thrashing
    // optimization: read layout once, not on every scroll
    let sectionOffsets = [];
    let lastActiveId = null; // Track state to avoid redundant DOM writes

    function updateSectionOffsets() {
        sectionOffsets = Array.from(sections).map(section => ({
            id: section.getAttribute('id'),
            top: section.offsetTop - 100
        }));
    }

    // Initial calculation
    updateSectionOffsets();

    // Update on resize (debounced) and when content fully loads
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateSectionOffsets, 100);
    }, { passive: true });

    // Ensure offsets are correct after images load
    window.addEventListener('load', updateSectionOffsets);

    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Active Navigation Highlight
                let current = '';

                // Use cached offsets (O(n) lookup without DOM access)
                for (const section of sectionOffsets) {
                    if (scrolled >= section.top) {
                        current = section.id;
                    }
                }

                // Only touch DOM if state changed
                if (current !== lastActiveId) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${current}`) {
                            link.classList.add('active');
                        }
                    });
                    lastActiveId = current;
                }

                // Parallax Effect
                orbs.forEach((orb, index) => {
                    const speed = 0.1 * (index + 1);
                    orb.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ===== Counter Animation for Statistics (if added) =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Preloader (optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Modal Functions =====
function initModals() {
    // Close modal when clicking overlay
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with close button
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Collapse all expanded bios when closing
        modal.querySelectorAll('.conference-speaker-card.expanded').forEach(card => {
            card.classList.remove('expanded');
            const toggle = card.querySelector('.read-more-toggle');
            if (toggle) toggle.textContent = 'Read more ↓';
        });
    }
}

// Toggle bio expansion in conference modals
function toggleBio(card) {
    card.classList.toggle('expanded');
    const toggle = card.querySelector('.read-more-toggle');
    if (toggle) {
        toggle.textContent = card.classList.contains('expanded') ? 'Show less' : 'Read more ↓';
    }
}

// Open modal with a specific speaker's bio already expanded
function openSpeakerBio(modalId, speakerId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // First collapse any previously expanded cards
        modal.querySelectorAll('.conference-speaker-card.expanded').forEach(card => {
            card.classList.remove('expanded');
            const toggle = card.querySelector('.read-more-toggle');
            if (toggle) toggle.textContent = 'Read more ↓';
        });
        
        // Open the modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Find and expand the specific speaker
        const speakerCard = document.getElementById(speakerId);
        if (speakerCard) {
            speakerCard.classList.add('expanded');
            const toggle = speakerCard.querySelector('.read-more-toggle');
            if (toggle) toggle.textContent = 'Show less';
            
            // Scroll to the speaker card within the modal after a brief delay
            setTimeout(() => {
                speakerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }
}

// Make functions globally available for inline onclick handlers
window.openModal = openModal;
window.closeModal = closeModal;
window.toggleBio = toggleBio;
window.openSpeakerBio = openSpeakerBio;
