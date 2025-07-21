
// Initialize WOW.js for animations
new WOW().init();

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
    mobileMenuBtn.innerHTML = mobileMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
});

mobileMenuOverlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('#mobileMenu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = 'auto';
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Image modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.close-modal');
const viewImageButtons = document.querySelectorAll('.view-image');

viewImageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
        modalImg.src = button.getAttribute('data-image');
        document.body.style.overflow = 'hidden';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    // For this example, we'll just show an alert
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    contactForm.reset();
});

// Create floating elements dynamically
const floatingElementsContainer = document.querySelector('.floating-elements');

for (let i = 0; i < 8; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    
    const size = Math.random() * 20 + 10;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 15 + 10;
    
    element.style.width = `${size}px`;
    element.style.height = `${size}px`;
    element.style.top = `${posY}%`;
    element.style.left = `${posX}%`;
    element.style.animationDelay = `${delay}s`;
    element.style.animationDuration = `${duration}s`;
    
    floatingElementsContainer.appendChild(element);
}

// Add hover effect to service cards to show button
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const btn = card.querySelector('.btn');
    
    card.addEventListener('mouseenter', () => {
        btn.style.display = 'inline-block';
        btn.classList.add('animate__animated', 'animate__fadeInUp');
    });
    
    card.addEventListener('mouseleave', () => {
        btn.style.display = 'none';
        btn.classList.remove('animate__animated', 'animate__fadeInUp');
    });
});

// Animate stats counting
const statItems = document.querySelectorAll('.stat-item');

function animateStats() {
    statItems.forEach(item => {
        const numberElement = item.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        
        let current = start;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            numberElement.textContent = Math.floor(current);
        }, 16);
    });
}

// Intersection Observer for stats animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    }
});

// Page transition effect
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

// Hide header on scroll down, show on scroll up
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('hide')) {
        // Scroll down
        header.classList.add('hide');
    } else if (currentScroll < lastScroll && header.classList.contains('hide')) {
        // Scroll up
        header.classList.remove('hide');
    }
    lastScroll = currentScroll;
});
