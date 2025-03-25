document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });

    // Slider del hero
    const heroSlider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    
    // Crear dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pausar al interactuar
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Slider de testimonios
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialPrevBtn = document.querySelector('.testimonial-prev');
    const testimonialNextBtn = document.querySelector('.testimonial-next');
    const testimonialDotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;
    
    // Crear dots para testimonios
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        testimonialDotsContainer.appendChild(dot);
    });
    
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    
    function goToTestimonial(index) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }
    
    function nextTestimonial() {
        goToTestimonial(currentTestimonial + 1);
    }
    
    function prevTestimonial() {
        goToTestimonial(currentTestimonial - 1);
    }
    
    testimonialNextBtn.addEventListener('click', nextTestimonial);
    testimonialPrevBtn.addEventListener('click', prevTestimonial);
    
    // Auto slide para testimonios
    let testimonialInterval = setInterval(nextTestimonial, 7000);
    
    testimonialSlider.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(nextTestimonial, 7000);
    });

    // Video play button
    const video = document.getElementById('restaurant-video');
    const videoPlayBtn = document.querySelector('.video-play-btn');
    const videoWrapper = document.querySelector('.video-wrapper');
    
    videoPlayBtn.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoWrapper.classList.add('playing');
        } else {
            video.pause();
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoWrapper.classList.remove('playing');
        }
    });
    
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
            videoWrapper.classList.add('playing');
        } else {
            video.pause();
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
            videoWrapper.classList.remove('playing');
        }
    });

    // Contador de estadísticas
    const statsItems = document.querySelectorAll('.stat-item');
    
    function animateStats() {
        statsItems.forEach(item => {
            const numberElement = item.querySelector('.stat-number');
            const target = parseInt(numberElement.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const counter = setInterval(() => {
                current += step;
                if (current >= target) {
                    clearInterval(counter);
                    current = target;
                }
                numberElement.textContent = Math.floor(current);
            }, 16);
        });
    }
    
    // Activar cuando el elemento es visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsItems.forEach(item => {
        observer.observe(item);
    });

    // Botón de ir arriba
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Carrito de compras
    const cartModal = document.querySelector('.cart-modal');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartBtn = document.querySelector('.cart-floating');
    const cartCloseBtn = document.querySelector('.cart-close');
    const addToCartBtns = document.querySelectorAll('.btn-add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.total-amount');
    const cartCount = document.querySelector('.cart-count');
    const cartClearBtn = document.querySelector('.btn-cart-clear');
    
    let cart = [];
    
    // Abrir/cerrar carrito
    cartBtn.addEventListener('click', function() {
        cartModal.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    cartCloseBtn.addEventListener('click', function() {
        cartModal.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    cartOverlay.addEventListener('click', function() {
        cartModal.classList.remove('active');
        this.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Añadir al carrito
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Verificar si el producto ya está en el carrito
            const existingItem = cart.find(item => item.product === product);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    product,
                    price,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Animación de confirmación
            this.textContent = '✓ Añadido';
            this.style.backgroundColor = 'var(--color-success)';
            
            setTimeout(() => {
                this.textContent = 'Añadir al carrito';
                this.style.backgroundColor = 'var(--color-secondary)';
            }, 2000);
        });
    });
    
    // Actualizar carrito
    function updateCart() {
        // Limpiar carrito
        cartItemsContainer.innerHTML = '';
        
        let total = 0;
        let itemCount = 0;
        
        // Añadir items
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            cartItem.innerHTML = `
                <img src="../imagenes/${item.product.toLowerCase().replace(/ /g, '-')}.jpg" alt="${item.product}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.product}</h4>
                    <p class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <input type="number" min="1" value="${item.quantity}" class="cart-item-quantity">
                        <button class="cart-item-remove"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItem);
            
            total += item.price * item.quantity;
            itemCount += item.quantity;
            
            // Event listeners para los elementos recién creados
            const quantityInput = cartItem.querySelector('.cart-item-quantity');
            const removeBtn = cartItem.querySelector('.cart-item-remove');
            
            quantityInput.addEventListener('change', function() {
                const newQuantity = parseInt(this.value);
                if (newQuantity > 0) {
                    item.quantity = newQuantity;
                    updateCart();
                } else {
                    this.value = item.quantity;
                }
            });
            
            removeBtn.addEventListener('click', function() {
                cart = cart.filter(cartItem => cartItem.product !== item.product);
                updateCart();
            });
        });
        
        // Actualizar total y contador
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = itemCount;
        
        // Mostrar/ocultar carrito flotante
        if (itemCount > 0) {
            cartBtn.style.display = 'flex';
        } else {
            cartBtn.style.display = 'none';
        }
    }
    
    // Vaciar carrito
    cartClearBtn.addEventListener('click', function() {
        cart = [];
        updateCart();
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate__animated');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const animationClass = element.getAttribute('data-animation');
                element.classList.add(animationClass || 'animate__fadeIn');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar al cargar la página
    
    // Header al hacer scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Efecto hover para productos
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Inicializar el carrito
    updateCart();
});