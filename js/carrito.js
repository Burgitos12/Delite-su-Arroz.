// Variables globales
let carrito = [];
let total = 0;

// Seleccionar elementos del DOM
const listaCarrito = document.getElementById('lista-carrito');
const totalElement = document.getElementById('total');
const botonesAgregar = document.querySelectorAll('.btn-agregar');
const botonVaciar = document.getElementById('vaciar-carrito');
const botonPagar = document.getElementById('pagar');

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const producto = event.target.closest('.producto');
    const id = producto.getAttribute('data-id');
    const nombre = producto.getAttribute('data-nombre');
    const precio = parseFloat(producto.getAttribute('data-precio'));

    // Verificar si el producto ya está en el carrito
    const productoEnCarrito = carrito.find(item => item.id === id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    // Actualizar el carrito
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    // Limpiar la lista del carrito
    listaCarrito.innerHTML = '';

    // Calcular el total
    total = 0;

    // Recorrer los productos en el carrito
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.nombre} - S/. ${item.precio.toFixed(2)} x ${item.cantidad}
            <button onclick="eliminarDelCarrito('${item.id}')">Eliminar</button>
        `;
        listaCarrito.appendChild(li);

        // Sumar al total
        total += item.precio * item.cantidad;
    });

    // Actualizar el total
    totalElement.textContent = `S/. ${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    actualizarCarrito();
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
}

// Función para pagar
function pagar() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
    } else {
        alert(`Gracias por tu compra. Total: S/. ${total.toFixed(2)}`);
        vaciarCarrito();
    }
}

// Event Listeners
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});

botonVaciar.addEventListener('click', vaciarCarrito);
botonPagar.addEventListener('click', pagar);