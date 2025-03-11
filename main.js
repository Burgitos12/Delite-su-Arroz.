//juego
// Genera un número aleatorio entre 1 y 10
const numeroSecreto = Math.floor(Math.random() * 10) + 1;

// Se establece el número de intentos disponibles
let intentos = 3;

// Bucle que se ejecuta mientras haya intentos disponibles
while (intentos > 0) {
    // Solicita al usuario un número
    let entrada = prompt(`Adivina el número (entre 1 y 10). Te quedan ${intentos} intentos:`);

    // Convierte la entrada en un número entero
    let numeroUsuario = parseInt(entrada);

    // Verifica si la entrada es un número válido
    if (isNaN(numeroUsuario)) {
        alert("Por favor, ingresa un número válido.");
        continue; // Repite la iteración sin descontar intentos
    }

    // Verifica que el número esté dentro del rango permitido
    if (numeroUsuario < 1 || numeroUsuario > 10) {
        alert("El número debe estar entre 1 y 10.");
        continue; // Repite la iteración sin descontar intentos
    }

    // Comprueba si el número ingresado es el correcto
    if (numeroUsuario === numeroSecreto) {
        alert("¡Felicidades! Adivinaste el número.");
        break; // Termina el juego si el usuario acierta
    } else {
        // Resta un intento al usuario
        intentos--;

        // Informa al usuario si le quedan intentos o si ha perdido
        if (intentos > 0) {
            alert(`Número incorrecto. Te quedan ${intentos} intentos.`);
        } else {
            alert(`Se agotaron los intentos. El número secreto era ${numeroSecreto}.`);
        }
    }
}

