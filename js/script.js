// Main JavaScript file for ThriveAxis website
// Enhanced for mobile responsiveness

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing ThriveAxis');
    
    // Initialize all components
    initNavigation();
    initAnimations();
    initScrollEffects();
    initFormHandlers();
    initFilterSystem();
    initCounters(); // This won't run on contact page
    initOverlapPrevention();
    initHoverEffects();
    initHeroSlideshow();
    initContactAnimations();
    initTouchOptimizations();
    initMobileGestures();
    initViewportHandling();
    
    // Initialize page-specific components
    if (document.querySelector('.digital-marketing-page')) {
        initDigitalMarketingPage();
    }
    
    if (document.querySelector('.services-page')) {
        initServicesPage();
    }
    
    if (document.querySelector('.contact-page, .page-contact, .contact-hero')) {
        initContactPage(); // This will call initContactCounters()
    }
    
    if (document.querySelector('.webdev-hero')) {
        initWebDevPage();
    }
    
    if (document.querySelector('.about-hero')) {
        initAboutPage();
    }
    
    console.log('ThriveAxis website initialized successfully');
});

// ===== MOBILE OPTIMIZATIONS =====
function initTouchOptimizations() {
    // Increase touch target sizes for mobile
    const touchElements = document.querySelectorAll('button, .nav-link, .filter-btn, .hero-dot, .faq-question, .tab-button, .testimonial-card');
    
    touchElements.forEach(element => {
        // Add touch-specific class for styling
        element.classList.add('touch-optimized');
        
        // Prevent double-tap zoom on iOS
        element.addEventListener('touchstart', function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Add active state for touch feedback
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Prevent text selection on tap
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

function initMobileGestures() {
    // Handle swipe gestures for mobile navigation
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const verticalThreshold = 100;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        
        // Only handle horizontal swipes if vertical movement is minimal
        if (Math.abs(deltaY) < verticalThreshold) {
            if (Math.abs(deltaX) > swipeThreshold) {
                if (deltaX > 0) {
                    // Swipe right - close mobile menu if open
                    const navMenu = document.querySelector('.nav-menu.active');
                    if (navMenu && window.innerWidth <= 768) {
                        document.querySelector('.hamburger').classList.remove('active');
                        navMenu.classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                } else {
                    // Swipe left - could be used for other interactions
                }
            }
        }
    }
}

function initViewportHandling() {
    // Prevent zoom on form inputs in iOS
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('touchstart', function() {
            // Prevent zoom but allow focus
        }, { passive: true });
        
        // iOS zoom prevention
        input.addEventListener('focus', function() {
            this.style.fontSize = '16px';
        });
        
        input.addEventListener('blur', function() {
            setTimeout(() => {
                this.style.fontSize = '';
            }, 100);
        });
    });
    
    // Handle mobile viewport height
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    setVH();
}

// ===== NAVIGATION =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger) {
        // Touch event for mobile
        hamburger.addEventListener('touchstart', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Click event for desktop
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking on a link - enhanced for touch
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Add touch feedback
        link.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        link.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('touchstart', function(e) {
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Navbar scroll effect with mobile optimization
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(6, 20, 46, 0.98)';
                navbar.style.padding = window.innerWidth <= 768 ? '0.5rem 0' : '0.75rem 0';
                
                // Hide/show navbar on scroll for mobile
                if (window.innerWidth <= 768) {
                    if (scrollTop > lastScrollTop && scrollTop > 200) {
                        // Scrolling down - hide navbar
                        navbar.style.transform = 'translateY(-100%)';
                        navbar.style.transition = 'transform 0.3s ease';
                    } else {
                        // Scrolling up - show navbar
                        navbar.style.transform = 'translateY(0)';
                        navbar.style.transition = 'transform 0.3s ease';
                    }
                    lastScrollTop = scrollTop;
                }
            } else {
                navbar.style.background = 'rgba(6, 20, 46, 0.95)';
                navbar.style.padding = window.innerWidth <= 768 ? '1rem 0' : '1rem 0';
                navbar.style.transform = 'translateY(0)';
            }
        }
    });
    
    // Handle resize for mobile menu
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Reduce animations on mobile for performance
    const isMobile = window.innerWidth <= 768;
    
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Mobile-optimized GSAP settings
        if (isMobile) {
            gsap.config({
                force3D: false,
                autoSleep: 60,
                nullTargetWarn: false
            });
        }
        
        // Hero section animations - simplified on mobile
        const heroTimeline = gsap.timeline();
        heroTimeline
            .from('.hero-title', { 
                duration: isMobile ? 0.8 : 1, 
                y: isMobile ? 30 : 50, 
                opacity: 0, 
                ease: 'power3.out' 
            })
            .from('.hero-subtitle', { 
                duration: isMobile ? 0.6 : 0.8, 
                y: isMobile ? 20 : 30, 
                opacity: 0, 
                ease: 'power3.out' 
            }, '-=0.5')
            .from('.hero-buttons', { 
                duration: isMobile ? 0.6 : 0.8, 
                y: isMobile ? 20 : 30, 
                opacity: 0, 
                ease: 'power3.out' 
            }, '-=0.3');
        
        // Service cards animation - reduced stagger on mobile
        gsap.from('.service-card', {
            scrollTrigger: {
                trigger: '.services-preview',
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
                markers: false
            },
            duration: isMobile ? 0.6 : 0.8,
            y: isMobile ? 30 : 50,
            opacity: 0,
            stagger: isMobile ? 0.1 : 0.2,
            ease: 'power3.out'
        });
        
        // Process steps animation - vertical stacking on mobile
        gsap.from('.process-step', {
            scrollTrigger: {
                trigger: '.process-section',
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: isMobile ? 0.6 : 0.8,
            y: isMobile ? 20 : 30,
            opacity: 0,
            stagger: isMobile ? 0.2 : 0.3,
            ease: 'power3.out'
        });
    }
    
    // Intersection Observer with mobile optimizations
    const observerOptions = {
        threshold: isMobile ? 0.05 : 0.1,
        rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Disable parallax on mobile for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero:not(.contact-hero)');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Smooth scrolling for anchor links - optimized for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const hamburger = document.querySelector('.hamburger.active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                        document.querySelector('.nav-menu').classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
                
                const offset = window.innerWidth <= 768 ? 80 : 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORM HANDLERS =====
function initFormHandlers() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        // Prevent zoom on focus in iOS
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('touchstart', function() {
                this.style.fontSize = '16px';
            });
            
            input.addEventListener('blur', function() {
                setTimeout(() => {
                    this.style.fontSize = '';
                }, 100);
            });
        });
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="mobile-spinner"></span> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    showMobileNotification('Message sent successfully!', 'success');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    });
}

