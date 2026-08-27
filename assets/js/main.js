// =========================
// MENU BURGER MOBILE
// =========================
// Ce script rend la navigation utilisable sur mobile :
// ouverture du menu, fermeture au clic extérieur, fermeture au clavier avec Escape.

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  if (!burger || !navbar) return;

  // Ouvre le menu et met à jour les attributs d'accessibilité.
  function openMenu() {
    burger.classList.add("is-active");
    navbar.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
  }

  // Ferme le menu et restaure l'état accessible du bouton.
  function closeMenu() {
    burger.classList.remove("is-active");
    navbar.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  // Bascule entre menu ouvert et menu fermé.
  burger.addEventListener("click", (event) => {
    event.stopPropagation();

    if (navbar.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Ferme le menu après le choix d'un lien.
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Ferme le menu lorsqu'un clic arrive en dehors de la navigation.
  document.addEventListener("click", (event) => {
    const clickInsideMenu = navbar.contains(event.target);
    const clickOnBurger = burger.contains(event.target);

    if (!clickInsideMenu && !clickOnBurger) {
      closeMenu();
    }
  });

  // Permet de fermer le menu au clavier.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
});
