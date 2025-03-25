document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Simular carga de contenido
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Configuración de Partículas.js
    particlesJS("particles-js", {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#FF4757"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#FF4757",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
    
    // Mostrar/ocultar contraseña
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Mostrar ventana de login
    const showLoginBtn = document.getElementById('showLogin');
    const inspirationCard = document.querySelector('.inspiration-card');
    const loginCard = document.querySelector('.login-card');
    
    if (showLoginBtn && inspirationCard && loginCard) {
        showLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación con GSAP
            gsap.to(inspirationCard, {
                rotationY: 180,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: function() {
                    inspirationCard.classList.add('hidden');
                    loginCard.classList.add('active');
                    
                    gsap.fromTo(loginCard, {
                        rotationY: -180,
                        opacity: 0
                    }, {
                        rotationY: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.inOut"
                    });
                }
            });
        });
    }
    
    // Validación del formulario
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            // Validación simple
            if (!email || !password) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Por favor ingresa un correo válido', 'error');
                return;
            }
            
            // Simular envío de formulario
            showNotification('Iniciando sesión...', 'info');
            
            // Simular respuesta del servidor después de 2 segundos
            setTimeout(() => {
                // Aquí normalmente harías una petición AJAX al servidor
                // Por ahora simulamos un login exitoso
                showNotification('¡Bienvenido de nuevo!', 'success');
                
                // Redirigir al dashboard después de 1.5 segundos
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        });
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add(type, 'show');
        
        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Función para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Efecto hover en tarjetas
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const x = e.clientX - this.getBoundingClientRect().left;
            const y = e.clientY - this.getBoundingClientRect().top;
            
            const centerX = this.offsetWidth / 2;
            const centerY = this.offsetHeight / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            gsap.to(this, {
                rotationX: angleX,
                rotationY: angleY,
                transformPerspective: 1000,
                transformOrigin: "center center",
                ease: "power1.out",
                duration: 0.5
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                rotationX: 0,
                rotationY: 0,
                ease: "power1.out",
                duration: 0.5
            });
        });
    });
});