// =========================
// CARROUSEL DE LA PAGE D'ACCUEIL
// =========================
// Ce script affiche les articles mis en avant sur la page d'accueil.
// Les données viennent du service ArticleService, donc de l'API MySQL en production.

document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector("#home-carousel-track");
  const dotsContainer = document.querySelector("#home-carousel-dots");
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");

  if (!track || !dotsContainer || !prevButton || !nextButton || !window.ArticleService) {
    return;
  }

  // Les articles "featured" alimentent le carrousel d'accueil.
  const allArticles = await window.ArticleService.getAllArticles();
  const featuredArticles = allArticles.filter((article) => article.featured);
  const itemsPerSlide = window.matchMedia("(max-width: 900px)").matches ? 1 : 2;
  const slides = [];

  // Découpe les articles en slides de 1 élément sur mobile et 2 éléments sur desktop.
  for (let index = 0; index < featuredArticles.length; index += itemsPerSlide) {
    slides.push(featuredArticles.slice(index, index + itemsPerSlide));
  }

  if (slides.length === 0) {
    track.innerHTML = '<p class="empty-state">Aucun article a la une pour le moment.</p>';
    dotsContainer.innerHTML = "";
    return;
  }

  let currentSlideIndex = 0;

  // Affiche la slide active et sécurise les textes avant injection dans le HTML.
  function renderSlide() {
    const currentArticles = slides[currentSlideIndex];

    track.innerHTML = currentArticles.map((article) => {
      const title = window.ArticleService.escapeHTML(article.title);
      const subtitle = window.ArticleService.escapeHTML(article.subtitle);
      const summary = window.ArticleService.escapeHTML(article.summary);
      const author = window.ArticleService.escapeHTML(article.author || "Auteur inconnu");
      const imagePath = window.ArticleService.resolveImagePath(article.image);
      const formattedDate = window.ArticleService.formatDate(article.date);
      const readingTime = Number(article.readingTime) || 1;

      return `
        <article class="card">
          <img src="${imagePath}" alt="${title}" class="card-image">

          <div class="card-content">
            <h3>${title}</h3>
            <h4>${subtitle}</h4>
            <p>${summary}</p>

            <div class="card-meta">
              <span>${author}</span>
              <span>${formattedDate}</span>
              <span>${readingTime} min de lecture</span>
            </div>

            <a href="./assets/pages/article-detail.html?id=${article.id}" class="btn btn-blue card-btn">
              Lire la suite
            </a>
          </div>
        </article>
      `;
    }).join("");

    renderDots();
  }

  // Reconstruit les points de navigation du carrousel.
  function renderDots() {
    dotsContainer.innerHTML = slides.map((_, index) => {
      const activeClass = index === currentSlideIndex ? "dot active" : "dot";
      return `<button class="${activeClass}" type="button" aria-label="Afficher la slide ${index + 1}" data-index="${index}"></button>`;
    }).join("");

    dotsContainer.querySelectorAll(".dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        currentSlideIndex = Number(dot.dataset.index);
        renderSlide();
      });
    });
  }

  // Navigation circulaire vers la slide précédente.
  prevButton.addEventListener("click", () => {
    currentSlideIndex = currentSlideIndex === 0 ? slides.length - 1 : currentSlideIndex - 1;
    renderSlide();
  });

  // Navigation circulaire vers la slide suivante.
  nextButton.addEventListener("click", () => {
    currentSlideIndex = currentSlideIndex === slides.length - 1 ? 0 : currentSlideIndex + 1;
    renderSlide();
  });

  renderSlide();
});
