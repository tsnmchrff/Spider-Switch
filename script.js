document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé");

  // Sélection des éléments
  const buttonBegin = document.querySelector(".button_begin");
  const buildingDuo = document.querySelector(".building_duo");
  const spiderman = document.querySelector(".sm_climb_left");
  const spiderweb = document.getElementById("spiderweb");
  const rodLeft = document.querySelector(".rod_left");
  const rodRight = document.querySelector(".rod_right");

  let positionBuildingDuo = 0;
  const speedBuildingDuo = 0.4;
  let animationActive = false;
  let gameStarted = false; // Bloque les animations avant le démarrage

  buildingDuo.style.transform = `translateY(${positionBuildingDuo}px)`;

  function hideButton() {
    if (buttonBegin) {
      console.log("Le Bouton est en train de disparaître...");
      buttonBegin.classList.add("hidden");
      gameStarted = true; // Le jeu démarre
    }
  }

  function animate() {
    if (animationActive) {
      positionBuildingDuo += speedBuildingDuo;
      if (positionBuildingDuo >= 1360) {
        console.log("Arrêt de l'animation de Spider-Man !");
        spiderman.src = "img/SM_climb_left_static.png";
        // Affichage de la div lorsqu'il s'arrête
        document.querySelector(".game_end").classList.add("visible");
        return;
      }
      buildingDuo.style.transform = `translateY(${positionBuildingDuo}px)`;
      requestAnimationFrame(animate);
    }
  }

  function startAnimation() {
    if (!animationActive) {
      console.log("Animation démarrée !");
      animationActive = true;
      animate();
    }
  }

  function startGame() {
    if (!gameStarted) {
      // Empêche de relancer plusieurs fois
      hideButton();
      startAnimation();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      // Détection de la barre espace
      event.preventDefault(); // Empêche le défilement de la page avec espace
      startGame();
    }
  });

  function updateSpiderwebPosition() {
    const spiderRect = spiderman.getBoundingClientRect();
    const centerX = spiderRect.left + spiderRect.width / 2;
    const centerY = spiderRect.top + spiderRect.height / 2;

    spiderweb.style.left = `${centerX}px`;
    spiderweb.style.top = `${centerY}px`;
  }

  document.addEventListener("click", function (event) {
    if (!gameStarted) return; // Blocage avant le démarrage

    updateSpiderwebPosition();

    const angleMatch = spiderweb.style.transform.match(
      /rotate\(([-0-9.]+)rad\)/
    );
    const length = parseFloat(spiderweb.style.width);

    if (!angleMatch || isNaN(length) || length === 0) return;

    const rotationAngle = parseFloat(angleMatch[1]);

    const finalX =
      parseFloat(spiderweb.style.left) + Math.cos(rotationAngle) * length;
    const finalY =
      parseFloat(spiderweb.style.top) + Math.sin(rotationAngle) * length;

    spiderman.style.left = `${finalX - spiderman.clientWidth / 2}px`;
    spiderman.style.top = `${finalY - spiderman.clientHeight / 2}px`;

    setTimeout(updateSpiderwebPosition, 600);
  });

  document.addEventListener("mousemove", (event) => {
    if (!gameStarted) return; // Blocage avant le démarrage

    updateSpiderwebPosition();

    const spiderRect = spiderman.getBoundingClientRect();
    const originX = spiderRect.left + spiderRect.width / 2;
    const originY = spiderRect.top + spiderRect.height / 2;

    const rodLeftRect = rodLeft.getBoundingClientRect();
    const rodRightRect = rodRight.getBoundingClientRect();

    const rodLeftX = rodLeftRect.right;
    const rodRightX = rodRightRect.left;
    const rodY1 = Math.min(rodLeftRect.top, rodRightRect.top);
    const rodY2 = Math.max(rodLeftRect.bottom, rodRightRect.bottom);

    const angle = Math.atan2(event.clientY - originY, event.clientX - originX);
    const m = Math.tan(angle);
    const b = originY - m * originX;

    const intersectYLeft = m * rodLeftX + b;
    const intersectYRight = m * rodRightX + b;

    let maxDistance;

    if (event.clientX < originX) {
      if (intersectYLeft >= rodY1 && intersectYLeft <= rodY2) {
        maxDistance = Math.hypot(rodLeftX - originX, intersectYLeft - originY);
      } else {
        maxDistance = Math.hypot(
          event.clientX - originX,
          event.clientY - originY
        );
      }
    } else {
      if (intersectYRight >= rodY1 && intersectYRight <= rodY2) {
        maxDistance = Math.hypot(
          rodRightX - originX,
          intersectYRight - originY
        );
      } else {
        maxDistance = Math.hypot(
          event.clientX - originX,
          event.clientY - originY
        );
      }
    }

    spiderweb.style.width = `${maxDistance}px`;
    spiderweb.style.transform = `rotate(${angle}rad)`;
  });

  updateSpiderwebPosition();
  document.body.style.cursor = "none";

  // Ajout de la pluie de feu (GIFs pouvant être à gauche de .rod_left et à droite de .rod_right)
  const rainContainer = document.createElement("div");
  rainContainer.id = "rainContainer";
  document.body.appendChild(rainContainer);

  class Raindrop {
    constructor() {
      if (!gameStarted) return;

      this.element = document.createElement("img");
      this.element.src = "img/rain_fireball.gif";
      this.element.classList.add("raindrop");

      const screenWidth = window.innerWidth;
      const randomX = Math.random() * screenWidth; // Peut apparaître partout sur l'écran
      this.element.style.left = `${randomX}px`;
      this.element.style.top = "-50px";

      rainContainer.appendChild(this.element);
      this.fall();
    }

    fall() {
      const duration = Math.random() * 3 + 3; // Chute entre 3 et 6 secondes
      this.element.style.animationDuration = `${duration}s`;

      setTimeout(() => {
        this.element.remove();
      }, duration * 1000);
    }
  }

  function createRaindrops(number) {
    if (!gameStarted) return; // Blocage avant le démarrage

    const maxRaindrops = 1; // Limite max de boules de feu en même temps
    const currentRaindrops = document.querySelectorAll(".raindrop").length;

    if (currentRaindrops < maxRaindrops) {
      for (let i = 0; i < number; i++) {
        setTimeout(() => new Raindrop(), i * 500);
      }
    }
  }

  setInterval(() => {
    createRaindrops(10);
    checkCollision(spiderman, document.querySelectorAll(".raindrop"));
  }, 1500);

  window.addEventListener("resize", () => {
    document.querySelectorAll(".raindrop").forEach((drop) => drop.remove());
  });

  function checkCollision(spiderman, fireballs) {
    const spidermanRect = spiderman.getBoundingClientRect();

    fireballs.forEach((fireball) => {
      const fireballRect = fireball.getBoundingClientRect();

      if (
        spidermanRect.left < fireballRect.right &&
        spidermanRect.right > fireballRect.left &&
        spidermanRect.top < fireballRect.bottom &&
        spidermanRect.bottom > fireballRect.top
      ) {
        console.log("Collision détectée !");
        window.location.href = "game_over.html";
      }
    });
  }
  document.addEventListener("click", function (event) {
    console.log("Spider-Man X:", spiderman.offsetLeft); //pour voir où Spider-Man se positionne lorsqu'il bouge
  });
});
