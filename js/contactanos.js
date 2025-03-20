// contactanos.js
document.addEventListener("DOMContentLoaded", function () {
    const contactoForm = document.getElementById("contactoForm");
    const successMessage = document.getElementById("success-message");

    contactoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Simulación de envío de formulario
        successMessage.classList.remove("hidden");

        // Limpiar el formulario
        contactoForm.reset();

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            successMessage.classList.add("hidden");
        }, 3000);
    });
});