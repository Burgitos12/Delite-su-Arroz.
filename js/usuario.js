document.addEventListener('DOMContentLoaded', function() {
    // Datos del usuario (simulados)
    const userData = {
        name: "Carlos Mendoza",
        email: "carlos@example.com",
        phone: "+1 234 567 890",
        address: "Calle Principal 123, Ciudad",
        joinDate: "Enero 2023",
        avatar: "https://i.pravatar.cc/150?img=5",
        stats: {
            orders: 24,
            favorites: 18,
            rewards: 5
        }
    };

    // Elementos del DOM
    const DOM = {
        // Sidebar
        sidebar: document.querySelector('.sidebar'),
        menuItems: document.querySelectorAll('.menu li'),
        logoutBtn: document.getElementById('logout'),
        
        // Header
        userName: document.querySelector('.user-name'),
        userBadge: document.querySelector('.user-badge'),
        
        // Profile Section
        userFullname: document.getElementById('user-fullname'),
        userEmail: document.getElementById('user-email'),
        userPhone: document.getElementById('user-phone'),
        userAddress: document.getElementById('user-address'),
        userAvatar: document.getElementById('user-avatar'),
        changeAvatarBtn: document.getElementById('change-avatar'),
        memberSince: document.querySelector('.member-since span'),
        
        // Stats
        statValues: document.querySelectorAll('.stat-value'),
        
        // Action Buttons
        editProfileBtn: document.getElementById('edit-profile'),
        orderHistoryBtn: document.getElementById('order-history'),
        paymentMethodsBtn: document.getElementById('payment-methods'),
        securitySettingsBtn: document.getElementById('security-settings'),
        
        // Sections
        contentSections: document.querySelectorAll('.content-section'),
        
        // Modal
        modalOverlay: document.getElementById('modal-overlay'),
        modalContainer: document.getElementById('modal-container'),
        modalContent: document.getElementById('modal-content'),
        closeModalBtn: document.getElementById('close-modal')
    };

    // Inicialización
    function init() {
        loadUserData();
        setupEventListeners();
        animateElements();
    }

    // Cargar datos del usuario
    function loadUserData() {
        DOM.userName.textContent = userData.name;
        DOM.userFullname.textContent = userData.name;
        DOM.userEmail.textContent = userData.email;
        DOM.userPhone.textContent = userData.phone;
        DOM.userAddress.textContent = userData.address;
        DOM.memberSince.textContent = userData.joinDate;
        DOM.userAvatar.querySelector('img').src = userData.avatar;
        
        // Actualizar estadísticas
        DOM.statValues[0].textContent = userData.stats.orders;
        DOM.statValues[1].textContent = userData.stats.favorites;
        DOM.statValues[2].textContent = userData.stats.rewards;
    }

    // Configurar event listeners
    function setupEventListeners() {
        // Menú de navegación
        DOM.menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const section = this.getAttribute('data-section');
                switchSection(section);
                
                // Actualizar estado activo
                DOM.menuItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Cerrar sesión
        DOM.logoutBtn.addEventListener('click', confirmLogout);

        // Cambiar avatar
        DOM.changeAvatarBtn.addEventListener('click', openAvatarModal);

        // Botones de acción
        DOM.editProfileBtn.addEventListener('click', () => openModal('Editar Perfil', getEditProfileForm()));
        DOM.orderHistoryBtn.addEventListener('click', () => openModal('Historial de Pedidos', '<p>Aquí iría el historial de pedidos...</p>'));
        DOM.paymentMethodsBtn.addEventListener('click', () => openModal('Métodos de Pago', '<p>Aquí irían los métodos de pago...</p>'));
        DOM.securitySettingsBtn.addEventListener('click', () => openModal('Configuración de Seguridad', '<p>Aquí irían las opciones de seguridad...</p>'));

        // Cerrar modal
        DOM.closeModalBtn.addEventListener('click', closeModal);
        DOM.modalOverlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal();
        });
    }

    // Cambiar sección
    function switchSection(sectionId) {
        DOM.contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        document.getElementById(`${sectionId}-section`).classList.add('active');
    }

    // Confirmar cierre de sesión
    function confirmLogout() {
        Swal.fire({
            title: '¿Cerrar sesión?',
            text: "¿Estás seguro de que deseas salir de tu cuenta?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#e63946',
            cancelButtonColor: '#2b2d42',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'Cancelar',
            background: '#121212',
            color: '#f8f9fa',
            backdrop: `
                rgba(10, 10, 10, 0.8)
                url("/images/rice-spoon.gif")
                left top
                no-repeat
            `
        }).then((result) => {
            if (result.isConfirmed) {
                // Simular cierre de sesión
                Swal.fire({
                    title: 'Sesión cerrada',
                    text: 'Has salido de tu cuenta correctamente',
                    icon: 'success',
                    confirmButtonColor: '#e63946',
                    background: '#121212',
                    color: '#f8f9fa'
                }).then(() => {
                    // Redirigir al login (simulado)
                    window.location.href = 'login.html';
                });
            }
        });
    }

    // Modal para cambiar avatar
    function openAvatarModal() {
        const content = `
            <div class="avatar-modal-content">
                <h3>Cambiar foto de perfil</h3>
                <div class="avatar-options">
                    <div class="avatar-option selected">
                        <img src="https://i.pravatar.cc/150?img=5" alt="Avatar 1">
                    </div>
                    <div class="avatar-option">
                        <img src="https://i.pravatar.cc/150?img=10" alt="Avatar 2">
                    </div>
                    <div class="avatar-option">
                        <img src="https://i.pravatar.cc/150?img=15" alt="Avatar 3">
                    </div>
                    <div class="avatar-option">
                        <img src="https://i.pravatar.cc/150?img=20" alt="Avatar 4">
                    </div>
                </div>
                <div class="upload-option">
                    <label class="upload-btn">
                        <input type="file" id="avatar-upload" accept="image/*">
                        Subir foto personalizada
                    </label>
                </div>
                <button class="save-avatar-btn" id="save-avatar">Guardar Cambios</button>
            </div>
        `;
        
        openModal('Cambiar Avatar', content);
        
        // Configurar eventos para el modal de avatar
        const options = document.querySelectorAll('.avatar-option');
        const uploadInput = document.getElementById('avatar-upload');
        const saveBtn = document.getElementById('save-avatar');
        
        let selectedAvatar = userData.avatar;
        
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedAvatar = this.querySelector('img').src;
            });
        });
        
        uploadInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    selectedAvatar = event.target.result;
                    options.forEach(opt => opt.classList.remove('selected'));
                }
                reader.readAsDataURL(file);
            }
        });
        
        saveBtn.addEventListener('click', function() {
            userData.avatar = selectedAvatar;
            DOM.userAvatar.querySelector('img').src = selectedAvatar;
            
            Swal.fire({
                title: '¡Avatar actualizado!',
                icon: 'success',
                confirmButtonColor: '#e63946',
                background: '#121212',
                color: '#f8f9fa'
            });
            
            closeModal();
        });
    }

    // Formulario de edición de perfil
    function getEditProfileForm() {
        return `
            <form id="edit-profile-form">
                <div class="form-group">
                    <label for="edit-name">Nombre completo</label>
                    <input type="text" id="edit-name" value="${userData.name}">
                </div>
                
                <div class="form-group">
                    <label for="edit-email">Correo electrónico</label>
                    <input type="email" id="edit-email" value="${userData.email}">
                </div>
                
                <div class="form-group">
                    <label for="edit-phone">Teléfono</label>
                    <input type="tel" id="edit-phone" value="${userData.phone}">
                </div>
                
                <div class="form-group">
                    <label for="edit-address">Dirección</label>
                    <textarea id="edit-address">${userData.address}</textarea>
                </div>
                
                <button type="submit" class="save-profile-btn">Guardar Cambios</button>
            </form>
        `;
    }

    // Funciones para manejar el modal
    function openModal(title, content) {
        DOM.modalContent.innerHTML = `
            <h2>${title}</h2>
            ${content}
        `;
        DOM.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        DOM.modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Animaciones iniciales
    function animateElements() {
        // Efecto de escritura en el nombre de usuario
        const name = DOM.userName.textContent;
        DOM.userName.textContent = '';
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < name.length) {
                DOM.userName.textContent += name.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
        
        // Efecto de aparición en las tarjetas
        setTimeout(() => {
            DOM.userBadge.classList.add('animate__pulse');
        }, 1500);
    }

    // Inicializar la aplicación
    init();
});