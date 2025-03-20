document.addEventListener("DOMContentLoaded", function () {
    // Funcionalidad para abrir y cerrar modales
    const modals = document.querySelectorAll(".modal");
    const modalLinks = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll(".close");

    modalLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const modalId = link.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            modal.style.display = "flex";
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            modal.style.display = "none";
        });
    });

    // Funcionalidad para filtrar artículos
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const orderFilter = document.getElementById("order-filter");
    const articles = document.querySelectorAll(".article");

    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const order = orderFilter.value;

        articles.forEach((article) => {
            const title = article.querySelector("h2").textContent.toLowerCase();
            const articleCategory = article.getAttribute("data-category");

            const matchesSearch = title.includes(searchTerm);
            const matchesCategory = category === "" || articleCategory === category;

            if (matchesSearch && matchesCategory) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });

        // Ordenar artículos
        const sortedArticles = Array.from(articles).sort((a, b) => {
            const dateA = new Date(a.querySelector(".meta").textContent.split(" ")[2]);
            const dateB = new Date(b.querySelector(".meta").textContent.split(" ")[2]);

            if (order === "fecha-asc") return dateA - dateB;
            if (order === "fecha-desc") return dateB - dateA;
            return 0;
        });

        // Reorganizar artículos en el DOM
        const articlesContainer = document.querySelector(".article-list");
        sortedArticles.forEach((article) => articlesContainer.appendChild(article));
    }

    // Event listeners
    searchInput.addEventListener("input", filterArticles);
    categoryFilter.addEventListener("change", filterArticles);
    orderFilter.addEventListener("change", filterArticles);
});