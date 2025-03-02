const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");

// Assure que la pluie est en arrière-plan
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.zIndex = "-1";

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const raindrops = [];

class Raindrop {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 25 + 15; // Gouttes plus longues
    this.speed = Math.random() * 8 + 4; // 🚀 Vitesse augmentée
    this.opacity = Math.random() * 0.5 + 0.3;
    this.width = Math.random() * 1.5 + 0.6; // Gouttes légèrement plus épaisses
    this.blur = Math.random() * 2; // Effet de flou léger
  }

  fall() {
    this.y += this.speed;

    if (this.y > canvas.height) {
      this.y = -this.length;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
    ctx.lineWidth = this.width;
    ctx.lineCap = "round";
    ctx.filter = `blur(${this.blur}px)`;
    ctx.stroke();
    ctx.filter = "none";
  }
}

function createRaindrops(number) {
  raindrops.length = 0;
  for (let i = 0; i < number; i++) {
    raindrops.push(new Raindrop());
  }
}

// **Animation fluide avec traînée plus légère pour ne pas cacher les éléments**
function animateRain() {
  ctx.fillStyle = "rgba(30, 59, 69, 0.05)"; // Traînée plus légère
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  raindrops.forEach((drop) => {
    drop.fall();
    drop.draw();
  });

  requestAnimationFrame(animateRain);
}

createRaindrops(200);
animateRain();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  createRaindrops(200);
});