// ===== COUNTERS - MAIN FUNCTION =====
function initCounters() {
    // Skip contact page stats (they have their own counter)
    if (document.querySelector('.contact-page, .page-contact, .contact-hero')) {
        console.log('Skipping main counters on contact page');
        return;
    }
    
    const statNumbers = document.querySelectorAll('.stat-number:not(.contact-stats .stat-number)');
    
    if (statNumbers.length > 0) {
        // Disable counter animation on mobile if performance is an issue
        if (window.innerWidth <= 768) {
            console.log('Counters disabled on mobile for performance');
            // Still show the final numbers
            statNumbers.forEach(stat => {
                const count = parseInt(stat.getAttribute('data-count')) || parseInt(stat.textContent) || 0;
                if (count > 0) {
                    stat.textContent = count.toLocaleString();
                }
            });
            return;
        }
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const dataCount = target.getAttribute('data-count');
                    const currentText = target.textContent;
                    
                    // Try to get count from data-count attribute, then from text content
                    let count = 0;
                    if (dataCount) {
                        count = parseInt(dataCount);
                    } else if (currentText && !isNaN(parseInt(currentText))) {
                        count = parseInt(currentText);
                        // Store it for animation
                        target.setAttribute('data-count', count);
                    }
                    
                    // Only animate if we have a valid count
                    if (count > 0) {
                        const duration = 2000;
                        const step = count / (duration / 16);
                        let current = 0;
                        
                        // Store original content if exists
                        if (!target.hasAttribute('data-original')) {
                            target.setAttribute('data-original', target.textContent);
                        }
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= count) {
                                current = count;
                                clearInterval(timer);
                            }
                            target.textContent = Math.floor(current).toLocaleString();
                        }, 16);
                        
                        observer.unobserve(target);
                    } else {
                        // If no valid count, leave as is
                        observer.unobserve(target);
                    }
                }
            });
        }, { 
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
}

