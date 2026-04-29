// =========================
// SERVICE DES ARTICLES
// =========================

// Cette constante est la clé utilisée dans localStorage.
// localStorage = petit stockage dans le navigateur.
const STORAGE_KEY = "clutchTimeArticles";

// Cette fonction récupère le bon chemin vers le JSON
// selon la page sur laquelle on se trouve.
function getArticlesJsonPath() {
  const isSubPage = window.location.pathname.includes("/assets/pages/");
  return isSubPage ? "../data/articles.json" : "./assets/data/articles.json";
}

// Cette fonction récupère les articles "de base" via fetch()
async function fetchBaseArticles() {
  try {
    const response = await fetch(getArticlesJsonPath());

    // Si la requête HTTP échoue
    if (!response.ok) {
      throw new Error("Impossible de récupérer le fichier articles.json");
    }

    // On transforme la réponse JSON en tableau JavaScript
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error("Erreur fetchBaseArticles :", error);
    return [];
  }
}

// Cette fonction lit les articles créés par l'utilisateur dans localStorage
function getLocalArticles() {
  const raw = localStorage.getItem(STORAGE_KEY);

  // Si rien n'existe encore dans localStorage, on retourne un tableau vide
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Erreur de lecture localStorage :", error);
    return [];
  }
}

// Cette fonction sauvegarde un tableau d'articles dans localStorage
function saveLocalArticles(articles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
}

// Cette fonction ajoute un nouvel article dans localStorage
function addLocalArticle(article) {
  const currentArticles = getLocalArticles();

  // On place le nouvel article au début du tableau
  currentArticles.unshift(article);

  saveLocalArticles(currentArticles);
}

// Cette fonction fusionne les articles du JSON + ceux du localStorage
async function getAllArticles() {
  const baseArticles = await fetchBaseArticles();
  const localArticles = getLocalArticles();

  // On renvoie d'abord les articles créés localement,
  // puis ceux du JSON.
  return [...localArticles, ...baseArticles];
}

// Cette fonction récupère un seul article selon son id
async function getArticleById(articleId) {
  const articles = await getAllArticles();
  return articles.find(article => article.id === articleId);
}

// On expose les fonctions pour pouvoir les utiliser ailleurs
window.ArticleService = {
  getAllArticles,
  getArticleById,
  addLocalArticle
};