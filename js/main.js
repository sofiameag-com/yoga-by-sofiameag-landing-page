// Sofia Meag - Main JavaScript
// Smooth scroll, navigation, form handling, and interactive features

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('nav-sticky', 'shadow-lg');
            navbar.classList.remove('bg-transparent');
            
            // Change nav link colors when sticky
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('text-white');
                link.classList.add('text-[#4A4A4A]');
            });
            
            // Change logo color
            const logo = navbar.querySelector('a[href="#home"]');
            logo.classList.remove('text-white');
            logo.classList.add('text-[#8B7355]');
            
            // Change mobile button color
            const mobileIcon = mobileMenuButton.querySelector('i');
            mobileIcon.classList.remove('text-white');
            mobileIcon.classList.add('text-[#8B7355]');
        } else {
            navbar.classList.remove('nav-sticky', 'shadow-lg');
            navbar.classList.add('bg-transparent');
            
            // Revert nav link colors
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.add('text-white');
                link.classList.remove('text-[#4A4A4A]');
            });
            
            // Revert logo color
            const logo = navbar.querySelector('a[href="#home"]');
            logo.classList.add('text-white');
            logo.classList.remove('text-[#8B7355]');
            
            // Revert mobile button color
            const mobileIcon = mobileMenuButton.querySelector('i');
            mobileIcon.classList.add('text-white');
            mobileIcon.classList.remove('text-[#8B7355]');
        }
    });
    
    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        const icon = this.querySelector('i');
        
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });
    
    // Smooth scroll for all anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu after click
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopButton = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopButton.classList.remove('hidden');
            scrollTopButton.classList.add('animate-fade-in');
        } else {
            scrollTopButton.classList.add('hidden');
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== CONTACT FORM HANDLING =====
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const classType = document.getElementById('class-type').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !phone || !classType) {
            showFormMessage('Por favor, completa todos los campos obligatorios.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Por favor, ingresa un email válido.', 'error');
            return;
        }
        
        // Build WhatsApp message
        const whatsappMessage = `Hola Sofia, soy ${name}. Me gustaría reservar una clase de ${getClassTypeName(classType)}.\n\nContacto:\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje: ${message || 'Sin mensaje adicional'}`;
        
        // Redirect to WhatsApp
        const whatsappNumber = '573116155931'; // Sofia Meag's WhatsApp
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show success message
        showFormMessage(
            `¡Gracias ${name}! Te estamos redirigiendo a WhatsApp para completar tu reserva...`,
            'success'
        );
        
        // Open WhatsApp after a short delay
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 1500);
        
        // Log form data for analytics (optional)
        console.log('Form Data:', {
            name,
            email,
            phone,
            classType,
            message,
            timestamp: new Date().toISOString()
        });
    });
    
    function showFormMessage(text, type) {
        formMessage.textContent = text;
        formMessage.classList.remove('hidden', 'text-green-600', 'text-red-600', 'text-blue-600');
        
        if (type === 'success') {
            formMessage.classList.add('text-green-600', 'font-semibold');
        } else if (type === 'error') {
            formMessage.classList.add('text-red-600', 'font-semibold');
        } else {
            formMessage.classList.add('text-blue-600', 'font-semibold');
        }
        
        // Auto-hide message after 10 seconds
        setTimeout(() => {
            formMessage.classList.add('hidden');
        }, 10000);
    }
    
    function getClassTypeName(classType) {
        const classNames = {
            'yoga': 'Yoga',
            'sound-healing': 'Sound Healing',
            'private': 'Clase Privada'
        };
        return classNames[classType] || classType;
    }
    
    // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - navbar.offsetHeight - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('font-bold', 'border-b-2', 'border-[#D4A574]');
            
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('font-bold', 'border-b-2', 'border-[#D4A574]');
            }
        });
    });
    
    // ===== GALLERY LIGHTBOX EFFECT =====
    const galleryImages = document.querySelectorAll('#gallery img');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
            lightbox.style.cursor = 'pointer';
            
            // Create enlarged image
            const enlargedImg = document.createElement('img');
            enlargedImg.src = this.src;
            enlargedImg.className = 'max-w-full max-h-full object-contain rounded-lg shadow-2xl';
            enlargedImg.style.cursor = 'default';
            
            // Create close button
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '<i class="fas fa-times text-4xl"></i>';
            closeButton.className = 'absolute top-8 right-8 text-white hover:text-[#D4A574] transition-colors';
            
            // Add elements to lightbox
            lightbox.appendChild(enlargedImg);
            lightbox.appendChild(closeButton);
            
            // Add lightbox to body
            document.body.appendChild(lightbox);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
            
            // Close lightbox on click
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox || e.target === closeButton || e.target.parentElement === closeButton) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
            
            // Close on ESC key
            document.addEventListener('keydown', function escHandler(e) {
                if (e.key === 'Escape') {
                    if (document.body.contains(lightbox)) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                    document.removeEventListener('keydown', escHandler);
                }
            });
        });
    });
    
    // ===== PERFORMANCE: LAZY LOAD IMAGES =====
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // ===== HOVER EFFECTS FOR CARDS =====
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== CONSOLE MESSAGE =====
    console.log('%c✨ Sofia Meag ✨', 'font-size: 24px; color: #8B7355; font-weight: bold;');
    console.log('%cCalma, movimiento y bienestar en cada sesión 🧘‍♀️', 'font-size: 14px; color: #A8C5A8;');
    console.log('%cYoga y Sound Healing en Pereira', 'font-size: 12px; color: #4A4A4A;');
    
});

// ===== UTILITY FUNCTIONS =====

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to element
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - document.getElementById('navbar').offsetHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}
