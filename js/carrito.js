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
    
    // Variables globales
    let cart = [];
    const shippingCost = 5.00;
    
    // Elementos del DOM
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountElement = document.getElementById('cart-count');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const clearCartBtn = document.getElementById('clear-cart');
    const checkoutBtn = document.getElementById('checkout');
    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const modal = document.getElementById('confirmation-modal');
    const modalItems = document.getElementById('modal-items');
    const modalTotal = document.getElementById('modal-total');
    const confirmOrderBtn = document.getElementById('confirm-order');
    const closeModalBtn = document.querySelector('.close-modal');
    const notification = document.getElementById('notification');
    
    // Función para agregar producto al carrito
    function addToCart(event) {
        const productElement = event.target.closest('.product-card');
        const productId = productElement.getAttribute('data-id');
        const productName = productElement.getAttribute('data-nombre');
        const productPrice = parseFloat(productElement.getAttribute('data-precio'));
        
        // Verificar si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }
        
        updateCart();
        showNotification(`${productName} agregado al carrito`, 'success');
        
        // Animación de "agregado al carrito"
        const button = event.target.closest('button');
        button.innerHTML = '<i class="fas fa-check"></i> Agregado';
        button.style.backgroundColor = 'var(--color-success)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-plus"></i> Agregar';
            button.style.backgroundColor = 'var(--color-primary)';
        }, 2000);
    }
    
    // Función para actualizar el carrito en la UI
    function updateCart() {
        // Limpiar el contenedor
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-basket"></i>
                    <p>Tu carrito está vacío</p>
                </div>
            `;
        } else {
            cart.forEach(item => {
                const cartItemElement = document.createElement('div');
                cartItemElement.className = 'cart-item';
                cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">S/. ${item.price.toFixed(2)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="decrease-quantity" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-quantity" data-id="${item.id}">+</button>
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItemsContainer.appendChild(cartItemElement);
            });
        }
        
        // Actualizar contador
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        
        // Actualizar totales
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + shippingCost;
        
        subtotalElement.textContent = `S/. ${subtotal.toFixed(2)}`;
        shippingElement.textContent = `S/. ${shippingCost.toFixed(2)}`;
        totalElement.textContent = `S/. ${total.toFixed(2)}`;
        
        // Habilitar/deshabilitar botones
        clearCartBtn.disabled = cart.length === 0;
        checkoutBtn.disabled = cart.length === 0;
    }
    
    // Función para manejar eventos de cantidad
    function handleQuantityChange(event) {
        const button = event.target.closest('button');
        if (!button) return;
        
        const productId = button.getAttribute('data-id');
        const item = cart.find(item => item.id === productId);
        
        if (button.classList.contains('increase-quantity')) {
            item.quantity += 1;
        } else if (button.classList.contains('decrease-quantity')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // Si la cantidad es 1 y se presiona disminuir, eliminar el producto
                cart = cart.filter(item => item.id !== productId);
                showNotification(`${item.name} eliminado del carrito`, 'error');
            }
        }
        
        updateCart();
    }
    
    // Función para eliminar producto del carrito
    function removeItem(event) {
        const button = event.target.closest('.cart-item-remove');
        if (!button) return;
        
        const productId = button.getAttribute('data-id');
        const item = cart.find(item => item.id === productId);
        
        cart = cart.filter(item => item.id !== productId);
        showNotification(`${item.name} eliminado del carrito`, 'error');
        updateCart();
    }
    
    // Función para vaciar el carrito
    function clearCart() {
        cart = [];
        updateCart();
        showNotification('Carrito vaciado', 'warning');
    }
    
    // Función para mostrar el modal de confirmación
    function showCheckoutModal() {
        modalItems.innerHTML = '';
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const total = subtotal + shippingCost;
        
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'modal-item';
            itemElement.innerHTML = `
                <span>${item.name} x ${item.quantity}</span>
                <span>S/. ${(item.price * item.quantity).toFixed(2)}</span>
            `;
            modalItems.appendChild(itemElement);
        });
        
        modalTotal.textContent = `S/. ${total.toFixed(2)}`;
        modal.style.display = 'flex';
    }
    
    // Función para confirmar el pedido
    function confirmOrder() {
        showNotification(`Pedido confirmado por S/. ${modalTotal.textContent}`, 'success');
        modal.style.display = 'none';
        
        // Simular redirección después de 2 segundos
        setTimeout(() => {
            window.location.href = 'gracias.html';
        }, 2000);
        
        // Aquí normalmente enviarías el pedido al servidor
        // Por ahora solo limpiamos el carrito
        clearCart();
    }
    
    // Función para mostrar notificaciones
    function showNotification(message, type = 'info') {
        notification.textContent = message;
        notification.className = 'notification';
        notification.classList.add(type, 'show');
        
        // Ocultar notificación después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    // Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    cartItemsContainer.addEventListener('click', function(event) {
        handleQuantityChange(event);
        removeItem(event);
    });
    
    clearCartBtn.addEventListener('click', clearCart);
    checkoutBtn.addEventListener('click', showCheckoutModal);
    confirmOrderBtn.addEventListener('click', confirmOrder);
    closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
    
    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Inicializar carrito
    updateCart();
    
    // Efecto hover en tarjetas de producto
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
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