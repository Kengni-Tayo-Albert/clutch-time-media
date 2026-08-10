// =========================
// SERVICE DES ARTICLES
// =========================
// Ce fichier centralise l'acces aux donnees des articles.
// Il essaie d'abord l'API MySQL, puis revient au JSON/localStorage si le backend est eteint.

const STORAGE_KEY = "clutchTimeArticles";
const SUBPAGE_SEGMENT = "/assets/pages/";
const PRODUCTION_API_BASE_URL = "https://clutch-time-media-production.up.railway.app/api";
const API_BASE_URL = ["localhost", "127.0.0.1"].includes(window.location.hostname)
  ? "http://localhost:3000/api"
  : PRODUCTION_API_BASE_URL;

function isSubPage() {
  return window.location.pathname.includes(SUBPAGE_SEGMENT);
}

function getArticlesJsonPath() {
  return isSubPage() ? "../data/articles.json" : "./assets/data/articles.json";
}

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

function escapeHTML(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

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

function saveLocalArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

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

function addLocalArticle(article) {
  const currentArticles = getLocalArticles();
  currentArticles.unshift(article);
  saveLocalArticles(currentArticles);
}

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

async function getAllArticles() {
  const apiArticles = await fetchApiArticles();

  if (apiArticles) {
    return apiArticles;
  }

  const baseArticles = await fetchBaseArticles();
  const localArticles = getLocalArticles();

  return [...localArticles, ...baseArticles];
}

async function getArticleById(articleId) {
  const apiArticle = await fetchApiArticleById(articleId);

  if (apiArticle) {
    return apiArticle;
  }

  const articles = await getAllArticles();
  return articles.find((article) => String(article.id) === String(articleId));
}

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
