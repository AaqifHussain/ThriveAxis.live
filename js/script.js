// Main JavaScript file for ThriveAxis website

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing ThriveAxis');
    
    // Initialize all components
    initNavigation();
    initAnimations();
    initScrollEffects();
    initFormHandlers(); // Added back for contact form
    initFilterSystem();
    initCounters();
    initOverlapPrevention();
    initHoverEffects();
    initHeroSlideshow();
    initContactAnimations(); // Added for contact page
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (!navbar) return;

        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(6, 20, 46, 0.98)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(6, 20, 46, 0.95)';
            navbar.style.padding = '1rem 0';
        }
    });
});


// Animation initialization
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
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Scroll effects
function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            // Subtle parallax effect
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add this to your existing script.js or create a new contact-form.js



// Contact page particles
function initContactParticles() {
    const canvas = document.getElementById('contact-particles');
    if (!canvas) return;
    
    // Simple particle effect
    const particles = [];
    const particleCount = 30;
    
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
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    animateParticles();
}

// Filter system for blog
function initFilterSystem() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (filterBtns.length === 0 || blogCards.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter blog cards
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
    
    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // In a real implementation, this would fetch more content from an API
                alert('More articles loaded!');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 1500);
        });
    }
}

// Counter animations for stats
function initCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const count = parseInt(target.getAttribute('data-count')) || 1000;
                    const duration = 2000; // 2 seconds
                    const step = count / (duration / 16); // 60fps
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

// Hover effects
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
    
    // Team card hover effects
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

// Overlap prevention system
function initOverlapPrevention() {
    // Ensure content sections have proper z-index
    const contentSections = document.querySelectorAll('section:not(.hero)');
    contentSections.forEach((section, index) => {
        section.style.zIndex = index + 2;
    });
    
    // Ensure footer has proper z-index
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.zIndex = 100;
    }
    
    // Adjust hero content positioning on resize
    window.addEventListener('resize', function() {
        adjustHeroContent();
    });
    
    // Initial adjustment
    adjustHeroContent();
}

// Adjust hero content to prevent overlap
function adjustHeroContent() {
    const heroContent = document.querySelector('.hero-content');
    const hero = document.querySelector('.hero');
    
    if (heroContent && hero) {
        const heroHeight = hero.offsetHeight;
        const contentHeight = heroContent.offsetHeight;
        
        // Add padding if content is too tall
        if (contentHeight > heroHeight * 0.7) {
            hero.style.paddingTop = '80px';
            hero.style.paddingBottom = '80px';
        } else {
            hero.style.paddingTop = '';
            hero.style.paddingBottom = '';
        }
    }
}

// Hero section slideshow

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

    // Set initial background immediately
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
                e.stopPropagation(); // Prevent triggering the hero click event
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
        console.log('Changed to slide:', currentImageIndex + 1);
    }

    function goToSlide(index) {
        currentImageIndex = index;
        hero.style.background = `linear-gradient(rgba(6, 20, 46, 0.7), rgba(6, 20, 46, 0.75)), url('${images[currentImageIndex]}') no-repeat center center/cover`;
        updateDots();
        startAutomaticSlideshow();
        console.log('Manually changed to slide:', currentImageIndex + 1);
    }

    // Click anywhere on hero to go to next slide
    function handleHeroClick(e) {
        // Don't trigger if user clicked on dots (they have their own handler)
        if (!e.target.classList.contains('hero-dot')) {
            changeBackground();
            startAutomaticSlideshow();
            console.log('Hero clicked - changed to next slide');
        }
    }

    function startAutomaticSlideshow() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
        }
        slideshowInterval = setInterval(changeBackground, 10000);
    }

    function init() {
        // Set initial background first
        setInitialBackground();
        // Then create dots and start slideshow
        createDots();
        startAutomaticSlideshow();
        
        // Add click event listener to entire hero section
        hero.addEventListener('click', handleHeroClick);
        
        console.log('Hero slideshow initialized - click anywhere to change slides');
    }

    init();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initHeroSlideshow);


// Testimonials Section

