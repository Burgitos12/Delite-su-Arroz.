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
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    }
    
    // Mostrar ventana de registro
    const showRegisterBtn = document.getElementById('showRegister');
    const invitationCard = document.querySelector('.invitation-card');
    const registerCard = document.querySelector('.register-card');
    
    if (showRegisterBtn && invitationCard && registerCard) {
        showRegisterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animación con GSAP
            gsap.to(invitationCard, {
                rotationY: 180,
                opacity: 0,
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: function() {
                    invitationCard.classList.add('hidden');
                    registerCard.classList.add('active');
                    
                    gsap.fromTo(registerCard, {
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
    
    // Validación de contraseña
    const passwordMatch = document.getElementById('passwordMatch');
    const strengthMeter = document.querySelector('.strength-meter');
    const strengthValue = document.getElementById('strengthValue');
    
    if (passwordInput && confirmPasswordInput && passwordMatch) {
        // Verificar coincidencia de contraseñas
        confirmPasswordInput.addEventListener('input', function() {
            if (passwordInput.value && confirmPasswordInput.value) {
                if (passwordInput.value === confirmPasswordInput.value) {
                    passwordMatch.classList.add('show');
                } else {
                    passwordMatch.classList.remove('show');
                }
            } else {
                passwordMatch.classList.remove('show');
            }
        });
        
        // Medidor de fuerza de contraseña
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Longitud mínima
            if (password.length >= 8) strength += 1;
            
            // Contiene números
            if (/\d/.test(password)) strength += 1;
            
            // Contiene mayúsculas
            if (/[A-Z]/.test(password)) strength += 1;
            
            // Contiene caracteres especiales
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Actualizar medidor visual
            let width = 0;
            let color = '';
            let text = '';
            
            switch(strength) {
                case 0:
                case 1:
                    width = 25;
                    color = 'var(--color-weak)';
                    text = 'Débil';
                    break;
                case 2:
                    width = 50;
                    color = 'var(--color-medium)';
                    text = 'Moderada';
                    break;
                case 3:
                    width = 75;
                    color = 'var(--color-medium)';
                    text = 'Fuerte';
                    break;
                case 4:
                    width = 100;
                    color = 'var(--color-strong)';
                    text = 'Muy fuerte';
                    break;
            }
            
            strengthMeter.style.setProperty('--strength-width', `${width}%`);
            strengthMeter.style.setProperty('--strength-color', color);
            strengthValue.textContent = text;
            strengthValue.style.color = color;
            
            // Actualizar pseudo-elemento
            strengthMeter.style.setProperty('--strength-width', `${width}%`);
            strengthMeter.style.setProperty('--strength-color', color);
            
            // Forzar repintado para aplicar los cambios
            strengthMeter.style.display = 'none';
            strengthMeter.offsetHeight; // Trigger reflow
            strengthMeter.style.display = 'block';
        });
    }
    
    // Validación del formulario
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const terms = document.getElementById('terms').checked;
            
            // Validación básica
            if (!nombre || !email || !password || !confirmPassword) {
                showNotification('Por favor completa todos los campos', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Por favor ingresa un correo válido', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'error');
                return;
            }
            
            if (password.length < 8) {
                showNotification('La contraseña debe tener al menos 8 caracteres', 'error');
                return;
            }
            
            if (!terms) {
                showNotification('Debes aceptar los términos y condiciones', 'error');
                return;
            }
            
            // Simular envío de formulario
            showNotification('Creando tu cuenta...', 'info');
            
            // Simular respuesta del servidor después de 2 segundos
            setTimeout(() => {
                // Aquí normalmente harías una petición AJAX al servidor
                // Por ahora simulamos un registro exitoso
                showNotification('¡Cuenta creada con éxito!', 'success');
                
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