// ===== CONTACT PAGE COUNTERS =====
function initContactCounters() {
    // Only run on contact page
    const contactPageIndicator = document.querySelector('.contact-page, .page-contact, .contact-hero');
    if (!contactPageIndicator) {
        console.log('Not a contact page, skipping contact counters');
        return;
    }
    
    console.log('Initializing contact page counters');
    
    // Find all stat numbers in contact page
    const contactStatNumbers = document.querySelectorAll('.contact-stats .stat-number, .contact-hero .stat-number, .stats-container .stat-number');
    
    if (contactStatNumbers.length === 0) {
        console.log('No contact stat numbers found');
        return;
    }
    
    // Contact page specific values
    const contactValues = [24, 98, 150, 50];
    const suffixes = ['', '%', '+', '+'];
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const index = Array.from(contactStatNumbers).indexOf(target);
                
                if (index !== -1 && contactValues[index] !== undefined) {
                    const value = contactValues[index];
                    const suffix = suffixes[index] || '';
                    
                    // Disable animation on mobile for performance
                    if (window.innerWidth <= 768) {
                        target.textContent = value + suffix;
                        observer.unobserve(target);
                        return;
                    }
                    
                    const duration = 2000;
                    const step = value / (duration / 16);
                    let current = 0;
                    
                    // Store original value
                    if (!target.hasAttribute('data-original')) {
                        target.setAttribute('data-original', value);
                    }
                    
                    // Set initial to 0
                    target.textContent = '0' + suffix;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= value) {
                            current = value;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 16);
                    
                    observer.unobserve(target);
                }
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    });
    
    contactStatNumbers.forEach((stat, index) => {
        // Set data-count attribute for reference
        if (contactValues[index] !== undefined) {
            stat.setAttribute('data-count', contactValues[index]);
        }
        observer.observe(stat);
    });
}

