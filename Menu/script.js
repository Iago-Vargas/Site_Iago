const mensagens = [
    "Estudante de Ciência da Computação",
    "com objetivo de me desenvolver",
    "e me divertir fazendo o que amo!",
    "Este site foi desenvolvido por mim",
    "para mostrar meus projetos",
    "mostrar meus jogos, mini-games,",
    "e muitos projetos futuros.",
    "Sinta-se à vontade para explorar!",
    "Espero que goste! :)"
];
document.addEventListener('DOMContentLoaded', () => {
    binaryToTextEffect("typing-text", ["Bem Vindo!", "Me chamo Iago", ":)"], 100);
    binaryToTextEffect("typing-text2", ["Linguagens","Programação"], 100);
    binaryToTextEffect("typing-text3", mensagens, 100);
});

/**
 * Efeito que começa como binário e transforma os números em letras progressivamente.
 * @param {string} elementId - ID do elemento onde o texto será exibido
 * @param {Array} lines - Array de strings representando cada linha do texto
 * @param {number} delay - Tempo entre cada transformação (ms)
 */
function binaryToTextEffect(elementId, lines, delay = 100) {
    const element = document.getElementById(elementId);
    let binaryLines = lines.map(line => line.split('').map(() => (Math.random() > 0.5 ? '0' : '1')).join(''));
    let currentIndex = 0;

    function revealText() {
        if (currentIndex < Math.max(...lines.map(line => line.length))) {
            let tempLines = binaryLines.map((binaryLine, i) => {
                let tempText = binaryLine.split('');
                
                // Mantém as letras já reveladas e altera apenas a próxima
                for (let j = 0; j <= currentIndex; j++) {
                    if (j < lines[i].length) {
                        tempText[j] = lines[i][j];
                    }
                }
                
                return tempText.join('');
            });

            element.innerHTML = tempLines.join('<br>')
            currentIndex++;

            setTimeout(revealText, delay);
        } else {
            // Após revelar o texto, começa a alternar as letras por números em loop
            startAlternatingText(element, lines);
        }
    }
    
    element.innerHTML = binaryLines.join('<br>'); // Exibe os textos em binário primeiro
    setTimeout(revealText, delay); // Começa a transformação para o texto real
}

/**
 * Função que alterna entre letras e números aleatórios em loop
 * @param {HTMLElement} element - Elemento onde o texto está sendo exibido
 * @param {Array} originalLines - O texto original que foi revelado
 */
function startAlternatingText(element, originalLines) {
    const lines = element.innerHTML.split('<br>');

    setInterval(() => {
        // Seleciona até 3 posições aleatórias para alternar
        let swaps = 0;
        const maxSwaps = 1;

        // Faz as alternâncias de números no texto
        while (swaps < maxSwaps) {
            const lineIndex = Math.floor(Math.random() * lines.length); // Escolhe uma linha aleatória
            const charIndex = Math.floor(Math.random() * lines[lineIndex].length); // Escolhe um caractere aleatório na linha

            // Alterna entre número e a letra original
            const originalChar = originalLines[lineIndex][charIndex]; // Pega o caractere original
            const currentChar = lines[lineIndex][charIndex]; // Pega o caractere atual exibido

            // Se o caractere atual for um número, volta para a letra original
            if (/\d/.test(currentChar)) {
                lines[lineIndex] = lines[lineIndex].substr(0, charIndex) + originalChar + lines[lineIndex].substr(charIndex + 1);
            } else {
                const randomNumber = Math.floor(Math.random() * 2); // Gera um número aleatório (0-9)
                lines[lineIndex] = lines[lineIndex].substr(0, charIndex) + randomNumber + lines[lineIndex].substr(charIndex + 1);
            }
            swaps++;
        }

        element.innerHTML = lines.join('<br>'); // Atualiza o conteúdo com as trocas de números
    }, 10500000000); // Alterna as letras a cada 1500ms
}


// Código existente para o carrossel e partículas
let angle = 0;
const carousel = document.querySelector('.curved-carousel');
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;
const radius = 300; // Tamanho do raio do carrossel
let currentIndex = 0;
let isDragging = false;
let startX = 0;

function positionItems() {
    const angleIncrement = 360 / totalItems;

    items.forEach((item, index) => {
        const itemAngle = angle + angleIncrement * index;
        const x = Math.sin((itemAngle * Math.PI) / 180) * radius;
        const z = Math.cos((itemAngle * Math.PI) / 180) * radius;

        item.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${-itemAngle}deg)`;
        item.style.opacity = 1; // Garante que todas as imagens estejam visíveis
    });

    items.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function rotateCarousel(direction) {
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    angle -= 360 / totalItems * (direction === "next" ? 1 : -1);
    positionItems();
}
function showTextForCurrentItem() {
    // Esconde todos os textos
    document.querySelectorAll('.carousel-text').forEach(text => {
        text.style.display = 'none';
    });

    // Mostra o texto correspondente ao item ativo
    const currentText = document.querySelector('.carousel-item.active .carousel-text');
    if (currentText) {
        currentText.style.display = 'block';
    }
}

// Atualiza o carrossel e o texto
function rotateCarousel(direction) {
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    angle -= 360 / totalItems * (direction === "next" ? 1 : -1);
    positionItems();
    showTextForCurrentItem(); // Atualiza o texto ao trocar a imagem
}

// Inicializa o carrossel e mostra o texto para o primeiro item
positionItems();
showTextForCurrentItem();

// Suporte para arrastar no celular e no desktop
carousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const deltaX = startX - currentX;

    if (deltaX > 50) {
        rotateCarousel("next");
        isDragging = false;
    } else if (deltaX < -50) {
        rotateCarousel("prev");
        isDragging = false;
    }
});

carousel.addEventListener('mouseup', () => {
    isDragging = false;
});

carousel.addEventListener('mouseleave', () => {
    isDragging = false;
});

carousel.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});
carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = startX - currentX;

    // Permitir somente o movimento para a esquerda
    if (deltaX < -50) {
        rotateCarousel("prev"); // Somente mova para a esquerda
        isDragging = false;
    }
});


carousel.addEventListener('touchend', () => {
    isDragging = false;
});

// Adiciona botões de navegação para o carrossel
const nextButton = document.createElement('button');
nextButton.classList.add('carousel-button', 'next');
nextButton.innerHTML = '<i class="fas fa-chevron-left"></i>'; // Ícone de seta para a direita
nextButton.addEventListener('click', () => rotateCarousel('next'));

const prevButton = document.createElement('button');
prevButton.classList.add('carousel-button', 'prev');
prevButton.innerHTML = '<i class="fas fa-chevron-right"></i>'; // Ícone de seta para a esquerda
prevButton.addEventListener('click', () => rotateCarousel('prev'));

carousel.parentElement.appendChild(nextButton);
carousel.parentElement.appendChild(prevButton);

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
