// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animación de aparición al hacer scroll
const elementos = document.querySelectorAll('.nuestra-historia, .mision-vision, .compromiso, .equipo, .testimonios, .cta');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

elementos.forEach(el => observer.observe(el));

// Efecto de movimiento en el fondo del footer y cta
const cta = document.querySelector('.cta');
const footer = document.querySelector('.footer');

const moveBackground = (element) => {
    let posX = 0;
    let posY = 0;
    const speed = 0.5;

    const animate = () => {
        posX += speed;
        posY += speed;
        element.style.backgroundPosition = `${posX}px ${posY}px`;
        requestAnimationFrame(animate);
    };

    animate();
};

moveBackground(cta);
moveBackground(footer);

// particles.js config
particlesJS("particles-js", {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800,
            },
        },
        color: {
            value: "#ff0000", // Color rojo
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: 0.5,
            random: true,
        },
        size: {
            value: 3,
            random: true,
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff0000",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 3,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse",
            },
            onclick: {
                enable: true,
                mode: "push",
            },
            resize: true,
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4,
            },
            push: {
                particles_nb: 4,
            },
        },
    },
    retina_detect: true,
});

