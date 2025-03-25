document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Ocultar preloader después de 1.5 segundos
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
    const fabBtn = document.querySelector('.fab-btn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            fabBtn.classList.add('visible');
        } else {
            fabBtn.classList.remove('visible');
        }
    });
    
    fabBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Filter and sort functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const categoryLinks = document.querySelectorAll('.category-link');
    const sortSelect = document.getElementById('sort-select');
    const articleCards = document.querySelectorAll('.article-card');
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        articleCards.forEach(card => {
            const title = card.querySelector('.article-title').textContent.toLowerCase();
            const excerpt = card.querySelector('.article-excerpt').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    
    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all links
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            const category = link.getAttribute('data-category');
            
            articleCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Sort function
    function sortArticles() {
        const sortBy = sortSelect.value;
        const articlesContainer = document.querySelector('.articles-grid');
        const articlesArray = Array.from(articleCards);
        
        articlesArray.sort((a, b) => {
            if (sortBy === 'recent') {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateB - dateA;
            } else if (sortBy === 'oldest') {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateA - dateB;
            } else if (sortBy === 'popular') {
                const viewsA = parseInt(a.getAttribute('data-views'));
                const viewsB = parseInt(b.getAttribute('data-views'));
                return viewsB - viewsA;
            } else if (sortBy === 'views') {
                const viewsA = parseInt(a.getAttribute('data-views'));
                const viewsB = parseInt(b.getAttribute('data-views'));
                return viewsB - viewsA;
            }
            return 0;
        });
        
        // Clear container
        articlesContainer.innerHTML = '';
        
        // Append sorted articles
        articlesArray.forEach(article => {
            articlesContainer.appendChild(article);
        });
    }
    
    sortSelect.addEventListener('change', sortArticles);
    
    // Popular articles click handler
    const popularLinks = document.querySelectorAll('.popular-link');
    
    popularLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const articleId = link.getAttribute('data-article');
            const article = document.getElementById(articleId);
            
            // Scroll to article
            article.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Highlight article temporarily
            article.style.boxShadow = '0 0 0 3px rgba(230, 57, 70, 0.5)';
            setTimeout(() => {
                article.style.boxShadow = 'var(--shadow-sm)';
            }, 2000);
        });
    });
    
    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            
            if (input.value && input.value.includes('@')) {
                // Here you would typically send the data to your server
                alert('¡Gracias por suscribirte! Pronto recibirás nuestras novedades.');
                input.value = '';
            } else {
                alert('Por favor ingresa un correo electrónico válido.');
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.article-card, .sidebar-widget');
        
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
    const articles = document.querySelectorAll('.article-card');
    const widgets = document.querySelectorAll('.sidebar-widget');
    
    articles.forEach((article, index) => {
        article.style.opacity = '0';
        article.style.transform = 'translateY(20px)';
        article.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    });
    
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        widget.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1 + 0.3}s`;
    });
    
    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Social media share buttons
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // In a real implementation, this would open share dialogs
            // For now, we'll just prevent default and show a message
            e.preventDefault();
            const platform = link.classList.contains('fb') ? 'Facebook' : 
                            link.classList.contains('ig') ? 'Instagram' :
                            link.classList.contains('wa') ? 'WhatsApp' : 'YouTube';
            alert(`Compartiendo en ${platform} (simulado)`);
        });
    });
});