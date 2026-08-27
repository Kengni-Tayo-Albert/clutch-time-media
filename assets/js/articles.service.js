// =========================
// SERVICE DES ARTICLES
// =========================
// Ce fichier centralise l'acces aux donnees des articles.
// Il essaie d'abord l'API MySQL, puis revient au JSON/localStorage si le backend est indisponible.

const STORAGE_KEY = "clutchTimeArticles";
const SUBPAGE_SEGMENT = "/assets/pages/";
const PRODUCTION_API_BASE_URL = "https://clutch-time-media-production.up.railway.app/api";

// Choisit automatiquement la bonne API selon l'environnement.
// En local, le site utilise localhost. En ligne, il utilise le backend Railway.
const API_BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:3000/api"
  : PRODUCTION_API_BASE_URL;

// Indique si la page actuelle se trouve dans assets/pages.
// Cette information sert à construire les bons chemins d'images et de JSON.
function isSubPage() {
  return window.location.pathname.includes(SUBPAGE_SEGMENT);
}

// Donne le chemin du fichier JSON de secours selon la page affichée.
function getArticlesJsonPath() {
  return isSubPage() ? "../data/articles.json" : "./assets/data/articles.json";
}

// Convertit les chemins d'images pour qu'ils fonctionnent depuis l'accueil et les sous-pages.
function resolveImagePath(imagePath) {
  if (!imagePath) {
    return isSubPage() ? "../img/hero-section.svg" : "./assets/img/hero-section.svg";
  }

  if (imagePath.startsWith("http") || imagePath.startsWith("data:")) {
    return imagePath;
  }

  if (imagePath.startsWith("./assets/img/")) {
    return isSubPage() ? imagePath.replace("./assets/img/", "../img/") : imagePath;
  }

  if (imagePath.startsWith("../img/")) {
    return isSubPage() ? imagePath : imagePath.replace("../img/", "./assets/img/");
  }

  return imagePath;
}

// Protège l'affichage HTML contre l'injection de balises dans les données reçues.
function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Transforme une date SQL ou ISO en date lisible au format français.
function formatDate(dateValue) {
  if (!dateValue) return "Date inconnue";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
}

// Récupère les articles historiques du fichier JSON utilisé comme secours.
async function fetchBaseArticles() {
  try {
    const response = await fetch(getArticlesJsonPath());

    if (!response.ok) {
      throw new Error("Impossible de recuperer le fichier articles.json");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur fetchBaseArticles :", error);
    return [];
  }
}

// Appelle la route GET /api/articles du backend Express.
// Cette route lit les articles depuis MySQL.
async function fetchApiArticles() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);

    if (!response.ok) {
      throw new Error("Impossible de recuperer les articles depuis l'API");
    }

    return await response.json();
  } catch (error) {
    console.warn("API indisponible, utilisation du JSON local :", error.message);
    return null;
  }
}

// Appelle la route GET /api/articles/:id pour récupérer un seul article depuis MySQL.
async function fetchApiArticleById(articleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}`);

    if (!response.ok) {
      throw new Error("Article introuvable depuis l'API");
    }

    return await response.json();
  } catch (error) {
    console.warn("API indisponible pour le detail, utilisation du JSON local :", error.message);
    return null;
  }
}

// Récupère les articles créés localement quand l'API n'est pas disponible.
function getLocalArticles() {
  const rawArticles = localStorage.getItem(STORAGE_KEY);

  if (!rawArticles) return [];

  try {
    const articles = JSON.parse(rawArticles);
    const correctedArticles = fixKnownLocalTypos(articles);

    if (correctedArticles.hasChanged) {
      saveLocalArticles(correctedArticles.articles);
    }

    return correctedArticles.articles;
  } catch (error) {
    console.error("Erreur de lecture localStorage :", error);
    return [];
  }
}

// Enregistre les articles de secours dans le navigateur.
function saveLocalArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

// Corrige une ancienne faute sauvegardée dans localStorage sans modifier la base MySQL.
function fixKnownLocalTypos(articles) {
  let hasChanged = false;

  const correctedArticles = articles.map((article) => {
    if (!article.subtitle || !article.subtitle.toLowerCase().includes("dabce")) {
      return article;
    }

    hasChanged = true;

    return {
      ...article,
      subtitle: article.subtitle.replace(/the last dabce/i, "The Last Dance").replace(/dabce/gi, "Dance")
    };
  });

  return {
    articles: correctedArticles,
    hasChanged
  };
}

// Ajoute un article en localStorage uniquement comme solution de secours.
function addLocalArticle(article) {
  const currentArticles = getLocalArticles();
  currentArticles.unshift(article);
  saveLocalArticles(currentArticles);
}

// Crée un article via POST /api/articles.
// Si le backend ne répond pas, l'article est conservé localement pour ne pas bloquer l'interface.
async function addArticle(article) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(article)
    });

    if (!response.ok) {
      throw new Error("Impossible de creer l'article dans MySQL");
    }

    return await response.json();
  } catch (error) {
    console.warn("Creation API indisponible, sauvegarde locale :", error.message);
    addLocalArticle(article);
    return article;
  }
}

// Récupère les commentaires SQL d'un article via GET /api/articles/:id/comments.
async function getCommentsByArticle(articleId) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`);

    if (!response.ok) {
      throw new Error("Impossible de recuperer les commentaires");
    }

    return await response.json();
  } catch (error) {
    console.warn("Commentaires API indisponibles :", error.message);
    return [];
  }
}

// Ajoute un commentaire SQL via POST /api/articles/:id/comments.
async function addComment(articleId, comment) {
  const response = await fetch(`${API_BASE_URL}/articles/${articleId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(comment)
  });

  if (!response.ok) {
    throw new Error("Impossible d'ajouter le commentaire");
  }

  return response.json();
}

// Fonction principale utilisée par les pages : API MySQL en priorité, secours local ensuite.
async function getAllArticles() {
  const apiArticles = await fetchApiArticles();

  if (apiArticles) {
    return apiArticles;
  }

  const baseArticles = await fetchBaseArticles();
  const localArticles = getLocalArticles();

  return [...localArticles, ...baseArticles];
}

// Récupère un article par son identifiant depuis l'API ou depuis les données de secours.
async function getArticleById(articleId) {
  const apiArticle = await fetchApiArticleById(articleId);

  if (apiArticle) {
    return apiArticle;
  }

  const articles = await getAllArticles();
  return articles.find((article) => String(article.id) === String(articleId));
}

// Rend les fonctions disponibles pour les autres scripts front sans utiliser de module bundler.
window.ArticleService = {
  addArticle,
  addComment,
  addLocalArticle,
  escapeHTML,
  formatDate,
  getAllArticles,
  getArticleById,
  getCommentsByArticle,
  resolveImagePath
};
