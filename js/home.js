// home.js
document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector(".featured-products .product-grid");
    const productos = document.querySelectorAll(".featured-products .product");
    let currentIndex = 0;

    // Función para mostrar el siguiente producto
    function showNextProduct() {
        productos[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % productos.length;
        productos[currentIndex].style.display = "block";
    }

    // Mostrar el primer producto
    productos[currentIndex].style.display = "block";

    // Cambiar de producto cada 5 segundos
    setInterval(showNextProduct, 5000);
});