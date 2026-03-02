// Particle animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay and duration
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Typing animation
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Smooth scroll
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Intersection Observer for scroll animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe section elements
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
}

// Parallax effect for background
function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.main');
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Mouse follower effect (optional, subtle)
function createMouseFollower() {
    const follower = document.createElement('div');
    follower.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 2px solid rgba(100, 255, 218, 0.5);
        pointer-events: none;
        transition: transform 0.2s ease, opacity 0.2s ease;
        z-index: 9999;
        opacity: 0;
    `;
    document.body.appendChild(follower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        follower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        follower.style.opacity = '0';
    });

    function animate() {
        const distX = mouseX - followerX;
        const distY = mouseY - followerY;

        followerX += distX / 10;
        followerY += distY / 10;

        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animate);
    }

    animate();
}

// Add hover effect to interactive elements
function addHoverEffects() {
    const interactiveElements = document.querySelectorAll('.skill-tag, .social a, .stat-card, .contact-card, .cta-button');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #64ffda, #9d4edd);
        width: 0%;
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Hide scroll indicator when user scrolls
function handleScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Random color shift for accent elements (subtle)
function subtleColorShift() {
    const colors = [
        '#64ffda',
        '#7c3aed',
        '#f472b6',
        '#fbbf24',
        '#34d399'
    ];
    
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % colors.length;
        document.documentElement.style.setProperty('--accent-color', colors[currentIndex]);
    }, 10000); // Change every 10 seconds
}

// Performance-friendly resize handler
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate any size-dependent features here
        console.log('Window resized');
    }, 250);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core features
    createParticles();
    smoothScroll();
    observeElements();
    addHoverEffects();
    createScrollProgress();
    handleScrollIndicator();
    
    // Optional: Uncomment if you want these features
    // parallaxEffect();
    // createMouseFollower();
    // subtleColorShift();
    
    // Typing animation for description
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const originalText = typingElement.textContent;
        setTimeout(() => {
            typeWriter(typingElement, originalText, 80);
        }, 1500);
    }
    
    // Add loading animation complete class
    document.body.classList.add('loaded');
});

// Preload images for better performance
window.addEventListener('load', () => {
    const img = new Image();
    img.src = 'background.jpg';
});

// Handle link security
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

// Console message for curious developers
console.log('%c👋 Hello, fellow developer!', 'font-size: 20px; font-weight: bold; color: #64ffda;');
console.log('%cIf you\'re reading this, you might enjoy checking out my code on GitHub!', 'font-size: 14px; color: #fff;');
console.log('%chttps://github.com/uttsav1025', 'font-size: 12px; color: #64ffda; text-decoration: underline;');
