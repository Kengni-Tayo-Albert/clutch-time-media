document.addEventListener("DOMContentLoaded", async () => {
  const track = document.querySelector("#home-carousel-track");
  const dotsContainer = document.querySelector("#home-carousel-dots");
  const prevButton = document.querySelector(".arrow-left");
  const nextButton = document.querySelector(".arrow-right");

  if (!track || !dotsContainer || !prevButton || !nextButton) return;

  const allArticles = await window.ArticleService.getAllArticles();

  // On garde seulement les articles mis en avant
  const featuredArticles = allArticles.filter(article => article.featured);

  // Nombre d'articles affichés par vue
  const itemsPerSlide = 2;

  // On découpe le tableau en petits groupes de 2
  const slides = [];
  for (let i = 0; i < featuredArticles.length; i += itemsPerSlide) {
    slides.push(featuredArticles.slice(i, i + itemsPerSlide));
  }

  // Si aucun article mis en avant
  if (slides.length === 0) {
    track.innerHTML = "<p>Aucun article à la une pour le moment.</p>";
    return;
  }

  let currentSlideIndex = 0;

  function renderSlide() {
    const currentArticles = slides[currentSlideIndex];

    track.innerHTML = currentArticles.map(article => `
      <article class="card">
        <img src="${article.image}" alt="${article.title}" class="card-image">

        <div class="card-content">
          <h3>${article.title}</h3>
          <h4>${article.subtitle}</h4>

          <p>${article.summary}</p>

          <div class="card-meta">
            <span>👤 ${article.author}</span>
            <span>📅 ${article.date}</span>
            <span>⏱ ${article.readingTime} min de lecture</span>
          </div>

          <a href="./assets/pages/article-detail.html?id=${article.id}" class="btn btn-blue card-btn">
            Lire la suite
          </a>
        </div>
      </article>
    `).join("");

    renderDots();
  }

  function renderDots() {
    dotsContainer.innerHTML = slides.map((_, index) => {
      const activeClass = index === currentSlideIndex ? "dot active" : "dot";
      return `<span class="${activeClass}" data-index="${index}"></span>`;
    }).join("");

    const dots = dotsContainer.querySelectorAll(".dot");

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        currentSlideIndex = Number(dot.dataset.index);
        renderSlide();
      });
    });
  }

  prevButton.addEventListener("click", () => {
    currentSlideIndex = currentSlideIndex === 0
      ? slides.length - 1
      : currentSlideIndex - 1;

    renderSlide();
  });

  nextButton.addEventListener("click", () => {
    currentSlideIndex = currentSlideIndex === slides.length - 1
      ? 0
      : currentSlideIndex + 1;

    renderSlide();
  });

  renderSlide();
});