// ===== FILTER SYSTEM =====
function initFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterBtns.length === 0 || blogCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            handleFilterClick.call(this);
        });
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            handleFilterClick.call(this);
        });
    });
    
    function handleFilterClick() {
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
    }
    
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.style.minHeight = '44px';
            this.style.minWidth = '44px';
            
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            this.classList.add('loading');
            
            setTimeout(() => {
                showMobileNotification('More articles loaded!', 'info');
                this.textContent = originalText;
                this.disabled = false;
                this.classList.remove('loading');
            }, 1500);
        });
    }
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');
    const teamCards = document.querySelectorAll('.team-card');
    
    function addCardEffects(cards) {
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
            
            card.addEventListener('touchstart', function() {
                if (window.innerWidth <= 768) {
                    this.style.transform = 'translateY(-5px) scale(1.01)';
                    this.style.transition = 'transform 0.2s ease';
                }
            });
            
            card.addEventListener('touchend', function() {
                if (window.innerWidth <= 768) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
    
    addCardEffects(serviceCards);
    addCardEffects(teamCards);
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
    
    window.addEventListener('resize', function() {
        adjustHeroContent();
    });
    
    adjustHeroContent();
}

function adjustHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero:not(.contact-hero)');
    
    if (heroContent && hero) {
        const heroHeight = hero.offsetHeight;
        const contentHeight = heroContent.offsetHeight;
        
        if (contentHeight > heroHeight * 0.7) {
            hero.style.paddingTop = window.innerWidth <= 768 ? '60px' : '80px';
            hero.style.paddingBottom = window.innerWidth <= 768 ? '60px' : '80px';
        } else {
            hero.style.paddingTop = '';
            hero.style.paddingBottom = '';
        }
    }
}

// ===== HERO SLIDESHOW =====

function initHeroSlideshow() {
    // Only run on main hero sections, not contact page
    const hero = document.querySelector('.hero:not(.contact-hero)');
    if (!hero) {
        console.log('No hero section found or on contact page');
        return;
    }
    
    // Mobile-optimized image sizes
    const isMobile = window.innerWidth <= 768;
    const imageSize = isMobile ? '800' : '1920';
    
    const images = [
        `https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`,
        `https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`,
        `https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`,
        `https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`,
        `https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`,
        `https://images.unsplash.com/photo-1568992688065-536aad8a12f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=${imageSize}&q=80`
    ];
    
    let currentImageIndex = 0;
    let slideshowInterval;
    let dotsContainer;
    let dots = [];
    
    // Variables to detect if it's a click/tap or scroll
    let touchStartY = 0;
    let touchEndY = 0;
    let isScrolling = false;
    let scrollTimer;

    function setInitialBackground() {
        hero.style.background = `linear-gradient(rgba(6, 20, 46, 0.7), rgba(6, 20, 46, 0.75)), url('${images[0]}') no-repeat center center/cover`;
    }

    function createDots() {
        dotsContainer = document.createElement('div');
        dotsContainer.className = 'hero-slideshow-dots mobile-optimized-dots';
        
        images.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'hero-dot mobile-dot';
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('touchstart', (e) => {
                e.stopPropagation();
                goToSlide(index);
            });
            
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
        // Only change slide if it's a deliberate click/tap (not scroll)
        if (!isScrolling && !e.target.classList.contains('hero-dot')) {
            changeBackground();
            startAutomaticSlideshow();
        }
    }

    function startAutomaticSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        // Longer interval on mobile
        const interval = isMobile ? 12000 : 10000;
        slideshowInterval = setInterval(changeBackground, interval);
    }

    // Detect scrolling vs tapping
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
        isScrolling = false;
        
        // Clear any existing timer
        if (scrollTimer) clearTimeout(scrollTimer);
        
        // Set a timer to detect if it's a scroll
        scrollTimer = setTimeout(() => {
            isScrolling = true;
        }, 100); // 100ms threshold for scroll detection
    }
    
    function handleTouchMove(e) {
        touchEndY = e.touches[0].clientY;
        const deltaY = Math.abs(touchEndY - touchStartY);
        
        // If vertical movement > 10px, it's probably a scroll
        if (deltaY > 10) {
            isScrolling = true;
            if (scrollTimer) clearTimeout(scrollTimer);
        }
    }
    
    function handleTouchEnd(e) {
        if (!isScrolling && !e.target.classList.contains('hero-dot')) {
            // It's a tap, change slide
            e.preventDefault();
            changeBackground();
            startAutomaticSlideshow();
        }
        
        // Reset after 500ms
        setTimeout(() => {
            isScrolling = false;
        }, 500);
    }

    function init() {
        setInitialBackground();
        createDots();
        startAutomaticSlideshow();
        
        // Desktop click event
        hero.addEventListener('click', handleHeroClick);
        
        // Mobile touch events with scroll detection
        hero.addEventListener('touchstart', handleTouchStart, { passive: true });
        hero.addEventListener('touchmove', handleTouchMove, { passive: true });
        hero.addEventListener('touchend', handleTouchEnd, { passive: false });
        
        // Also detect wheel/mouse scroll
        hero.addEventListener('wheel', function() {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        });
        
        hero.addEventListener('scroll', function() {
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 500);
        });
    }

    init();
    
    // Reinitialize on resize
    window.addEventListener('resize', function() {
        // Clear existing dots
        if (dotsContainer) {
            dotsContainer.remove();
        }
        
        // Reinitialize with new image sizes
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            initHeroSlideshow();
        }
    });
}

