// =========================
// CREATION D'ARTICLE
// =========================
// Le formulaire ajoute un article dans localStorage.
// Cette logique sera remplacee plus tard par un POST vers l'API SQL.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-article-form");

  if (!form || !window.ArticleService) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const title = formData.get("title")?.trim();
    const subtitle = formData.get("subtitle")?.trim();
    const summary = formData.get("summary")?.trim();
    const author = formData.get("author")?.trim();
    const date = formData.get("date")?.trim();
    const readingTime = Number(formData.get("reading-time"));
    const category = formData.get("category")?.trim() || "Community";
    const content = formData.get("content")?.trim();

    if (!title || !subtitle || !summary || !author || !date || !readingTime || !content) {
      alert("Merci de remplir tous les champs obligatoires.");
      return;
    }

    if (readingTime < 1) {
      alert("Le temps de lecture doit etre superieur a 0.");
      return;
    }

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

    window.ArticleService.addLocalArticle(newArticle);

    alert("Article cree avec succes !");
    window.location.href = `./article-detail.html?id=${newArticle.id}`;
  });
});