// Testimonials Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialsTrack');
    const sliderContainer = document.getElementById('sliderContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;
    let currentIndex = 0;
    let autoScrollEnabled = true;
    
    // Get the original testimonials (excluding duplicates)
    const originalTestimonials = Array.from(document.querySelectorAll('.testimonial-card')).slice(0, 10);
    const totalOriginalTestimonials = originalTestimonials.length;
    
    // Set initial animation
    function startAutoScroll() {
        if (autoScrollEnabled) {
            track.style.animation = 'scroll-testimonials 40s linear infinite';
            track.style.animationPlayState = 'running';
        }
    }
    
    function stopAutoScroll() {
        track.style.animation = 'none';
    }
    
    // Handle image loading errors
    function handleImageError(img) {
        const avatarContainer = img.parentElement;
        const name = img.alt || 'Client';
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        
        // Create fallback with initials
        avatarContainer.innerHTML = `<span style="color: var(--gold-light); font-weight: bold; font-size: 1rem;">${initials}</span>`;
        avatarContainer.style.display = 'flex';
        avatarContainer.style.alignItems = 'center';
        avatarContainer.style.justifyContent = 'center';
        avatarContainer.style.background = 'var(--navy-light)';
    }
    
    // Initialize image error handlers
    function initImageHandlers() {
        const images = document.querySelectorAll('.testimonial-avatar img');
        images.forEach(img => {
            img.addEventListener('error', () => handleImageError(img));
        });
    }
    
    // Touch events for mobile
    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchend', touchEnd);
    sliderContainer.addEventListener('touchmove', touchMove);
    
    // Mouse events for desktop
    sliderContainer.addEventListener('mousedown', mouseDown);
    sliderContainer.addEventListener('mouseup', mouseUp);
    sliderContainer.addEventListener('mouseleave', mouseLeave);
    sliderContainer.addEventListener('mousemove', mouseMove);
    
    // Button controls
    prevBtn.addEventListener('click', moveToPrevTestimonial);
    nextBtn.addEventListener('click', moveToNextTestimonial);
    
    function moveToPrevTestimonial() {
        autoScrollEnabled = false;
        stopAutoScroll();
        
        currentIndex = (currentIndex - 1 + totalOriginalTestimonials) % totalOriginalTestimonials;
        updateSliderPosition();
        
        // Restart auto scroll after 5 seconds of inactivity
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
        
        // Restart auto scroll after 5 seconds of inactivity
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
        
        // Determine direction and update index
        if (Math.abs(movedBy) > totalWidth / 4) {
            if (movedBy > 0) {
                // Swiped right - go to previous
                currentIndex = (currentIndex - 1 + totalOriginalTestimonials) % totalOriginalTestimonials;
            } else {
                // Swiped left - go to next
                currentIndex = (currentIndex + 1) % totalOriginalTestimonials;
            }
        }
        
        updateSliderPosition();
        
        // Restart auto scroll after 3 seconds
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
        
        // Determine direction and update index
        if (Math.abs(movedBy) > totalWidth / 4) {
            if (movedBy > 0) {
                // Dragged right - go to previous
                currentIndex = (currentIndex - 1 + totalOriginalTestimonials) % totalOriginalTestimonials;
            } else {
                // Dragged left - go to next
                currentIndex = (currentIndex + 1) % totalOriginalTestimonials;
            }
        }
        
        updateSliderPosition();
        
        // Restart auto scroll after 3 seconds
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
            
            // Restart auto scroll after 3 seconds
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
    
    // Pause auto-scroll on hover
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
    
    // Initialize
    startAutoScroll();
    initImageHandlers();
    
    // Reset to first testimonial when page becomes visible again
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden && autoScrollEnabled) {
            startAutoScroll();
        }
    });
});


// ===== WEB DEVELOPMENT PAGE FUNCTIONALITY =====

function initWebDevPage() {
    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = answer.classList.contains('active');
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                // Reset all icons
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                // Toggle current answer if it wasn't active
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

    // Animation on scroll for web development page
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

    // Set initial state for animation on web development page
    const webDevElements = document.querySelectorAll('.package-card, .process-step, .faq-item');
    if (webDevElements.length > 0) {
        webDevElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });

        // Listen for scroll events
        window.addEventListener('scroll', animateWebDevElements);
        
        // Initial check on page load
        animateWebDevElements();
    }

    // Contact form handling for web development page
    const webDevContactForm = document.querySelector('.contact-form');
    if (webDevContactForm) {
        webDevContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const package = formData.get('package');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !package) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="submit-spinner"></span> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your inquiry! We will contact you shortly.');
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    console.log('Web Development page initialized successfully');
}

// Initialize web development page if we're on that page
if (document.querySelector('.webdev-hero')) {
    document.addEventListener('DOMContentLoaded', initWebDevPage);
}

// Export function for use in other modules
window.ThriveAxis = window.ThriveAxis || {};
window.ThriveAxis.initWebDevPage = initWebDevPage;


// ===== FAQ FUNCTIONALITY =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const faqItem = question.parentElement;
                const answer = question.nextElementSibling;
                const isActive = faqItem.classList.contains('active');
                
                // Close all FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Close all answers
                document.querySelectorAll('.faq-answer').forEach(ans => {
                    ans.classList.remove('active');
                });
                
                // Reset all icons
                document.querySelectorAll('.faq-question span').forEach(span => {
                    span.textContent = '+';
                });
                
                // Toggle current FAQ item if it wasn't active
                if (!isActive) {
                    faqItem.classList.add('active');
                    answer.classList.add('active');
                    question.querySelector('span').textContent = '−';
                }
            });
        });
    }
}

// Initialize FAQ when page loads
document.addEventListener('DOMContentLoaded', function() {
    initFAQ();
});

// Export for use in other modules
window.ThriveAxis = window.ThriveAxis || {};
window.ThriveAxis.initFAQ = initFAQ;


