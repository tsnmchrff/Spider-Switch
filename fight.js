document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM chargé");

  const progressBar = document.getElementById("SM-progress");
  const containerSpace = document.getElementById("container_space");
  const startButton = document.getElementById("startButton");
  const smPosition = document.querySelector(".SM_position"); // Sélectionne Spider-Man
  const venomPosition = document.querySelector(".venom_position");

  let progress = 2.5;
  const progressStep = 5;
  const maxProgress = 100;
  const decayRate = 2;
  let gameActive = false;
  let decayInterval;

  function updateProgressBar() {
    progress = Math.max(0, Math.min(progress, maxProgress));
    progressBar.style.width = progress + "%";

    if (progress >= maxProgress) {
      showVictoryMessage();
    } else if (progress <= 0) {
      showDefeatMessage();
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      event.preventDefault();

      if (!gameActive) {
        startGame();
      } else {
        progress += progressStep;
        updateProgressBar();

        // Ajoute la classe pour changer l’image de Spider-Man
        smPosition.classList.add("SM_fight");
        // Changement d'image pour Venom (il répond au coup)
        venomPosition.classList.add("venom_fight");

        // Retire la classe après 200ms pour revenir à l'image normale
        setTimeout(() => {
          smPosition.classList.remove("SM_position");
          smPosition.classList.add("SM_fight"); // Ajoute l'image finale après le coup
          venomPosition.classList.remove("venom_position");
          venomPosition.classList.add("venom_fight"); // Retour à la position normale
        }, 200);

        // Retire "SM_power" après encore 200ms (total 400ms) pour revenir à l'image de base
        setTimeout(() => {
          smPosition.classList.remove("SM_position");
          smPosition.classList.remove("venom_position"); //A RETIRER
        }, 400);
      }
    }
  });

  function startGame() {
    startButton.classList.add("hidden");
    gameActive = true;
    startDecay();
  }

  function showVictoryMessage() {
    gameActive = false;
    clearInterval(decayInterval);
    displayMessage("Bravo, tu as gagné !", "victory-message");

    setTimeout(() => {
      resetGame();
    }, 3000);
  }

  function showDefeatMessage() {
    if (!gameActive) return;
    gameActive = false;
    clearInterval(decayInterval);
    displayMessage("Tu as perdu !", "defeat-message");

    setTimeout(() => {
      resetGame();
    }, 3000);
  }

  function displayMessage(text, className) {
    const message = document.createElement("div");
    message.textContent = text;
    message.classList.add(className);
    document.body.appendChild(message);

    setTimeout(() => {
      message.remove();
    }, 3000);
  }

  function resetGame() {
    progress = 50;
    gameActive = false;
    updateProgressBar();
    startButton.classList.remove("hidden");
  }

  function startDecay() {
    decayInterval = setInterval(() => {
      if (progress > 0 && gameActive) {
        progress -= decayRate;
        updateProgressBar();
      }
    }, 500);
  }

  updateProgressBar();
});
