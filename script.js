// Seleccionamos el canvas del fondo para simular luciérnagas / micro-LEDs cálidos
const lienzo = document.getElementById('fondo-particulas');
const contexto = lienzo.getContext('2d');

let ancho, alto;
let luciernagas = [];

// Tonos cálidos de micro-LED / luciérnaga con un toque de savia
const tonosCalidos = ['#FFD166', '#FFC43D', '#FF9F1C', '#E9F5A6'];

function ajustarPantalla() {
    ancho = lienzo.width = window.innerWidth;
    alto = lienzo.height = window.innerHeight;
}

function crearLuciernagas() {
    luciernagas = [];
    const cantidad = 38;

    for (let i = 0; i < cantidad; i++) {
        luciernagas.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            // Deriva lenta, como flotando en el aire o posándose entre ramas
            velocidadX: (Math.random() - 0.5) * 0.22,
            velocidadY: (Math.random() - 0.5) * 0.22,
            radio: Math.random() * 2.2 + 1.1,
            color: tonosCalidos[Math.floor(Math.random() * tonosCalidos.length)],
            // Parámetros para el parpadeo orgánico tipo luciérnaga / micro-LED
            fase: Math.random() * Math.PI * 2,
            velocidadParpadeo: Math.random() * 0.025 + 0.01
        });
    }
}

function animar() {
    contexto.clearRect(0, 0, ancho, alto);

    for (let i = 0; i < luciernagas.length; i++) {
        let l = luciernagas[i];

        // Movimiento suave y errático leve
        l.x += l.velocidadX + Math.sin(l.fase * 0.5) * 0.08;
        l.y += l.velocidadY + Math.cos(l.fase * 0.5) * 0.08;
        l.fase += l.velocidadParpadeo;

        // Si salen de la pantalla, reaparecen del lado opuesto sin rebotar brusco
        if (l.x < -20) l.x = ancho + 20;
        if (l.x > ancho + 20) l.x = -20;
        if (l.y < -20) l.y = alto + 20;
        if (l.y > alto + 20) l.y = -20;

        // Parpadeo suave (entre 0.05 y 0.85 de opacidad)
        const brillo = (Math.sin(l.fase) + 1) / 2;
        const opacidadActual = 0.08 + brillo * 0.75;

        contexto.save();
        contexto.globalAlpha = opacidadActual;
        contexto.shadowBlur = 10 + brillo * 10;
        contexto.shadowColor = l.color;

        // Halo cálido alrededor del punto
        const gradiente = contexto.createRadialGradient(l.x, l.y, 0, l.x, l.y, l.radio * 4);
        gradiente.addColorStop(0, l.color);
        gradiente.addColorStop(1, 'rgba(255, 209, 102, 0)');

        contexto.beginPath();
        contexto.arc(l.x, l.y, l.radio * 4, 0, Math.PI * 2);
        contexto.fillStyle = gradiente;
        contexto.fill();

        // Núcleo brillante del micro-LED / luciérnaga
        contexto.beginPath();
        contexto.arc(l.x, l.y, l.radio * 0.7, 0, Math.PI * 2);
        contexto.fillStyle = '#FFF8DC';
        contexto.fill();

        contexto.restore();
    }

    requestAnimationFrame(animar);
}

window.addEventListener('resize', () => {
    ajustarPantalla();
    crearLuciernagas();
});

ajustarPantalla();
crearLuciernagas();
animar();

const audioFondo = document.getElementById("audio-fondo");
const botonAudio = document.getElementById("boton-audio");

// Intentar reproducir la música automáticamente al abrir la página
audioFondo.play()
    .then(function () {
        botonAudio.textContent = "♫";
        botonAudio.setAttribute("aria-label", "Pausar música");
    })
    .catch(function (error) {
        console.log("El navegador bloqueó la reproducción automática");
    });

// Botón para pausar o reanudar la música
botonAudio.addEventListener("click", function () {
    if (audioFondo.paused) {
        audioFondo.play();
        botonAudio.textContent = "♫";
        botonAudio.setAttribute("aria-label", "Pausar música");
    } else {
        audioFondo.pause();
        botonAudio.textContent = "♪";
        botonAudio.setAttribute("aria-label", "Reproducir música");
    }
});
