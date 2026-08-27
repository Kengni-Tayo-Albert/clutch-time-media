// =========================
// CREATION D'ARTICLE
// =========================
// Le formulaire cree un article via l'API SQL quand le backend est lance.
// Si l'API est indisponible, le service garde un secours en localStorage.
// Cette page démontre l'opération CREATE du CRUD côté interface.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-article-form");

  if (!form || !window.ArticleService) return;

  // Intercepte l'envoi HTML classique pour envoyer les données en JavaScript.
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Lecture et nettoyage des champs avant envoi au backend.
    const formData = new FormData(form);
    const title = formData.get("title")?.trim();
    const subtitle = formData.get("subtitle")?.trim();
    const summary = formData.get("summary")?.trim();
    const author = formData.get("author")?.trim();
    const date = formData.get("date")?.trim();
    const readingTime = Number(formData.get("reading-time"));
    const category = formData.get("category")?.trim() || "Community";
    const content = formData.get("content")?.trim();

    // Validation front : évite d'envoyer une requête incomplète à l'API.
    if (!title || !subtitle || !summary || !author || !date || !readingTime || !content) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (readingTime < 1) {
      alert("Le temps de lecture doit être supérieur à 0.");
      return;
    }

    // Objet envoyé à POST /api/articles, puis transformé en lignes SQL côté backend.
    const newArticle = {
      id: Date.now().toString(),
      title,
      subtitle,
      summary,
      author,
      date,
      readingTime,
      category,
      content,
      image: "./assets/img/hero-section.svg",
      featured: false
    };

    const savedArticle = await window.ArticleService.addArticle(newArticle);

    alert("Article créé avec succès !");
    window.location.href = `./article-detail.html?id=${savedArticle.id}`;
  });
});
