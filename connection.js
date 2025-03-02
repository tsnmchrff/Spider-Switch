document.addEventListener("DOMContentLoaded", function () {
  const connectionButton = document.querySelector(".connection");
  const dropdown = document.querySelector(".dropdown-content");

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
});
