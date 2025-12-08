// Three.js animations for ThriveAxis website

class ThreeScene {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        this.particles = null;
        this.mouseX = 0;
        this.mouseY = 0;
        
        this.init();
        this.animate();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.top = '0';
        this.renderer.domElement.style.left = '0';
        this.renderer.domElement.style.zIndex = '1';
        this.container.appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.z = 30;
        
        // Create particles
        this.createParticles();
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffd700, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
        
        // Handle window resize
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Mouse move interaction
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }
    
    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        const particleCount = 1000;
        
        for (let i = 0; i < particleCount; i++) {
            // Random position in a sphere
            const radius = 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            vertices.push(x, y, z);
            
            // Gold color with some variation
            const r = 1.0; // Red
            const g = 0.84 + Math.random() * 0.16; // Green (0.84-1.0)
            const b = 0.0; // Blue
            colors.push(r, g, b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouseX = (event.clientX - window.innerWidth / 2) * 0.00000000000000000000000001;
        this.mouseY = (event.clientY - window.innerHeight / 2) * 0.00000000000000000000000001;
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        if (this.particles) {
            this.particles.rotation.x += 0.001;
            this.particles.rotation.y += 0.002;
            
            // Subtle mouse interaction
            this.particles.rotation.x += this.mouseY;
            this.particles.rotation.y += this.mouseX;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js scene for hero section
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the home page
    if (document.querySelector('.hero')) {
        new ThreeScene('particles-js');
    }
    
    // Check if we're on the contact page
    if (document.getElementById('contact-particles')) {
        new ThreeScene('contact-particles');
    }
});

// Additional animation utilities
class ThriveAxisAnimations {
    static initServiceAnimations() {
        // Service-specific animations
        const serviceSections = document.querySelectorAll('.service-detail');
        
        serviceSections.forEach((section, index) => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 1,
                y: 50,
                opacity: 0,
                delay: index * 0.2,
                ease: 'power3.out'
            });
        });
    }
    
    static initTeamAnimations() {
        // Team member card animations
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.8,
                y: 30,
                opacity: 0,
                delay: index * 0.1,
                ease: 'power3.out'
            });
        });
    }
    
    static initBlogAnimations() {
        // Blog card animations
        const blogCards = document.querySelectorAll('.blog-card');
        
        blogCards.forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                duration: 0.6,
                y: 20,
                opacity: 0,
                delay: index * 0.05,
                ease: 'power2.out'
            });
        });
    }
}

// Initialize specific page animations
document.addEventListener('DOMContentLoaded', function() {
    // Service page animations
    if (document.querySelector('.service-detail')) {
        ThriveAxisAnimations.initServiceAnimations();
    }
    
    // About page animations
    if (document.querySelector('.team-section')) {
        ThriveAxisAnimations.initTeamAnimations();
    }
    
    // Blog page animations
    if (document.querySelector('.blog-grid')) {
        ThriveAxisAnimations.initBlogAnimations();
    }
});

// Export for use in other modules
window.ThriveAxisAnimations = ThriveAxisAnimations;