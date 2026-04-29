// =========================
// PAGE ARTICLES
// Objectif : afficher les articles depuis le fichier JSON
// =========================

document.addEventListener("DOMContentLoaded", async () => {
  // Zone où les cartes articles seront ajoutées
  const articlesList = document.querySelector("#articles-list");

  // Sécurité : si la zone n'existe pas, le script s'arrête
  if (!articlesList) return;

  // Vide la zone avant injecter les articles
  articlesList.innerHTML = "";

  // Récupère les articles depuis le service qui utilise fetch()
  const articles = await window.ArticleService.getAllArticles();

  // Message affiché si aucun article n'est disponible
  if (articles.length === 0) {
    articlesList.innerHTML = "<p>Aucun article disponible pour le moment.</p>";
    return;
  }

  // Création d'une carte pour chaque article
  articles.forEach((article) => {
    const card = document.createElement("article");
    card.classList.add("article-card-preview");

    // Adapte le chemin de l'image pour une page située dans assets/pages
    const imagePath = article.image.replace("./assets/img/", "../img/");

    card.innerHTML = `
      <img 
        src="${imagePath}" 
        alt="${article.title}" 
        class="article-card-image"
      >

      <div class="article-card-content">
        <h3>${article.title}</h3>
        <h4>${article.subtitle}</h4>

        <p>${article.summary}</p>

        <div class="article-card-meta">
  <span>👤 Par ${article.author}</span>
  <span>📅 ${article.date}</span>
  <span>🕒 ${article.readingTime} min de lecture</span>
  <span>🏷️ ${article.category}</span>
</div>
      </div>

      <a href="./article-detail.html?id=${article.id}" class="article-card-btn">
        Lire la suite
      </a>
    `;

    articlesList.appendChild(card);
  });
});