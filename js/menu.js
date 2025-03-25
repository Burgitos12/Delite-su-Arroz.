document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Animación del título del menú
    const menuTitle = document.querySelector('.menu-title');
    const menuDescription = document.querySelector('.menu-description');
    
    if (menuTitle) {
        setTimeout(() => {
            menuTitle.classList.add('animate');
        }, 300);
    }
    
    if (menuDescription) {
        setTimeout(() => {
            menuDescription.classList.add('animate');
        }, 600);
    }

    // Datos de los platos (simulando una API)
    const dishesData = [
        {
            id: 1,
            name: "Arroz Chino",
            category: "chino",
            description: "Arroz frito con vegetales, huevo y pollo, preparado al estilo tradicional chino.",
            price: "35.000, 45.000, 55.000",
            basePrice: 35000,
            rating: 4.7,
            reviews: 95,
            images: [
                "../imagenes/arroz-chino.jpg",
                "../imagenes/arroz-chino-2.jpg",
                "../imagenes/arroz-chino-3.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 35000 },
                { name: "Mediano", price: 45000 },
                { name: "Grande", price: 55000 }
            ],
            customOptions: [
                { name: "Extra Pollo", price: 5000 },
                { name: "Extra Camarones", price: 8000 },
                { name: "Sin Gluten", price: 3000 }
            ],
            popular: true
        },
        {
            id: 2,
            name: "Arroz Paisa",
            category: "paisa",
            description: "Arroz con frijoles, carne, plátano maduro, aguacate y huevo frito.",
            price: "35.000, 45.000, 55.000",
            basePrice: 35000,
            rating: 4.5,
            reviews: 82,
            images: [
                "../imagenes/arroz-paisa.jpg",
                "../imagenes/arroz-paisa-2.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 35000 },
                { name: "Mediano", price: 45000 },
                { name: "Grande", price: 55000 }
            ],
            customOptions: [
                { name: "Extra Carne", price: 5000 },
                { name: "Extra Aguacate", price: 3000 },
                { name: "Sin Huevo", price: 0 }
            ],
            popular: true
        },
        {
            id: 3,
            name: "Arroz Especial",
            category: "especial",
            description: "Arroz con camarones, pollo, vegetales frescos y nuestra salsa especial.",
            price: "40.000, 50.000, 60.000",
            basePrice: 40000,
            rating: 4.9,
            reviews: 128,
            images: [
                "../imagenes/arroz-especial.jpg",
                "../imagenes/arroz-especial-2.jpg",
                "../imagenes/arroz-especial-3.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 40000 },
                { name: "Mediano", price: 50000 },
                { name: "Grande", price: 60000 }
            ],
            customOptions: [
                { name: "Extra Camarones", price: 8000 },
                { name: "Extra Pollo", price: 5000 },
                { name: "Picante", price: 2000 }
            ],
            popular: true,
            badge: "Más vendido"
        },
        {
            id: 4,
            name: "Pollo y Camarón",
            category: "mixto",
            description: "Arroz con pollo a la plancha, camarones salteados y salsa especial.",
            price: "38.000, 48.000, 58.000",
            basePrice: 38000,
            rating: 4.6,
            reviews: 67,
            images: [
                "../imagenes/pollo-camaron.jpg",
                "../imagenes/pollo-camaron-2.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 38000 },
                { name: "Mediano", price: 48000 },
                { name: "Grande", price: 58000 }
            ],
            customOptions: [
                { name: "Extra Camarones", price: 8000 },
                { name: "Extra Pollo", price: 5000 },
                { name: "Sin Picante", price: 0 }
            ]
        },
        {
            id: 5,
            name: "Arroz Mixto",
            category: "mixto",
            description: "Arroz con carne de res, pollo y cerdo, acompañado de vegetales salteados.",
            price: "36.000, 46.000, 56.000",
            basePrice: 36000,
            rating: 4.4,
            reviews: 53,
            images: [
                "../imagenes/arroz-mixto.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 36000 },
                { name: "Mediano", price: 46000 },
                { name: "Grande", price: 56000 }
            ],
            customOptions: [
                { name: "Extra Carne", price: 5000 },
                { name: "Extra Pollo", price: 5000 },
                { name: "Extra Cerdo", price: 5000 }
            ]
        },
        {
            id: 6,
            name: "Arroz de las Tres Carnes",
            category: "mixto",
            description: "Arroz con carne de res, pollo y cerdo, acompañado de plátano maduro.",
            price: "37.000, 47.000, 57.000",
            basePrice: 37000,
            rating: 4.3,
            reviews: 48,
            images: [
                "../imagenes/tres-carnes.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 37000 },
                { name: "Mediano", price: 47000 },
                { name: "Grande", price: 57000 }
            ],
            customOptions: [
                { name: "Extra Carne", price: 5000 },
                { name: "Extra Pollo", price: 5000 },
                { name: "Extra Cerdo", price: 5000 }
            ]
        },
        {
            id: 7,
            name: "Arroz Ranchero",
            category: "especial",
            description: "Arroz con chorizo, huevo, vegetales y un toque especial de especias.",
            price: "32.000, 42.000, 52.000",
            basePrice: 32000,
            rating: 4.8,
            reviews: 74,
            images: [
                "../imagenes/arroz-ranchero.jpg"
            ],
            priceOptions: [
                { name: "Pequeño", price: 32000 },
                { name: "Mediano", price: 42000 },
                { name: "Grande", price: 52000 }
            ],
            customOptions: [
                { name: "Extra Chorizo", price: 4000 },
                { name: "Extra Huevo", price: 2000 },
                { name: "Picante", price: 2000 }
            ],
            badge: "Nuevo"
        },
        {
            id: 8,
            name: "Combos Personales",
            category: "combo",
            description: "Variedad de combos para una persona incluye arroz, proteína, ensalada y bebida.",
            price: "18.000",
            basePrice: 18000,
            rating: 4.2,
            reviews: 36,
            images: [
                "../imagenes/combos.jpg"
            ],
            priceOptions: [
                { name: "Combo Personal", price: 18000 }
            ],
            customOptions: [
                { name: "Cambiar Proteína", price: 3000 },
                { name: "Bebida Grande", price: 2000 },
                { name: "Postre", price: 5000 }
            ]
        },
        {
            id: 9,
            name: "Porciones Personales",
            category: "combo",
            description: "Porciones individuales de arroz con la proteína de tu elección.",
            price: "6.000, 6.000, 23.000",
            basePrice: 6000,
            rating: 4.0,
            reviews: 29,
            images: [
                "../imagenes/porciones.jpg"
            ],
            priceOptions: [
                { name: "Porción Pequeña", price: 6000 },
                { name: "Porción Mediana", price: 6000 },
                { name: "Porción Grande", price: 23000 }
            ],
            customOptions: [
                { name: "Extra Proteína", price: 5000 },
                { name: "Extra Vegetales", price: 3000 }
            ]
        }
    ];

    // Elementos del DOM
    const dishesContainer = document.getElementById('dishes-container');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const dishModal = document.querySelector('.dish-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const cartFloating = document.querySelector('.cart-floating');
    const cartCount = document.querySelector('.cart-count');
    const scrollTopBtn = document.querySelector('.scroll-top');

    // Variables del carrito
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let currentDish = null;
    let currentQuantity = 1;
    let selectedPriceOption = null;
    let selectedCustomOptions = [];

    // Cargar platos en la página
    function loadDishes(dishes) {
        dishesContainer.innerHTML = '';
        
        dishes.forEach(dish => {
            const dishCard = document.createElement('div');
            dishCard.className = 'dish-card animate__animated animate__fadeIn';
            dishCard.dataset.id = dish.id;
            dishCard.dataset.category = dish.category;
            
            let badgeHtml = '';
            if (dish.badge) {
                badgeHtml = `<span class="dish-badge">${dish.badge}</span>`;
            }
            
            dishCard.innerHTML = `
                <div class="dish-img-container">
                    <img src="${dish.images[0]}" alt="${dish.name}" class="dish-img">
                    ${badgeHtml}
                </div>
                <div class="dish-content">
                    <h3 class="dish-title">${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    <div class="dish-meta">
                        <span class="dish-category">${getCategoryName(dish.category)}</span>
                        <div class="dish-rating">
                            <i class="fas fa-star"></i>
                            <span>${dish.rating} (${dish.reviews})</span>
                        </div>
                    </div>
                    <p class="dish-price">$${dish.price}</p>
                    <div class="dish-actions">
                        <button class="btn btn-view-details">Ver detalles</button>
                        <button class="btn btn-add-to-cart">Añadir</button>
                    </div>
                </div>
            `;
            
            dishesContainer.appendChild(dishCard);
        });
        
        // Agregar event listeners a los botones
        document.querySelectorAll('.btn-view-details').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = parseInt(this.closest('.dish-card').dataset.id);
                showDishDetails(dishId);
            });
        });
        
        document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
            btn.addEventListener('click', function() {
                const dishId = parseInt(this.closest('.dish-card').dataset.id);
                addToCart(dishId, 1);
            });
        });
    }

    // Mostrar detalles del plato en el modal
    function showDishDetails(dishId) {
        currentDish = dishesData.find(dish => dish.id === dishId);
        currentQuantity = 1;
        selectedPriceOption = 0;
        selectedCustomOptions = [];
        
        // Actualizar el modal con los datos del plato
        document.getElementById('modal-dish-name').textContent = currentDish.name;
        document.getElementById('modal-dish-category').textContent = getCategoryName(currentDish.category);
        document.getElementById('modal-dish-description').textContent = currentDish.description;
        document.getElementById('modal-dish-rating').textContent = currentDish.rating;
        
        // Imágenes
        const mainImage = document.getElementById('modal-main-image');
        mainImage.src = currentDish.images[0];
        mainImage.alt = currentDish.name;
        
        const thumbnailsContainer = document.getElementById('thumbnails-container');
        thumbnailsContainer.innerHTML = '';
        
        currentDish.images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.innerHTML = `<img src="${image}" alt="${currentDish.name}">`;
            thumbnail.addEventListener('click', function() {
                mainImage.src = image;
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
            thumbnailsContainer.appendChild(thumbnail);
        });
        
        // Opciones de precio
        const priceOptionsContainer = document.getElementById('price-options');
        priceOptionsContainer.innerHTML = '';
        
        currentDish.priceOptions.forEach((option, index) => {
            const priceOption = document.createElement('div');
            priceOption.className = 'price-option' + (index === 0 ? ' active' : '');
            priceOption.innerHTML = `
                <div class="price-option-name">${option.name}</div>
                <div class="price-option-price">$${option.price.toLocaleString()}</div>
            `;
            priceOption.addEventListener('click', function() {
                document.querySelectorAll('.price-option').forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                selectedPriceOption = index;
            });
            priceOptionsContainer.appendChild(priceOption);
        });
        
        // Opciones de personalización
        const customOptionsContainer = document.getElementById('custom-options');
        customOptionsContainer.innerHTML = '';
        
        currentDish.customOptions.forEach((option, index) => {
            const customOption = document.createElement('div');
            customOption.className = 'custom-option';
            customOption.innerHTML = `
                <div class="custom-option-info">
                    <input type="checkbox" id="custom-${index}" class="custom-option-checkbox">
                    <label for="custom-${index}" class="custom-option-name">${option.name}</label>
                </div>
                <div class="custom-option-price">+$${option.price.toLocaleString()}</div>
            `;
            
            const checkbox = customOption.querySelector('.custom-option-checkbox');
            checkbox.addEventListener('change', function() {
                if (this.checked) {
                    selectedCustomOptions.push(index);
                } else {
                    selectedCustomOptions = selectedCustomOptions.filter(i => i !== index);
                }
            });
            
            customOptionsContainer.appendChild(customOption);
        });
        
        // Actualizar el selector de cantidad
        const quantityInput = document.querySelector('.quantity-input');
        quantityInput.value = currentQuantity;
        
        // Mostrar el modal
        dishModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Cerrar el modal
    function closeModal() {
        dishModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Añadir al carrito
    function addToCart(dishId, quantity) {
        const dish = dishesData.find(d => d.id === dishId);
        
        if (!dish) return;
        
        // Verificar si el plato ya está en el carrito
        const existingItem = cart.find(item => item.dishId === dishId && 
            JSON.stringify(item.customOptions) === JSON.stringify(selectedCustomOptions) &&
            item.priceOption === selectedPriceOption);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                dishId,
                name: dish.name,
                image: dish.images[0],
                price: dish.priceOptions[selectedPriceOption].price,
                priceOption: selectedPriceOption,
                priceOptionName: dish.priceOptions[selectedPriceOption].name,
                customOptions: selectedCustomOptions.map(index => dish.customOptions[index]),
                quantity
            });
        }
        
        updateCart();
        showCartNotification(dish.name, quantity);
        closeModal();
    }

    // Actualizar el carrito
    function updateCart() {
        // Actualizar el contador del carrito
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Mostrar/ocultar el botón del carrito
        if (totalItems > 0) {
            cartFloating.style.display = 'flex';
        } else {
            cartFloating.style.display = 'none';
        }
    }

    // Mostrar notificación de añadido al carrito
    function showCartNotification(dishName, quantity) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification animate__animated animate__fadeInUp';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Añadido${quantity > 1 ? ' ' + quantity + ' ' : ' '}${dishName} al carrito</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('animate__fadeOutDown');
            setTimeout(() => {
                notification.remove();
            }, 500);
        }, 3000);
    }

    // Filtrar y ordenar platos
    function filterAndSortDishes() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const sortOption = sortFilter.value;
        
        let filteredDishes = [...dishesData];
        
        // Filtrar por búsqueda
        if (searchTerm) {
            filteredDishes = filteredDishes.filter(dish => 
                dish.name.toLowerCase().includes(searchTerm) || 
                dish.description.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filtrar por categoría
        if (category && category !== 'all') {
            filteredDishes = filteredDishes.filter(dish => dish.category === category);
        }
        
        // Ordenar
        switch (sortOption) {
            case 'price-asc':
                filteredDishes.sort((a, b) => a.basePrice - b.basePrice);
                break;
            case 'price-desc':
                filteredDishes.sort((a, b) => b.basePrice - a.basePrice);
                break;
            case 'name-asc':
                filteredDishes.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                filteredDishes.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'popular':
            default:
                filteredDishes.sort((a, b) => {
                    if (a.popular && !b.popular) return -1;
                    if (!a.popular && b.popular) return 1;
                    return b.rating - a.rating;
                });
                break;
        }
        
        loadDishes(filteredDishes);
    }

    // Obtener nombre de categoría
    function getCategoryName(category) {
        const categories = {
            'chino': 'Arroz Chino',
            'paisa': 'Arroz Paisa',
            'especial': 'Arroz Especial',
            'mixto': 'Arroz Mixto',
            'combo': 'Combos'
        };
        return categories[category] || category;
    }

    // Slider de recomendaciones
    let currentSlide = 0;
    const slides = document.querySelectorAll('.recommendation-slide');
    const dotsContainer = document.querySelector('.slider-dots');
    
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
    
    document.querySelector('.slider-next').addEventListener('click', nextSlide);
    document.querySelector('.slider-prev').addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    document.querySelector('.recommendations-slider').addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    document.querySelector('.recommendations-slider').addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Event listeners
    searchInput.addEventListener('input', filterAndSortDishes);
    categoryFilter.addEventListener('change', filterAndSortDishes);
    sortFilter.addEventListener('change', filterAndSortDishes);
    
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            categoryFilter.value = this.dataset.category;
            filterAndSortDishes();
        });
    });
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Selector de cantidad
    document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
        if (currentQuantity > 1) {
            currentQuantity--;
            document.querySelector('.quantity-input').value = currentQuantity;
        }
    });
    
    document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
        currentQuantity++;
        document.querySelector('.quantity-input').value = currentQuantity;
    });
    
    document.querySelector('.quantity-input').addEventListener('change', function() {
        currentQuantity = parseInt(this.value) || 1;
        this.value = currentQuantity;
    });
    
    // Botón añadir al carrito en el modal
    document.querySelector('.btn-add-to-cart').addEventListener('click', function() {
        if (currentDish) {
            addToCart(currentDish.id, currentQuantity);
        }
    });
    
    // Botón del carrito flotante
    cartFloating.addEventListener('click', function() {
        window.location.href = 'carrito.html';
    });
    
    // Botón de ir arriba
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
    
    // Header al hacer scroll
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Inicializar
    filterAndSortDishes();
    updateCart();
    
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
});

// Estilos para la notificación del carrito
const style = document.createElement('style');
style.textContent = `
    .cart-notification {
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--color-success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: var(--shadow-lg);
        z-index: 1100;
    }
    
    .cart-notification i {
        font-size: 1.25rem;
    }
`;
document.head.appendChild(style);