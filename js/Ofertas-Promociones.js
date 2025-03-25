document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after 1.5 seconds
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });
    
    // Back to top button
    const fabTop = document.querySelector('.fab-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fabTop.classList.add('visible');
        } else {
            fabTop.classList.remove('visible');
        }
    });
    
    fabTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // WhatsApp button
    const fabWhatsapp = document.querySelector('.fab-whatsapp');
    
    fabWhatsapp.addEventListener('click', () => {
        window.open('https://wa.me/573223724043', '_blank');
    });
    
    // Countdown timer for daily offer
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 0);
        
        const diff = endOfDay - now;
        
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Promotion tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const promotionTabs = document.querySelectorAll('.promotion-tab');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            promotionTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Show corresponding tab
            const tabId = btn.getAttribute('data-tab') + '-tab';
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Limited time offer timers
    function updateLimitedTimers() {
        const limitedTimers = document.querySelectorAll('.timer-count');
        
        limitedTimers.forEach(timer => {
            const currentText = timer.textContent;
            const [hours, minutes, seconds] = currentText.split(':').map(Number);
            
            let totalSeconds = hours * 3600 + minutes * 60 + seconds;
            
            if (totalSeconds <= 0) {
                timer.textContent = '00:00:00';
                return;
            }
            
            totalSeconds--;
            
            const newHours = Math.floor(totalSeconds / 3600);
            const newMinutes = Math.floor((totalSeconds % 3600) / 60);
            const newSeconds = totalSeconds % 60;
            
            timer.textContent = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        });
    }
    
    // Update limited timers every second
    setInterval(updateLimitedTimers, 1000);
    
    // Coupon functionality
    const copyCouponBtn = document.getElementById('copiar-cupon');
    const shareCouponBtn = document.getElementById('compartir-cupon');
    
    copyCouponBtn.addEventListener('click', () => {
        const couponCode = document.querySelector('.coupon-code').textContent;
        navigator.clipboard.writeText(couponCode)
            .then(() => {
                copyCouponBtn.textContent = '¡Copiado!';
                setTimeout(() => {
                    copyCouponBtn.textContent = 'Copiar Código';
                }, 2000);
            })
            .catch(err => {
                console.error('Error al copiar: ', err);
            });
    });
    
    shareCouponBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: '¡Descuento en Deleite su Arroz!',
                text: 'Usa este cupón para obtener un 20% de descuento en tu pedido',
                url: window.location.href
            })
            .catch(err => {
                console.error('Error al compartir: ', err);
            });
        } else {
            alert('Comparte esta URL con tus amigos: ' + window.location.href);
        }
    });
    
    // Modal functionality
    const modal = document.getElementById('offer-modal');
    const closeModal = document.querySelector('.close-modal');
    const offerBtns = document.querySelectorAll('[data-offer]');
    
    // Offer details data
    const offersData = {
        'daily-offer': {
            title: 'Arroz Chino Especial',
            image: '../images/oferta-dia.jpg',
            description: 'Disfruta de nuestro delicioso Arroz Chino Especial con un 10% de descuento exclusivo para hoy.',
            details: [
                'Válido solo para pedidos realizados hoy',
                'No acumulable con otras promociones',
                'Disponible para comer en el local y para llevar',
                'Incluye ingredientes premium: camarones, pollo y vegetales frescos'
            ],
            price: '$22.500',
            originalPrice: '$25.000'
        },
        'combo-offer': {
            title: 'Combo Familiar',
            image: '../images/oferta-combo.jpg',
            description: 'Perfecto para compartir en familia, nuestro combo incluye 4 platos principales y 2 postres.',
            details: [
                'Ahorra $10.000 con este combo especial',
                'Incluye 2 bebidas grandes de cortesía',
                'Válido solo los fines de semana',
                'Puedes personalizar los platos principales'
            ],
            price: '$65.000',
            originalPrice: '$75.000'
        },
        'new-offer': {
            title: 'Arroz Thai Picante',
            image: '../images/oferta-nuevo.jpg',
            description: 'Prueba nuestro nuevo Arroz Thai Picante con un 15% de descuento en su lanzamiento.',
            details: [
                'Nueva receta exclusiva de nuestro chef',
                'Nivel de picante ajustable',
                'Incluye camarones y vegetales frescos',
                'Promoción válida hasta agotar existencias'
            ],
            price: '$23.800',
            originalPrice: '$28.000'
        }
    };
    
    // Open modal with offer details
    offerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const offerId = btn.getAttribute('data-offer');
            const offer = offersData[offerId];
            
            if (offer) {
                const modalBody = document.getElementById('modal-body-content');
                
                modalBody.innerHTML = `
                    <div class="modal-offer">
                        <div class="modal-image">
                            <img src="${offer.image}" alt="${offer.title}">
                        </div>
                        <div class="modal-details">
                            <h3>${offer.title}</h3>
                            <p class="modal-description">${offer.description}</p>
                            <div class="modal-price">
                                <span class="original-price">${offer.originalPrice}</span>
                                <span class="current-price">${offer.price}</span>
                            </div>
                            <ul class="modal-list">
                                ${offer.details.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('')}
                            </ul>
                            <div class="modal-actions">
                                <button class="btn-primary" id="pedir-ahora">Pedir Ahora</button>
                                <button class="btn-outline" id="reservar-mesa">Reservar Mesa</button>
                            </div>
                        </div>
                    </div>
                `;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Add event listeners to new buttons
                document.getElementById('pedir-ahora').addEventListener('click', () => {
                    window.location.href = 'reservas.html';
                });
                
                document.getElementById('reservar-mesa').addEventListener('click', () => {
                    window.location.href = 'reservas.html';
                });
            }
        });
    });
    
    // Close modal
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
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.offer-card, .promotion-card, .limited-card, .coupon-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const offers = document.querySelectorAll('.offer-card');
    const promotions = document.querySelectorAll('.promotion-card');
    const limitedOffers = document.querySelectorAll('.limited-card');
    const couponCard = document.querySelector('.coupon-card');
    
    offers.forEach((offer, index) => {
        offer.style.opacity = '0';
        offer.style.transform = 'translateY(20px)';
        offer.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    });
    
    promotions.forEach((promo, index) => {
        promo.style.opacity = '0';
        promo.style.transform = 'translateY(20px)';
        promo.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1 + 0.3}s`;
    });
    
    limitedOffers.forEach((limited, index) => {
        limited.style.opacity = '0';
        limited.style.transform = 'translateY(20px)';
        limited.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1 + 0.6}s`;
    });
    
    couponCard.style.opacity = '0';
    couponCard.style.transform = 'translateY(20px)';
    couponCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease 0.9s';
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Pulse animation for limited offers
    setInterval(() => {
        const limitedCards = document.querySelectorAll('.limited-card');
        limitedCards.forEach(card => {
            card.classList.add('pulse');
            setTimeout(() => {
                card.classList.remove('pulse');
            }, 1000);
        });
    }, 5000);
});