// ===== SCROLL EFFECTS - UPDATED =====
function initScrollEffects() {
    // Disable parallax on mobile for performance
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero:not(.contact-hero)');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });
    }
    
    // Smooth scrolling for anchor links - optimized for mobile
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    const hamburger = document.querySelector('.hamburger.active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                        document.querySelector('.nav-menu').classList.remove('active');
                        document.body.classList.remove('menu-open');
                    }
                }
                
                const offset = window.innerWidth <= 768 ? 80 : 100;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Ensure scrolling works on hero section
    const hero = document.querySelector('.hero:not(.contact-hero)');
    if (hero) {
        // Make hero section scrollable
        hero.style.touchAction = 'pan-y';
        hero.style.overscrollBehavior = 'contain';
        
        // Prevent hero section from interfering with page scroll
        hero.addEventListener('wheel', function(e) {
            // Allow normal wheel scrolling
        }, { passive: true });
        
        hero.addEventListener('touchmove', function(e) {
            // Allow normal touch scrolling
        }, { passive: true });
    }
}

// ===== MOBILE NOTIFICATION =====
function showMobileNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `mobile-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    if (!document.querySelector('#mobile-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'mobile-notification-styles';
        styles.textContent = `
            .mobile-notification {
                position: fixed;
                top: 20px;
                left: 10px;
                right: 10px;
                padding: 15px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                max-width: 500px;
                margin: 0 auto;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                transform: translateY(-100px);
                transition: transform 0.3s ease;
            }
            .notification-success { 
                background: linear-gradient(135deg, #10b981, #059669); 
            }
            .notification-error { 
                background: linear-gradient(135deg, #ef4444, #dc2626); 
            }
            .notification-info { 
                background: linear-gradient(135deg, #3b82f6, #2563eb); 
            }
            .mobile-notification.show { 
                transform: translateY(0); 
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 24px;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                -webkit-tap-highlight-color: transparent;
            }
            @media (max-width: 768px) {
                .mobile-notification {
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    const autoRemoveTime = window.innerWidth <= 768 ? 4000 : 5000;
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, autoRemoveTime);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    if (window.innerWidth <= 768) {
        notification.addEventListener('touchstart', function() {
            this.classList.remove('show');
            setTimeout(() => this.remove(), 300);
        });
    }
}

// ===== TESTIMONIALS SLIDER =====
// Your original testimonials code with mobile enhancements
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialsTrack');
    const sliderContainer = document.getElementById('sliderContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !sliderContainer) return;
    
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    let autoScrollEnabled = true;
    
    const originalTestimonials = Array.from(document.querySelectorAll('.testimonial-card')).slice(0, 10);
    const totalOriginalTestimonials = originalTestimonials.length;
    
    function startAutoScroll() {
        if (autoScrollEnabled) {
            // Slower scroll on mobile
            const duration = window.innerWidth <= 768 ? '50s' : '40s';
            track.style.animation = `scroll-testimonials ${duration} linear infinite`;
            track.style.animationPlayState = 'running';
        }
    }
    
    function stopAutoScroll() {
        track.style.animation = 'none';
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
    
    // Mobile touch events
    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchend', touchEnd);
    sliderContainer.addEventListener('touchmove', touchMove);
    
    // Desktop mouse events
    sliderContainer.addEventListener('mousedown', mouseDown);
    sliderContainer.addEventListener('mouseup', mouseUp);
    sliderContainer.addEventListener('mouseleave', mouseLeave);
    sliderContainer.addEventListener('mousemove', mouseMove);
    
    // Mobile-optimized button handling
    if (prevBtn && nextBtn) {
        // Make buttons larger on mobile
        if (window.innerWidth <= 768) {
            prevBtn.style.minHeight = '50px';
            prevBtn.style.minWidth = '50px';
            nextBtn.style.minHeight = '50px';
            nextBtn.style.minWidth = '50px';
        }
        
        prevBtn.addEventListener('click', moveToPrevTestimonial);
        nextBtn.addEventListener('click', moveToNextTestimonial);
        
        // Touch events for mobile buttons
        prevBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveToPrevTestimonial();
        });
        
        nextBtn.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveToNextTestimonial();
        });
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
    
    function updateSliderPosition() {
        const card = document.querySelector('.testimonial-card');
        const cardWidth = card.offsetWidth;
        const gap = parseInt(getComputedStyle(track).gap) || 20;
        const totalWidth = cardWidth + gap;
        
        const translateX = -currentIndex * totalWidth;
        track.style.transform = `translateX(${translateX}px)`;
        track.style.transition = 'transform 0.5s ease';
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
    
    function mouseDown(event) {
        autoScrollEnabled = false;
        stopAutoScroll();
        
        startPosition = getPositionX(event);
        isDragging = true;
        track.classList.add('dragging');
        track.style.transition = 'none';
        prevTranslate = getCurrentTranslate();
        event.preventDefault();
    }
    
    function mouseUp() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('dragging');
        
        const card = document.querySelector('.testimonial-card');
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
    
    function mouseLeave() {
        if (isDragging) {
            isDragging = false;
            track.classList.remove('dragging');
            updateSliderPosition();
            
            setTimeout(() => {
                autoScrollEnabled = true;
                startAutoScroll();
            }, 3000);
        }
    }
    
    function mouseMove(event) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosition;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }
    
    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
    
    function getCurrentTranslate() {
        const style = window.getComputedStyle(track);
        const matrix = new DOMMatrixReadOnly(style.transform);
        return matrix.m41;
    }
    
    sliderContainer.addEventListener('mouseenter', () => {
        if (autoScrollEnabled) {
            track.style.animationPlayState = 'paused';
        }
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        if (autoScrollEnabled && !isDragging) {
            track.style.animationPlayState = 'running';
        }
    });
    
    // Touch events for pause on mobile
    sliderContainer.addEventListener('touchstart', () => {
        if (autoScrollEnabled) {
            track.style.animationPlayState = 'paused';
        }
    });
    
    sliderContainer.addEventListener('touchend', () => {
        if (autoScrollEnabled && !isDragging) {
            track.style.animationPlayState = 'running';
        }
    });
    
    startAutoScroll();
    initImageHandlers();
    
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && autoScrollEnabled) {
            startAutoScroll();
        }
    });
});

