document.addEventListener("DOMContentLoaded", function () {
  const connectionButton = document.querySelector(".connection");
  const dropdown = document.querySelector(".dropdown-content");
  const loginForm = document.getElementById("loginForm");

  connectionButton.addEventListener("click", function () {
    // Bascule la classe active
    dropdown.classList.toggle("active");
  });

  // Ferme le menu si on clique ailleurs
  document.addEventListener("click", function (event) {
    if (
      !connectionButton.contains(event.target) &&
      !dropdown.contains(event.target)
    ) {
      dropdown.classList.remove("active");
    }
  });
  // Intercepte l'envoi du formulaire
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(loginForm); // Récupère les valeurs du formulaire

    fetch("login.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text()) // Récupère la réponse du serveur
      .then((data) => {
        console.log("Réponse du serveur:", data);
        if (data.trim() === "success") {
          alert("Connexion réussie !");
          window.location.href = "choice.html"; // Redirige l'utilisateur après connexion
        } else {
          alert("Identifiants incorrects. Veuillez réessayer.");
        }
      })
      .catch((error) => console.error("Erreur:", error));
  });
});
