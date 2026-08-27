const db = require("./db");

// Récupère les commentaires d'un article avec le nom de leur auteur.
// La jointure montre la relation entre commentaire et auteur.
async function getCommentsByArticle(articleId) {
  const [rows] = await db.execute(
    `
      SELECT
        c.id_commentaire,
        c.texte_commentaire,
        c.date_commentaire,
        a.nom_auteur
      FROM commentaire c
      JOIN auteur a ON c.id_auteur = a.id_auteur
      WHERE c.id_article = ?
      ORDER BY c.date_commentaire DESC, c.id_commentaire DESC
    `,
    [articleId]
  );

  return rows.map((row) => ({
    id: String(row.id_commentaire),
    content: row.texte_commentaire,
    date: row.date_commentaire,
    author: row.nom_auteur
  }));
}

// Crée un commentaire pour un article.
// Si le nom saisi n'existe pas encore comme auteur, il est créé avant l'insertion.
async function createComment(articleId, comment) {
  const authorName = comment.author || "Lecteur";
  const email = `${authorName.toLowerCase().replace(/[^a-z0-9]+/g, ".")}@clutchtime.local`;

  const [existingAuthors] = await db.execute(
    "SELECT id_auteur FROM auteur WHERE nom_auteur = ?",
    [authorName]
  );

  let authorId = existingAuthors[0]?.id_auteur;

  if (!authorId) {
    const [authorResult] = await db.execute(
      "INSERT INTO auteur (nom_auteur, email_auteur) VALUES (?, ?)",
      [authorName, email]
    );
    authorId = authorResult.insertId;
  }

  const [result] = await db.execute(
    `
      INSERT INTO commentaire (
        texte_commentaire,
        date_commentaire,
        id_auteur,
        id_article
      )
      VALUES (?, CURDATE(), ?, ?)
    `,
    [comment.content, authorId, articleId]
  );

  return {
    id: String(result.insertId),
    content: comment.content,
    date: new Date().toISOString().slice(0, 10),
    author: authorName
  };
}

module.exports = {
  createComment,
  getCommentsByArticle
};
