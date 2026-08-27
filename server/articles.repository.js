const db = require("./db");

// Transforme une ligne SQL en objet attendu par le front-end.
// Cela évite d'exposer directement les noms de colonnes de la base.
function mapArticle(row) {
  return {
    id: String(row.id_article),
    title: row.titre,
    subtitle: row.resumer,
    summary: row.resumer,
    author: row.nom_auteur,
    date: row.date_de_creation,
    readingTime: row.temps_de_lecture,
    category: row.nom_categorie,
    content: row.contenu_article,
    image: row.image,
    featured: true
  };
}

// Récupère les articles avec leurs auteurs et catégories grâce aux jointures SQL.
async function getAllArticles() {
  const [rows] = await db.execute(`
    SELECT
      ar.id_article,
      ar.titre,
      ar.resumer,
      ar.temps_de_lecture,
      ar.date_de_creation,
      ar.contenu_article,
      ar.image,
      au.nom_auteur,
      ca.nom_categorie
    FROM article ar
    JOIN auteur au ON ar.id_auteur = au.id_auteur
    JOIN categorie ca ON ar.id_categorie = ca.id_categorie
    ORDER BY ar.date_de_creation DESC, ar.id_article DESC
  `);

  return rows.map(mapArticle);
}

// Récupère un seul article par sa clé primaire.
async function getArticleById(articleId) {
  const [rows] = await db.execute(
    `
      SELECT
        ar.id_article,
        ar.titre,
        ar.resumer,
        ar.temps_de_lecture,
        ar.date_de_creation,
        ar.contenu_article,
        ar.image,
        au.nom_auteur,
        ca.nom_categorie
      FROM article ar
      JOIN auteur au ON ar.id_auteur = au.id_auteur
      JOIN categorie ca ON ar.id_categorie = ca.id_categorie
      WHERE ar.id_article = ?
    `,
    [articleId]
  );

  return rows.length > 0 ? mapArticle(rows[0]) : null;
}

// Cherche une catégorie existante ou la crée si elle n'existe pas encore.
async function findOrCreateCategory(categoryName) {
  const cleanName = categoryName || "Community";
  const [existingRows] = await db.execute(
    "SELECT id_categorie FROM categorie WHERE nom_categorie = ?",
    [cleanName]
  );

  if (existingRows.length > 0) {
    return existingRows[0].id_categorie;
  }

  const [result] = await db.execute(
    "INSERT INTO categorie (nom_categorie) VALUES (?)",
    [cleanName]
  );

  return result.insertId;
}

// Cherche un auteur existant ou le crée pour respecter la relation auteur/article.
async function findOrCreateAuthor(authorName) {
  const cleanName = authorName || "Auteur inconnu";
  const email = `${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@clutchtime.local`;

  const [existingRows] = await db.execute(
    "SELECT id_auteur FROM auteur WHERE nom_auteur = ?",
    [cleanName]
  );

  if (existingRows.length > 0) {
    return existingRows[0].id_auteur;
  }

  const [result] = await db.execute(
    "INSERT INTO auteur (nom_auteur, email_auteur) VALUES (?, ?)",
    [cleanName, email]
  );

  return result.insertId;
}

// Insère un article dans MySQL avec ses clés étrangères auteur et catégorie.
async function createArticle(article) {
  const categoryId = await findOrCreateCategory(article.category);
  const authorId = await findOrCreateAuthor(article.author);

  const [result] = await db.execute(
    `
      INSERT INTO article (
        titre,
        resumer,
        temps_de_lecture,
        date_de_creation,
        contenu_article,
        image,
        id_categorie,
        id_auteur
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      article.title,
      article.summary,
      Number(article.readingTime),
      article.date,
      article.content,
      article.image || "./assets/img/hero-section.svg",
      categoryId,
      authorId
    ]
  );

  return getArticleById(result.insertId);
}

// Met à jour un article existant en conservant les anciennes valeurs non transmises.
async function updateArticle(articleId, article) {
  const currentArticle = await getArticleById(articleId);

  if (!currentArticle) {
    return null;
  }

  const categoryId = await findOrCreateCategory(article.category || currentArticle.category);
  const authorId = await findOrCreateAuthor(article.author || currentArticle.author);

  await db.execute(
    `
      UPDATE article
      SET
        titre = ?,
        resumer = ?,
        temps_de_lecture = ?,
        date_de_creation = ?,
        contenu_article = ?,
        image = ?,
        id_categorie = ?,
        id_auteur = ?
      WHERE id_article = ?
    `,
    [
      article.title || currentArticle.title,
      article.summary || currentArticle.summary,
      Number(article.readingTime || currentArticle.readingTime),
      article.date || currentArticle.date,
      article.content || currentArticle.content,
      article.image || currentArticle.image,
      categoryId,
      authorId,
      articleId
    ]
  );

  return getArticleById(articleId);
}

// Supprime un article par son identifiant.
// La suppression des commentaires liés est gérée par la contrainte SQL.
async function deleteArticle(articleId) {
  const [result] = await db.execute("DELETE FROM article WHERE id_article = ?", [articleId]);
  return result.affectedRows > 0;
}

module.exports = {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle
};
