let angle = 0;
const carousel = document.querySelector('.curved-carousel');
const items = document.querySelectorAll('.carousel-item');
const radius = 300; 
let currentIndex = 0; 

function positionItems() {
    const totalItems = items.length;
    const angleIncrement = 360 / totalItems;

    items.forEach((item, index) => {
        const itemAngle = angle + angleIncrement * index;
        const x = Math.sin((itemAngle * Math.PI) / 180) * radius;
        const z = Math.cos((itemAngle * Math.PI) / 180) * radius;

        item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-itemAngle}deg)`;

        // Adiciona a classe 'active' apenas ao item em frente
        if (index === currentIndex) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function rotateCarousel(direction) {
    const totalItems = items.length;
    if (direction === "next") {
        currentIndex = (currentIndex + 1) % totalItems;
    } else {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    }

    angle -= 360 / totalItems * (direction === "next" ? 1 : -1);
    positionItems();
}

// Adiciona evento aos botões
document.getElementById('nextBtn').addEventListener('click', () => rotateCarousel("next"));
document.getElementById('prevBtn').addEventListener('click', () => rotateCarousel("prev"));

// Inicializa a posição
positionItems();
