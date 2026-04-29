// =========================
// MENU BURGER
// =========================

// =========================
// MENU BURGER MOBILE
// =========================

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar a");

  if (!burger || !navbar) return;

  function openMenu() {
    burger.classList.add("is-active");
    navbar.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "Fermer le menu");
  }

  function closeMenu() {
    burger.classList.remove("is-active");
    navbar.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Ouvrir le menu");
  }

  burger.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = navbar.classList.contains("is-open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Ferme le menu quand un lien est cliqué
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Ferme le menu au clic en dehors
  document.addEventListener("click", (event) => {
    const clickInsideMenu = navbar.contains(event.target);
    const clickOnBurger = burger.contains(event.target);

    if (!clickInsideMenu && !clickOnBurger) {
      closeMenu();
    }
  });
});