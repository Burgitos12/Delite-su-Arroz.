document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Ocultar preloader cuando la página esté cargada
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Mostrar u ocultar botón de volver arriba
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    // Menú hamburguesa
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            }
        });
    });

    // Smooth scroll para enlaces internos
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

    // Botón de volver arriba
    const backToTop = document.querySelector('.back-to-top');
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Formulario de reserva
    const reservaForm = document.getElementById('reservaForm');
    const confirmationModal = document.querySelector('.reservation-confirmation');
    const confirmationBtn = document.querySelector('.confirmation-btn');
    
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envío del formulario
            setTimeout(() => {
                // Mostrar modal de confirmación
                confirmationModal.classList.add('active');
                
                // Resetear formulario
                reservaForm.reset();
                
                // Resetear etiquetas flotantes
                const floatingLabels = document.querySelectorAll('.floating-label input, .floating-label textarea');
                floatingLabels.forEach(input => {
                    if (input.value === '') {
                        input.nextElementSibling.style.top = '0.75rem';
                        input.nextElementSibling.style.left = '0.75rem';
                        input.nextElementSibling.style.fontSize = '1rem';
                    }
                });
            }, 1000);
        });
    }
    
    // Cerrar modal de confirmación
    if (confirmationBtn) {
        confirmationBtn.addEventListener('click', function() {
            confirmationModal.classList.remove('active');
        });
    }

    // Efecto de partículas en el fondo
    createParticles();

    // Animación de ingredientes flotantes
    animateFloatingIngredients();
});

function createParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 50 : 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(230, 57, 70, ${Math.random() * 0.5 + 0.1})`;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.life = Math.random() * 100 + 50;
            this.currentLife = 0;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.currentLife++;

            // Rebotar en los bordes
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Cambiar opacidad basado en el ciclo de vida
            if (this.currentLife < this.life / 2) {
                this.opacity = (this.currentLife / (this.life / 2)) * 0.5;
            } else {
                this.opacity = ((this.life - this.currentLife) / (this.life / 2)) * 0.5;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.currentLife >= particle.life) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function animateFloatingIngredients() {
    const ingredients = document.querySelectorAll('.floating-item');
    
    ingredients.forEach(ingredient => {
        // Añadir animación aleatoria adicional
        ingredient.style.setProperty('--start-x', `${Math.random() * 20 - 10}%`);
        ingredient.style.setProperty('--end-x', `${Math.random() * 20 - 10}%`);
        
        // Añadir animación de balanceo
        ingredient.style.animation = `
            floatItem var(--duration) infinite ease-in-out var(--delay),
            swing ${Math.random() * 10 + 10}s infinite ease-in-out var(--delay)
        `;
    });
}