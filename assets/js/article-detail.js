document.addEventListener("DOMContentLoaded", async () => {
  // On vérifie qu'on est bien sur la page détail
  const articleContainer = document.querySelector(".article-placeholder");
  if (!articleContainer) return;

  // On lit les paramètres dans l'URL
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id");

  // Si aucun id n'est passé dans l'URL
  if (!articleId) {
    articleContainer.innerHTML = "<p>Aucun article sélectionné.</p>";
    return;
  }

  // On récupère l'article correspondant
  const article = await window.ArticleService.getArticleById(articleId);

  // Si aucun article n'est trouvé
  if (!article) {
    articleContainer.innerHTML = "<p>Article introuvable.</p>";
    return;
  }

  // On injecte le HTML dans la page
  articleContainer.innerHTML = `
    <h2>${article.title}</h2>
    <p class="article-subtitle">${article.subtitle}</p>

  <div class="article-meta">
  <span>👤 Par ${article.author}</span>
  <span>📅 ${article.date}</span>
  <span>🕒 ${article.readingTime} min de lecture</span>
  <span>🏷️ ${article.category}</span>
</div>

    <img src="${article.image}" alt="${article.title}" class="article-detail-image">

    <p>${article.content}</p>
  `;
});