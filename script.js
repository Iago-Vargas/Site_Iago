let angle = 0;
const carousel = document.querySelector('.curved-carousel');
const items = document.querySelectorAll('.carousel-item');
<<<<<<< HEAD
const totalItems = items.length;
const radius = 250; // Tamanho do raio do carrossel
let currentIndex = 0;
let isDragging = false;
let startX = 0;

function positionItems() {
=======
const radius = 300; 
let currentIndex = 0; 

function positionItems() {
    const totalItems = items.length;
>>>>>>> 756818250e18570c900deefb679c1a57d9ecf05a
    const angleIncrement = 360 / totalItems;

    items.forEach((item, index) => {
        const itemAngle = angle + angleIncrement * index;
        const x = Math.sin((itemAngle * Math.PI) / 180) * radius;
        const z = Math.cos((itemAngle * Math.PI) / 180) * radius;

<<<<<<< HEAD
        item.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${-itemAngle}deg)`;
        item.style.opacity = 1; // Garante que todas as imagens estejam visíveis
    });

    items.forEach((item, index) => {
=======
        item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-itemAngle}deg)`;

        // Adiciona a classe 'active' apenas ao item em frente
>>>>>>> 756818250e18570c900deefb679c1a57d9ecf05a
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function rotateCarousel(direction) {
<<<<<<< HEAD
=======
    const totalItems = items.length;
>>>>>>> 756818250e18570c900deefb679c1a57d9ecf05a
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    angle -= 360 / totalItems * (direction === "next" ? 1 : -1);
    positionItems();
}

<<<<<<< HEAD
document.getElementById('nextBtn').addEventListener('click', () => rotateCarousel("next"));
document.getElementById('prevBtn').addEventListener('click', () => rotateCarousel("prev"));

// Inicializa o carrossel
positionItems();

// Suporte para arrastar no celular
carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = startX - currentX;

    if (deltaX > 50) {
        rotateCarousel("next");
        isDragging = false;
    } else if (deltaX < -50) {
        rotateCarousel("prev");
        isDragging = false;
    }
});

carousel.addEventListener('touchend', () => {
    isDragging = false;
});

/*particulas */

particlesJS('particles-js', {
    particles: {
        number: {
            value: 100,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#ffffff'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            },
            polygon: {
                nb_sides: 5
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: false, // Desativa as linhas entre as partículas
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1,
                    color: '#0000ff' // Define a cor da linha que segue o mouse como azul
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
});
=======
// Adiciona evento aos botões
document.getElementById('nextBtn').addEventListener('click', () => rotateCarousel("next"));
document.getElementById('prevBtn').addEventListener('click', () => rotateCarousel("prev"));

// Inicializa a posição
positionItems();
>>>>>>> 756818250e18570c900deefb679c1a57d9ecf05a
