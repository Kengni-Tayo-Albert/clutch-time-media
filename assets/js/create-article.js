document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#create-article-form");

  // Si on n'est pas sur la page création d'article, on arrête
  if (!form) return;

  form.addEventListener("submit", (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();

    // 1) On récupère les valeurs des champs
    const title = document.querySelector("#title").value.trim();
    const subtitle = document.querySelector("#subtitle").value.trim();
    const summary = document.querySelector("#summary").value.trim();
    const author = document.querySelector("#author").value.trim();
    const date = document.querySelector("#date").value.trim();
    const readingTime = document.querySelector("#reading-time").value.trim();
    const content = document.querySelector("#content").value.trim();

    // 2) Validation simple
    if (!title || !subtitle || !summary || !author || !date || !readingTime || !content) {
      alert("Merci de remplir tous les champs.");
      return;
    }

    // 3) On construit un objet article
    const newArticle = {
      // Date.now() crée un id simple basé sur l'heure actuelle
      id: Date.now().toString(),
      title,
      subtitle,
      summary,
      author,
      date,
      readingTime: Number(readingTime),
      content,

      // Image par défaut, car ton formulaire n'a pas encore d'upload image
      image: "../img/hero-section.svg",

      // On peut décider si l'article doit apparaître en home
      featured: false
    };

    // 4) On sauvegarde l'article dans localStorage
    window.ArticleService.addLocalArticle(newArticle);

    // 5) Petit message de confirmation
    alert("Article créé avec succès !");

    // 6) Redirection vers la page détail avec l'id dans l'URL
    window.location.href = `./article-detail.html?id=${newArticle.id}`;
  });
});