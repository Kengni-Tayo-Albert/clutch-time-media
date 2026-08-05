// =========================
// PAGE DETAIL ARTICLE
// =========================
// Recupere l'id dans l'URL puis affiche l'article et ses commentaires.

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

    <section class="comments-section" aria-labelledby="comments-title">
      <h3 id="comments-title">Commentaires</h3>
      <div class="comments-list" id="comments-list">
        <p class="empty-state">Chargement des commentaires...</p>
      </div>

      <form class="comment-form" id="comment-form">
        <div class="form-group">
          <label for="comment-author">Nom</label>
          <input type="text" id="comment-author" name="author" required>
        </div>

        <div class="form-group">
          <label for="comment-content">Commentaire</label>
          <textarea id="comment-content" name="content" rows="4" required></textarea>
        </div>

        <button type="submit" class="btn btn-blue">Publier le commentaire</button>
      </form>
    </section>
  `;

  const commentsList = articleContainer.querySelector("#comments-list");
  const commentForm = articleContainer.querySelector("#comment-form");

  async function renderComments() {
    const comments = await window.ArticleService.getCommentsByArticle(articleId);

    if (comments.length === 0) {
      commentsList.innerHTML = '<p class="empty-state">Aucun commentaire pour le moment.</p>';
      return;
    }

    commentsList.innerHTML = comments.map((comment) => {
      const commentAuthor = window.ArticleService.escapeHTML(comment.author || "Lecteur");
      const commentContent = window.ArticleService.escapeHTML(comment.content);
      const commentDate = window.ArticleService.formatDate(comment.date);

      return `
        <article class="comment-item">
          <div class="comment-meta">
            <strong>${commentAuthor}</strong>
            <span>${commentDate}</span>
          </div>
          <p>${commentContent}</p>
        </article>
      `;
    }).join("");
  }

  commentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(commentForm);
    const author = formData.get("author")?.trim();
    const contentValue = formData.get("content")?.trim();

    if (!author || !contentValue) {
      alert("Merci de remplir le nom et le commentaire.");
      return;
    }

    try {
      await window.ArticleService.addComment(articleId, {
        author,
        content: contentValue
      });

      commentForm.reset();
      await renderComments();
      alert("Commentaire ajouté avec succès !");
    } catch (error) {
      alert("Impossible d'ajouter le commentaire pour le moment.");
    }
  });

  await renderComments();
});
