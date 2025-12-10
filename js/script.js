// =====================================================
// THRIVEAXIS MAIN JAVASCRIPT FILE - COMPLETE & UPDATED
// Mobile-Friendly with Fixed Hamburger Navigation
// =====================================================

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing ThriveAxis');
    
    // Initialize all components
    initNavigation();
    initAnimations();
    initScrollEffects();
    initFormHandlers();
    initFilterSystem();
    initCounters();
    initOverlapPrevention();
    initHoverEffects();
    initHeroSlideshow();
    initContactAnimations();
    initFAQ();
    initTestimonials();
    
    // Page-specific initializations
    if (document.querySelector('.digital-marketing-page')) {
        initDigitalMarketingPage();
    }
    
    if (document.querySelector('.webdev-hero')) {
        initWebDevPage();
    }
    
    if (document.querySelector('.services-page')) {
        initServicesPage();
    }
    
    if (document.querySelector('.contact-page')) {
        initContactPage();
    }
    
    if (document.querySelector('.about-page')) {
        initAboutPage();
    }
    
    console.log('ThriveAxis website initialized successfully');
});

// ===== NAVIGATION FUNCTIONALITY - MOBILE FIXED =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    
    console.log('Initializing navigation...');
    console.log('Hamburger:', hamburger);
    console.log('Nav menu:', navMenu);
    console.log('Nav links:', navLinks.length);
    
    if (!hamburger || !navMenu) {
        console.error('Navigation elements not found!');
        return;
    }
    
    // Hamburger click handler
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const isActive = hamburger.classList.contains('active');
        
        console.log('Hamburger clicked, currently active:', isActive);
        
        if (isActive) {
            // Close menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // Open menu
            hamburger.classList.add('active');
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('Nav link clicked:', this.textContent);
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const isClickInsideMenu = navMenu.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideMenu && !isClickOnHamburger && hamburger.classList.contains('active')) {
            console.log('Clicked outside menu - closing');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Prevent menu close when clicking inside the menu
    navMenu.addEventListener('click', function(e) {
        if (!e.target.classList.contains('nav-link')) {
            e.stopPropagation();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            console.log('Escape key pressed - closing menu');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(6, 20, 46, 0.98)';
                navbar.style.padding = '0.5rem 0';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.background = 'rgba(6, 20, 46, 0.95)';
                navbar.style.padding = '1rem 0';
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Handle window resize - close menu if switching to desktop
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && hamburger.classList.contains('active')) {
                console.log('Resized to desktop - closing mobile menu');
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
    
    console.log('Navigation initialized successfully');
}

// ===== ANIMATION INITIALIZATION =====
function initAnimations() {
    // GSAP animations
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
            .from('.hero-subtitle', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
            .from('.hero-buttons', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3');
        
        // Service cards animation
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-preview',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        // Process steps animation
        gsap.from('.process-step', {
            scrollTrigger: {
                trigger: '.process-section',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out'
        });
    }
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.classList.contains('btn') || this.getAttribute('href') === '#') {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM HANDLERS =====
function initFormHandlers() {
    initForms();
    initContactAnimations();
}

function initForms() {
    const contactForms = document.querySelectorAll('.contact-form, .newsletter-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function initContactAnimations() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                color: white;
                z-index: 10000;
                max-width: 400px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }
            .notification-success { background: #10b981; }
            .notification-error { background: #ef4444; }
            .notification-info { background: #3b82f6; }
            .notification.show { transform: translateX(0); }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                margin-left: 10px;
            }
        `;
        document.head.appendChild(styles);
    }
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== FILTER SYSTEM FOR BLOG =====
function initFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterBtns.length === 0 || blogCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('More articles loaded!');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1500);
        });
    }
}

// ===== COUNTER ANIMATIONS =====
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count')) || 1000;
                    const duration = 2000;
                    const step = count / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= count) {
                            current = count;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== OVERLAP PREVENTION =====
function initOverlapPrevention() {
    const contentSections = document.querySelectorAll('section:not(.hero)');
    contentSections.forEach((section, index) => {
        section.style.zIndex = index + 2;
    });
    
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.zIndex = 100;
    }
    
    window.addEventListener('resize', adjustHeroContent);
    adjustHeroContent();
}

function adjustHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    
    if (heroContent && hero) {
        const heroHeight = hero.offsetHeight;
        const contentHeight = heroContent.offsetHeight;
        
        if (contentHeight > heroHeight * 0.7) {
            hero.style.paddingTop = '80px';
            hero.style.paddingBottom = '80px';
        } else {
            hero.style.paddingTop = '';
            hero.style.paddingBottom = '';
        }
    }
}

// ===== HERO SLIDESHOW =====
function initHeroSlideshow() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const images = [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
        'https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    ];
    
    let currentImageIndex = 0;
    let slideshowInterval;
    let dotsContainer;
    let dots = [];

    function setInitialBackground() {
        hero.style.background = `linear-gradient(rgba(6, 20, 46, 0.7), rgba(6, 20, 46, 0.75)), url('${images[0]}') no-repeat center center/cover`;
    }

    function createDots() {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'hero-slideshow-dots';
        
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'hero-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
            
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
        
        hero.appendChild(dotsContainer);
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentImageIndex);
        });
    }

    function changeBackground() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        hero.style.background = `linear-gradient(rgba(6, 20, 46, 0.7), rgba(6, 20, 46, 0.75)), url('${images[currentImageIndex]}') no-repeat center center/cover`;
        updateDots();
    }

    function goToSlide(index) {
        currentImageIndex = index;
        hero.style.background = `linear-gradient(rgba(6, 20, 46, 0.7), rgba(6, 20, 46, 0.75)), url('${images[currentImageIndex]}') no-repeat center center/cover`;
        updateDots();
        startAutomaticSlideshow();
    }

    function handleHeroClick(e) {
        if (!e.target.classList.contains('hero-dot')) {
            changeBackground();
            startAutomaticSlideshow();
        }
    }

    function startAutomaticSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        slideshowInterval = setInterval(changeBackground, 10000);
    }

    setInitialBackground();
    createDots();
    startAutomaticSlideshow();
    hero.addEventListener('click', handleHeroClick);
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    const sliderContainer = document.getElementById('sliderContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !sliderContainer) return;
    
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let currentIndex = 0;
    let autoScrollEnabled = true;
    
    const originalTestimonials = Array.from(document.querySelectorAll('.testimonial-card')).slice(0, 10);
    const totalOriginalTestimonials = originalTestimonials.length;
    
    function startAutoScroll() {
        if (autoScrollEnabled && track) {
            track.style.animation = 'scroll-testimonials 40s linear infinite';
            track.style.animationPlayState = 'running';
        }
    }
    
    function stopAutoScroll() {
        if (track) {
            track.style.animation = 'none';
        }
    }
    
    function handleImageError(img) {
        const avatarContainer = img.parentElement;
        const name = img.alt || 'Client';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        avatarContainer.innerHTML = `<span style="color: var(--gold-light); font-weight: bold; font-size: 1rem;">${initials}</span>`;
        avatarContainer.style.display = 'flex';
        avatarContainer.style.alignItems = 'center';
        avatarContainer.style.justifyContent = 'center';
        avatarContainer.style.background = 'var(--navy-light)';
    }
    
    function initImageHandlers() {
        const images = document.querySelectorAll('.testimonial-avatar img');
        images.forEach(img => {
            img.addEventListener('error', () => handleImageError(img));
        });
    }
    
    function updateSliderPosition() {
        const card = document.querySelector('.testimonial-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 20;
        const totalWidth = cardWidth + gap;
        
        const translateX = -currentIndex * totalWidth;
        track.style.transform = `translateX(${translateX}px)`;
        track.style.transition = 'transform 0.5s ease';
    }
    
    function moveToPrevTestimonial() {
        autoScrollEnabled = false;
        stopAutoScroll();
        
        currentIndex = (currentIndex - 1 + totalOriginalTestimonials) % totalOriginalTestimonials;
        updateSliderPosition();
        
        setTimeout(() => {
            autoScrollEnabled = true;
            startAutoScroll();
        }, 5000);
    }
    
    function moveToNextTestimonial() {
        autoScrollEnabled = false;
        stopAutoScroll();
        
        currentIndex = (currentIndex + 1) % totalOriginalTestimonials;
        updateSliderPosition();
        
        setTimeout(() => {
            autoScrollEnabled = true;
            startAutoScroll();
        }, 5000);
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function getCurrentTranslate() {
        const style = window.getComputedStyle(track);
        const matrix = new DOMMatrixReadOnly(style.transform);
        return matrix.m41;
    }
    
    function touchStart(event) {
        autoScrollEnabled = false;
        stopAutoScroll();
        
        startPosition = getPositionX(event);
        isDragging = true;
        track.classList.add('dragging');
        track.style.transition = 'none';
        prevTranslate = getCurrentTranslate();
    }
    
    function touchEnd() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');
        
        const card = document.querySelector('.testimonial-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 20;
        const totalWidth = cardWidth + gap;
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (Math.abs(movedBy) > totalWidth / 4) {
            if (movedBy > 0) {
                currentIndex = (currentIndex - 1 + totalOriginalTestimonials) % totalOriginalTestimonials;
            } else {
                currentIndex = (currentIndex + 1) % totalOriginalTestimonials;
            }
        }
        
        updateSliderPosition();
        
        setTimeout(() => {
            autoScrollEnabled = true;
            startAutoScroll();
        }, 3000);
    }
    
    function touchMove(event) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', touchStart);
        sliderContainer.addEventListener('touchend', touchEnd);
        sliderContainer.addEventListener('touchmove', touchMove);
        
        sliderContainer.addEventListener('mousedown', touchStart);
        sliderContainer.addEventListener('mouseup', touchEnd);
        sliderContainer.addEventListener('mouseleave', touchEnd);
        sliderContainer.addEventListener('mousemove', touchMove);
        
        sliderContainer.addEventListener('mouseenter', () => {
            if (autoScrollEnabled && track) {
                track.style.animationPlayState = 'paused';
            }
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            if (autoScrollEnabled && !isDragging && track) {
                track.style.animationPlayState = 'running';
            }
        });
    }
    
    if (prevBtn) prevBtn.addEventListener('click', moveToPrevTestimonial);
    if (nextBtn) nextBtn.addEventListener('click', moveToNextTestimonial);
    
    startAutoScroll();
    initImageHandlers();
    
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && autoScrollEnabled) {
            startAutoScroll();
        }
    });
}

// ===== FAQ FUNCTIONALITY =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = question.nextElementSibling;
                const isActive = faqItem.classList.contains('active');
                
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                if (!isActive) {
                    faqItem.classList.add('active');
                    answer.classList.add('active');
                    question.querySelector('span').textContent = '−';
                }
            });
        });
    }
}

// ===== WEB DEVELOPMENT PAGE =====
function initWebDevPage() {
    console.log('Web Development page initialized');
    
    initFAQ();
    
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05) translateY(-5px)' 
                : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
    });
    
    const animateWebDevElements = () => {
        const elements = document.querySelectorAll('.package-card, .process-step, .faq-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const webDevElements = document.querySelectorAll('.package-card, .process-step, .faq-item');
    if (webDevElements.length > 0) {
        webDevElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', animateWebDevElements);
        animateWebDevElements();
    }
}

// ===== DIGITAL MARKETING PAGE =====
function initDigitalMarketingPage() {
    console.log('Digital Marketing page initialized');
    
    initFAQ();
    
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05) translateY(-5px)' 
                : 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('popular') 
                ? 'scale(1.05)' 
                : 'translateY(0)';
        });
    });
    
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const targetTab = button.getAttribute('data-tab');
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                button.classList.add('active');
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
    
    const animateDigitalMarketingElements = () => {
        const elements = document.querySelectorAll('.package-card, .process-step, .faq-item, .pricing-table-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    const digitalMarketingElements = document.querySelectorAll('.package-card, .process-step, .faq-item, .pricing-table-container');
    if (digitalMarketingElements.length > 0) {
        digitalMarketingElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        window.addEventListener('scroll', animateDigitalMarketingElements);
        animateDigitalMarketingElements();
    }
}

// ===== SERVICES PAGE =====
function initServicesPage() {
    console.log('Services page initialized');
    initSmoothScrolling();
}

// ===== CONTACT PAGE =====
function initContactPage() {
    console.log('Contact page initialized');
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// ===== ABOUT PAGE =====
function initAboutPage() {
    console.log('About page initialized');
    
    initAboutCounters();
    initTeamCardEffects();
    initAboutAnimations();
    initSmoothScrolling();
    initImageHandlers();
}

function initAboutCounters() {
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count')) || 100;
                const duration = 2000;
                const step = count / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = Math.floor(current);
                }, 16);
                
                observer.unobserve(target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function initTeamCardEffects() {
    const teamCards = document.querySelectorAll('.about-founders .team-card, .about-mentors .team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--shadow-md)';
        });
    });
}

function initAboutAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.from('.about-mission .mission-card', {
            scrollTrigger: {
                trigger: '.about-mission',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.about-founders .team-card', {
            scrollTrigger: {
                trigger: '.about-founders',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.about-mentors .team-card', {
            scrollTrigger: {
                trigger: '.about-mentors',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            stagger: 0.3,
            ease: 'power3.out'
        });
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

function initImageHandlers() {
    const images = document.querySelectorAll('.team-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            
            const name = this.alt || 'Team Member';
            const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            
            const container = this.parentElement;
            container.innerHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, var(--navy), var(--navy-dark));
                    color: var(--gold-light);
                    font-weight: bold;
                    font-size: 2rem;
                    font-family: var(--font-heading);
                ">
                    ${initials}
                </div>
            `;
        });
    });
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EXPORT GLOBAL ACCESS =====
window.ThriveAxis = window.ThriveAxis || {};

window.ThriveAxis.digitalMarketing = {
    init: initDigitalMarketingPage,
    initFAQ: initFAQ,
    initSmoothScrolling: initSmoothScrolling
};

window.ThriveAxis.webDev = {
    init: initWebDevPage,
    initFAQ: initFAQ
};

window.ThriveAxis.utils = {
    debounce: debounce,
    throttle: throttle,
    showNotification: showNotification
};

window.ThriveAxis.pages = {
    initDigitalMarketing: initDigitalMarketingPage,
    initWebDev: initWebDevPage,
    initServices: initServicesPage,
    initContact: initContactPage,
    initAbout: initAboutPage
};

window.ThriveAxis.about = {
    initCounters: initAboutCounters,
    initAnimations: initAboutAnimations,
    initTeamEffects: initTeamCardEffects
};

console.log('ThriveAxis global object initialized:', window.ThriveAxis);
