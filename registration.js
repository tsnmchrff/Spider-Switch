document.querySelectorAll(".password_cont").forEach((span) => {
  span.addEventListener("focus", function () {
    if (this.textContent === "password" || this.textContent === "username") {
      this.textContent = ""; // Supprime le texte par défaut au focus, et focus reçoit l'attention de l'utilisateur
    }
  });

  span.addEventListener("blur", function () {
    if (this.textContent.trim() === "") {
      this.textContent = "password_cont"; // Remet un texte par défaut si vide
    }
  });
});
