// =========================
// SERVICE DES ARTICLES
// =========================
// Ce fichier centralise l'acces aux donnees des articles.
// Aujourd'hui, les donnees viennent d'un JSON + localStorage.
// Plus tard, ce service pourra appeler une API reliee a MySQL.

const STORAGE_KEY = "clutchTimeArticles";
const SUBPAGE_SEGMENT = "/assets/pages/";

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

function getLocalArticles() {
  const rawArticles = localStorage.getItem(STORAGE_KEY);

  if (!rawArticles) return [];

  try {
    return JSON.parse(rawArticles);
  } catch (error) {
    console.error("Erreur de lecture localStorage :", error);
    return [];
  }
}

function saveLocalArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

function addLocalArticle(article) {
  const currentArticles = getLocalArticles();
  currentArticles.unshift(article);
  saveLocalArticles(currentArticles);
}

async function getAllArticles() {
  const baseArticles = await fetchBaseArticles();
  const localArticles = getLocalArticles();

  return [...localArticles, ...baseArticles];
}

async function getArticleById(articleId) {
  const articles = await getAllArticles();
  return articles.find((article) => String(article.id) === String(articleId));
}

window.ArticleService = {
  addLocalArticle,
  escapeHTML,
  formatDate,
  getAllArticles,
  getArticleById,
  resolveImagePath
};
