// =========================
// PAGE DETAIL ARTICLE
// =========================
// Recupere l'id dans l'URL puis affiche l'article correspondant.

document.addEventListener("DOMContentLoaded", async () => {
  const articleContainer = document.querySelector(".article-placeholder");

  if (!articleContainer || !window.ArticleService) return;

  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  if (!articleId) {
    articleContainer.innerHTML = '<p class="empty-state">Aucun article selectionne.</p>';
    return;
  }

  const article = await window.ArticleService.getArticleById(articleId);

  if (!article) {
    articleContainer.innerHTML = '<p class="empty-state">Article introuvable.</p>';
    return;
  }

  const title = window.ArticleService.escapeHTML(article.title);
  const subtitle = window.ArticleService.escapeHTML(article.subtitle);
  const content = window.ArticleService.escapeHTML(article.content);
  const author = window.ArticleService.escapeHTML(article.author || "Auteur inconnu");
  const category = window.ArticleService.escapeHTML(article.category || "Non classe");
  const readingTime = Number(article.readingTime) || 1;
  const imagePath = window.ArticleService.resolveImagePath(article.image);
  const formattedDate = window.ArticleService.formatDate(article.date);

  articleContainer.innerHTML = `
    <h2>${title}</h2>
    <p class="article-subtitle">${subtitle}</p>

    <div class="article-meta">
      <span>Par ${author}</span>
      <span>${formattedDate}</span>
      <span>${readingTime} min de lecture</span>
      <span>${category}</span>
    </div>

    <img src="${imagePath}" alt="${title}" class="article-detail-image">
    <p>${content}</p>
  `;
});