// ===== WEB DEVELOPMENT PAGE =====
function initWebDevPage() {
    // FAQ Toggle Functionality with touch support
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                toggleFAQ(question);
            });
            
            // Touch support for mobile
            question.addEventListener('touchstart', (e) => {
                e.preventDefault();
                toggleFAQ(question);
            });
        });
    }

    // Package card hover effects with touch support
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.05) translateY(-5px)' 
                    : 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
        
        // Touch feedback for mobile
        card.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(-3px)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
        
        card.addEventListener('touchend', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Animation on scroll for web development page
    const animateWebDevElements = () => {
        const elements = document.querySelectorAll('.package-card, .process-step, .faq-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = window.innerWidth <= 768 ? 100 : 150;
            
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

    // Contact form handling for web development page
    const webDevContactForm = document.querySelector('.contact-form');
    if (webDevContactForm) {
        webDevContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const package = formData.get('package');
            const message = formData.get('message');
            
            if (!name || !email || !package) {
                showMobileNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="mobile-spinner"></span> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMobileNotification('Thank you for your inquiry! We will contact you shortly.', 'success');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    console.log('Web Development page initialized successfully');
}

function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const isActive = answer.classList.contains('active');
    
    document.querySelectorAll('.faq-answer').forEach(ans => {
        ans.classList.remove('active');
    });
    
    document.querySelectorAll('.faq-question span').forEach(span => {
        span.textContent = '+';
    });
    
    if (!isActive) {
        answer.classList.add('active');
        question.querySelector('span').textContent = '−';
    }
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
            
            // Touch support for mobile
            question.addEventListener('touchstart', (e) => {
                e.preventDefault();
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

// ===== DIGITAL MARKETING PAGE =====
function initDigitalMarketingPage() {
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = answer.classList.contains('active');
                
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                if (!isActive) {
                    answer.classList.add('active');
                    question.querySelector('span').textContent = '−';
                }
            });
            
            // Touch support
            question.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const answer = question.nextElementSibling;
                const isActive = answer.classList.contains('active');
                
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                if (!isActive) {
                    answer.classList.add('active');
                    question.querySelector('span').textContent = '−';
                }
            });
        });
    }

    // Package card hover effects
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.05) translateY(-5px)' 
                    : 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.05)' 
                    : 'translateY(0)';
            }
        });
        
        // Touch feedback
        card.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.02) translateY(-3px)' 
                    : 'translateY(-3px)';
            }
        });
        
        card.addEventListener('touchend', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = this.classList.contains('popular') 
                    ? 'scale(1.02)' 
                    : 'translateY(0)';
            }
        });
    });

    // Pricing Tabs Functionality
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
            
            // Touch support
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
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

    // Animation on scroll for digital marketing page
    const animateDigitalMarketingElements = () => {
        const elements = document.querySelectorAll('.package-card, .process-step, .faq-item, .pricing-table-container');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = window.innerWidth <= 768 ? 100 : 150;
            
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

    console.log('Digital Marketing page initialized successfully');
}