// ThriveAxis Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all common functionality
    initNavigation();
    initAnimations();
    initForms();
    
    // Page-specific initializations
    if (document.querySelector('.digital-marketing-page')) {
        initDigitalMarketingPage();
    }
    
    if (document.querySelector('.services-page')) {
        initServicesPage();
    }
    
    if (document.querySelector('.contact-page')) {
        initContactPage();
    }
    
    console.log('ThriveAxis website initialized successfully');
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Animation functionality
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Form functionality
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
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already added
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
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// Digital Marketing Page Specific Functionality

// Digital Marketing Page Specific JavaScript
        function initDigitalMarketingPage() {
            // FAQ Toggle Functionality
            const faqQuestions = document.querySelectorAll('.faq-question');
            
            if (faqQuestions.length > 0) {
                faqQuestions.forEach(question => {
                    question.addEventListener('click', () => {
                        const answer = question.nextElementSibling;
                        const isActive = answer.classList.contains('active');
                        
                        // Close all answers
                        document.querySelectorAll('.faq-answer').forEach(ans => {
                            ans.classList.remove('active');
                        });
                        
                        // Reset all icons
                        document.querySelectorAll('.faq-question span').forEach(span => {
                            span.textContent = '+';
                        });
                        
                        // Toggle current answer if it wasn't active
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

            // Pricing Tabs Functionality
            const tabButtons = document.querySelectorAll('.tab-button');
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            if (tabButtons.length > 0) {
                tabButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const targetTab = button.getAttribute('data-tab');
                        
                        // Remove active class from all buttons and panes
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        tabPanes.forEach(pane => pane.classList.remove('active'));
                        
                        // Add active class to clicked button and corresponding pane
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
                    const elementVisible = 150;
                    
                    if (elementTop < window.innerHeight - elementVisible) {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }
                });
            };

            // Set initial state for animation on digital marketing page
            const digitalMarketingElements = document.querySelectorAll('.package-card, .process-step, .faq-item, .pricing-table-container');
            if (digitalMarketingElements.length > 0) {
                digitalMarketingElements.forEach(element => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(30px)';
                    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                });

                // Listen for scroll events
                window.addEventListener('scroll', animateDigitalMarketingElements);
                
                // Initial check on page load
                animateDigitalMarketingElements();
            }

            console.log('Digital Marketing page initialized successfully');
        }

        // Initialize digital marketing page if we're on that page
        if (document.querySelector('.webdev-hero')) {
            document.addEventListener('DOMContentLoaded', initDigitalMarketingPage);
        }
    

// Services Page Functionality
function initServicesPage() {
    // Add services page specific functionality here
    initSmoothScrolling();
    
    console.log('Services page initialized successfully');
}

// Contact Page Functionality
function initContactPage() {
    // Add contact page specific functionality here
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactFormSubmission(this);
        });
    }
    
    console.log('Contact page initialized successfully');
}

function handleContactFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending Message...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Global utility functions
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

// Export functionality for global access
if (typeof window.ThriveAxis === 'undefined') {
    window.ThriveAxis = {};
}

// Digital Marketing specific methods
window.ThriveAxis.digitalMarketing = {
    initTabs: initPricingTabs,
    initFAQ: initFAQ,
    initSmoothScrolling: initSmoothScrolling
};

// General utility methods
window.ThriveAxis.utils = {
    debounce: debounce,
    throttle: throttle,
    showNotification: showNotification
};

// Page initialization methods
window.ThriveAxis.pages = {
    initDigitalMarketing: initDigitalMarketingPage,
    initServices: initServicesPage,
    initContact: initContactPage
};

// About Page Specific JavaScript for ThriveAxis

document.addEventListener('DOMContentLoaded', function() {
    console.log('About page loaded - initializing components');
    
    // Initialize counters
    initAboutCounters();
    
    // Initialize team card hover effects
    initTeamCardEffects();
    
    // Initialize scroll animations
    initAboutAnimations();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// Counter animation for stats
function initAboutCounters() {
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    
    if (statNumbers.length === 0) return;
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count')) || 100;
                const duration = 2000; // 2 seconds
                const step = count / (duration / 16); // 60fps
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

// Team card hover effects
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

// Scroll animations for about page sections
function initAboutAnimations() {
    // GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Animate mission cards
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
        
        // Animate team cards
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
        
        // Animate mentor cards
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
    
    // Intersection Observer for fade-in animations
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
    
    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Skip if it's a button or external link
            if (this.classList.contains('btn') || this.getAttribute('href') === '#') {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#our-story') {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Adjust for navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Image error handling
function initImageHandlers() {
    const images = document.querySelectorAll('.team-image img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn('Image failed to load:', this.src);
            
            // Create fallback with initials
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

// Initialize image handlers
if (document.querySelector('.team-image img')) {
    initImageHandlers();
}

// Export functions for global access
window.ThriveAxis = window.ThriveAxis || {};
window.ThriveAxis.about = {
    initCounters: initAboutCounters,
    initAnimations: initAboutAnimations,
    initTeamEffects: initTeamCardEffects
};

