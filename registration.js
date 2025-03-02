document.addEventListener("DOMContentLoaded", function () {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(registrationForm);

    fetch("registration.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Réponse du serveur:", data);
        if (data.trim() === "success") {
          alert("Inscription réussie !");
          window.location.href = "choice.html"; // Redirige vers la page suivante
        } else {
          alert("Erreur : " + data); // Affiche l'erreur
        }
      })
      .catch((error) => console.error("Erreur:", error));
  });
});
