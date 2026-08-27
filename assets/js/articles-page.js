// =========================
// PAGE ARTICLES
// =========================
// Affiche toutes les cartes articles dans la page liste.
// En production, les articles proviennent du backend Railway connecté à MySQL.

document.addEventListener("DOMContentLoaded", async () => {
  const articlesList = document.querySelector("#articles-list");

  if (!articlesList || !window.ArticleService) return;

  // Charge les articles depuis l'API SQL ou depuis le secours local.
  const articles = await window.ArticleService.getAllArticles();

  if (articles.length === 0) {
    articlesList.innerHTML = '<p class="empty-state">Aucun article disponible pour le moment.</p>';
    return;
  }

  // Transforme chaque article en carte HTML affichée dans la grille.
  articlesList.innerHTML = articles.map((article) => {
    const title = window.ArticleService.escapeHTML(article.title);
    const subtitle = window.ArticleService.escapeHTML(article.subtitle);
    const summary = window.ArticleService.escapeHTML(article.summary);
    const author = window.ArticleService.escapeHTML(article.author || "Auteur inconnu");
    const category = window.ArticleService.escapeHTML(article.category || "Non classe");
    const readingTime = Number(article.readingTime) || 1;
    const imagePath = window.ArticleService.resolveImagePath(article.image);
    const formattedDate = window.ArticleService.formatDate(article.date);

    return `
      <article class="article-card-preview">
        <img src="${imagePath}" alt="${title}" class="article-card-image">

        <div class="article-card-content">
          <h3>${title}</h3>
          <h4>${subtitle}</h4>
          <p>${summary}</p>

          <div class="article-card-meta">
            <span>Par ${author}</span>
            <span>${formattedDate}</span>
            <span>${readingTime} min de lecture</span>
            <span>${category}</span>
          </div>

          <a href="./article-detail.html?id=${article.id}" class="article-card-btn">
            Lire la suite
          </a>
        </div>
      </article>
    `;
  }).join("");
});