// ===== SERVICES PAGE =====
function initServicesPage() {
    console.log('Services page initialized successfully');
}

// ===== CONTACT PAGE =====
function initContactPage() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showMobileNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Initialize contact page counters
    initContactCounters();
    
    console.log('Contact page initialized successfully');
}

// ===== ABOUT PAGE =====
function initAboutPage() {
    console.log('About page loaded - initializing components');
    
    initAboutCounters();
    initTeamCardEffects();
    initAboutAnimations();
    initAboutSmoothScrolling();
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
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-8px)';
                this.style.boxShadow = 'var(--shadow-lg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-md)';
            }
        });
        
        // Touch feedback
        card.addEventListener('touchstart', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(-4px)';
                this.style.transition = 'transform 0.2s ease';
            }
        });
        
        card.addEventListener('touchend', function() {
            if (window.innerWidth <= 768) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
}

function initAboutAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        const isMobile = window.innerWidth <= 768;
        
        gsap.from('.about-mission .mission-card', {
            scrollTrigger: {
                trigger: '.about-mission',
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: isMobile ? 0.6 : 0.8,
            y: isMobile ? 20 : 30,
            opacity: 0,
            stagger: isMobile ? 0.1 : 0.2,
            ease: 'power3.out'
        });
        
        gsap.from('.about-founders .team-card', {
            scrollTrigger: {
                trigger: '.about-founders',
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: isMobile ? 0.6 : 0.8,
            y: isMobile ? 30 : 50,
            opacity: 0,
            stagger: isMobile ? 0.2 : 0.3,
            ease: 'power3.out'
        });
        
        gsap.from('.about-mentors .team-card', {
            scrollTrigger: {
                trigger: '.about-mentors',
                start: isMobile ? 'top 90%' : 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            duration: isMobile ? 0.6 : 0.8,
            y: isMobile ? 30 : 50,
            opacity: 0,
            stagger: isMobile ? 0.2 : 0.3,
            ease: 'power3.out'
        });
    }
    
    const observerOptions = {
        threshold: window.innerWidth <= 768 ? 0.05 : 0.1,
        rootMargin: window.innerWidth <= 768 ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

function initAboutSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.classList.contains('btn') || anchor.getAttribute('href') === '#') {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#our-story') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offset = window.innerWidth <= 768 ? 80 : 100;
                    const offsetTop = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== CONTACT ANIMATIONS =====
function initContactAnimations() {
    // Placeholder for contact animations
    console.log('Contact animations initialized');
}

// ===== INJECT MOBILE STYLES =====
function injectMobileStyles() {
    const styles = `
        /* Mobile touch optimizations */
        .touch-optimized {
            min-height: 44px;
            min-width: 44px;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
        }
        
        .touch-active {
            opacity: 0.8;
            transform: scale(0.98);
            transition: transform 0.1s ease, opacity 0.1s ease;
        }
        
        /* Prevent text selection on tap */
        * {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        
        /* Allow text selection on specific elements */
        input, textarea, .blog-content, .testimonial-text {
            -webkit-touch-callout: default;
            -webkit-user-select: text;
            -khtml-user-select: text;
            -moz-user-select: text;
            -ms-user-select: text;
            user-select: text;
        }
        
        /* Mobile menu open state */
        body.menu-open {
            overflow: hidden;
            position: fixed;
            width: 100%;
            height: 100%;
        }
        
        /* Mobile spinner */
        .mobile-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: mobile-spin 1s ease-in-out infinite;
            margin-right: 8px;
        }
        
        @keyframes mobile-spin {
            to { transform: rotate(360deg); }
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            .hero-slideshow-dots {
                bottom: 20px;
            }
            
            .hero-dot {
                width: 10px;
                height: 10px;
                margin: 0 6px;
            }
            
            .testimonial-card {
                min-width: 85vw;
                margin: 0 10px;
            }
            
            .service-card, .team-card {
                transition: transform 0.3s ease;
            }
            
            /* Improve form inputs on mobile */
            input, textarea, select {
                font-size: 16px !important;
            }
            
            .package-card {
                margin: 10px 0;
            }
            
            .faq-question {
                padding: 15px;
            }
            
            .tab-button {
                padding: 12px 20px;
                font-size: 14px;
            }
        }
        
        @media (max-width: 480px) {
            .hero-title {
                font-size: 2rem !important;
            }
            
            .hero-subtitle {
                font-size: 1rem !important;
            }
            
            .section-title {
                font-size: 1.8rem !important;
            }
            
            .package-card {
                padding: 20px;
            }
            
            .process-step {
                padding: 15px;
            }
        }
        
        /* Loading state for mobile */
        .loading {
            position: relative;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin: -10px 0 0 -10px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: mobile-spin 1s ease-in-out infinite;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize mobile styles
document.addEventListener('DOMContentLoaded', injectMobileStyles);

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

// ===== EXPORT FUNCTIONALITY =====
window.ThriveAxis = window.ThriveAxis || {};

window.ThriveAxis.digitalMarketing = {
    initTabs: function() {
        // Pricing tabs initialization
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
    },
    initFAQ: initFAQ,
    initSmoothScrolling: initAboutSmoothScrolling
};

window.ThriveAxis.utils = {
    debounce: debounce,
    throttle: throttle,
    showNotification: showMobileNotification
};

window.ThriveAxis.pages = {
    initDigitalMarketing: initDigitalMarketingPage,
    initServices: initServicesPage,
    initContact: initContactPage,
    initAbout: initAboutPage,
    initWebDev: initWebDevPage
};

// ===== CONTACT PARTICLES =====
function initContactParticles() {
    const canvas = document.getElementById('contact-particles');
    if (!canvas) return;
    
    // Simple particle effect - disabled on mobile for performance
    if (window.innerWidth <= 768) {
        canvas.style.display = 'none';
        return;
    }
    
    const particles = [];
    const particleCount = window.innerWidth <= 768 ? 15 : 30;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.offsetWidth,
            y: Math.random() * canvas.offsetHeight,
            size: Math.random() * 2 + 1,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.5 + 0.3
        });
    }
    
    function animateParticles() {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        
        particles.forEach(particle => {
            particle.y += particle.speed;
            if (particle.y > canvas.offsetHeight) {
                particle.y = 0;
                particle.x = Math.random() * canvas.offsetWidth;
            }
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    animateParticles();
    
    // Reinitialize on resize
    window.addEventListener('resize', function() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });
}

// Initialize contact particles
if (document.getElementById('contact-particles')) {
    document.addEventListener('DOMContentLoaded', initContactParticles);
}

console.log('ThriveAxis mobile-optimized script loaded successfully');
