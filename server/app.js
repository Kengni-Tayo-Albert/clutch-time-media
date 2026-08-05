require("dotenv").config();

const path = require("path");
const express = require("express");
const articlesRepository = require("./articles.repository");
const commentsRepository = require("./comments.repository");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDir = path.join(__dirname, "..");
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.CLIENT_ORIGIN
].filter(Boolean));

app.use(express.json({ limit: "20kb" }));
app.use(express.static(publicDir));

app.use((request, response, next) => {
  const origin = request.headers.origin;

  if (!origin || allowedOrigins.has(origin)) {
    response.setHeader("Access-Control-Allow-Origin", origin || "http://localhost:3000");
  }

  response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (request.method === "OPTIONS") {
    response.sendStatus(204);
    return;
  }

  next();
});

function getText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value).getTime());
}

function isValidId(value) {
  return /^\d+$/.test(String(value));
}

function sendValidationError(response, message) {
  response.status(400).json({ message });
}

function validateArticleId(request, response, next) {
  if (!isValidId(request.params.id)) {
    sendValidationError(response, "Identifiant d'article invalide.");
    return;
  }

  next();
}

function validateArticlePayload(request, response, next) {
  const article = {
    title: getText(request.body.title),
    subtitle: getText(request.body.subtitle),
    summary: getText(request.body.summary),
    author: getText(request.body.author),
    date: getText(request.body.date),
    readingTime: Number(request.body.readingTime),
    category: getText(request.body.category),
    content: getText(request.body.content),
    image: getText(request.body.image) || "./assets/img/hero-section.svg"
  };

  if (!article.title || !article.summary || !article.author || !article.date || !article.readingTime || !article.category || !article.content) {
    sendValidationError(response, "Tous les champs obligatoires doivent etre remplis.");
    return;
  }

  if (article.title.length > 200 || article.summary.length > 500 || article.content.length > 1000) {
    sendValidationError(response, "Certaines valeurs sont trop longues.");
    return;
  }

  if (article.author.length > 50 || article.category.length > 50 || article.image.length > 255) {
    sendValidationError(response, "Certaines valeurs depassent la taille autorisee.");
    return;
  }

  if (article.readingTime < 1 || article.readingTime > 120) {
    sendValidationError(response, "Le temps de lecture doit etre compris entre 1 et 120 minutes.");
    return;
  }

  if (!isValidDate(article.date)) {
    sendValidationError(response, "La date doit etre au format AAAA-MM-JJ.");
    return;
  }

  request.body = article;
  next();
}

function validatePartialArticlePayload(request, response, next) {
  const article = {
    title: getText(request.body.title),
    subtitle: getText(request.body.subtitle),
    summary: getText(request.body.summary),
    author: getText(request.body.author),
    date: getText(request.body.date),
    readingTime: request.body.readingTime ? Number(request.body.readingTime) : undefined,
    category: getText(request.body.category),
    content: getText(request.body.content),
    image: getText(request.body.image)
  };

  if (article.title && article.title.length > 200) {
    sendValidationError(response, "Le titre est trop long.");
    return;
  }

  if (article.summary && article.summary.length > 500) {
    sendValidationError(response, "Le resume est trop long.");
    return;
  }

  if (article.content && article.content.length > 1000) {
    sendValidationError(response, "Le contenu est trop long.");
    return;
  }

  if (article.readingTime !== undefined && (article.readingTime < 1 || article.readingTime > 120)) {
    sendValidationError(response, "Le temps de lecture doit etre compris entre 1 et 120 minutes.");
    return;
  }

  if (article.date && !isValidDate(article.date)) {
    sendValidationError(response, "La date doit etre au format AAAA-MM-JJ.");
    return;
  }

  request.body = article;
  next();
}

function validateCommentPayload(request, response, next) {
  const comment = {
    author: getText(request.body.author) || "Lecteur",
    content: getText(request.body.content)
  };

  if (!comment.content) {
    sendValidationError(response, "Le commentaire ne peut pas etre vide.");
    return;
  }

  if (comment.author.length > 50 || comment.content.length > 255) {
    sendValidationError(response, "Le commentaire ou le nom est trop long.");
    return;
  }

  request.body = comment;
  next();
}

app.get("/api/health", (request, response) => {
  response.json({ status: "ok", database: process.env.DB_NAME || "blog" });
});

app.get("/api/articles", async (request, response, next) => {
  try {
    const articles = await articlesRepository.getAllArticles();
    response.json(articles);
  } catch (error) {
    next(error);
  }
});

app.get("/api/articles/:id", validateArticleId, async (request, response, next) => {
  try {
    const article = await articlesRepository.getArticleById(request.params.id);

    if (!article) {
      response.status(404).json({ message: "Article introuvable." });
      return;
    }

    response.json(article);
  } catch (error) {
    next(error);
  }
});

app.post("/api/articles", validateArticlePayload, async (request, response, next) => {
  try {
    const article = await articlesRepository.createArticle(request.body);
    response.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

app.put("/api/articles/:id", validateArticleId, validatePartialArticlePayload, async (request, response, next) => {
  try {
    const article = await articlesRepository.updateArticle(request.params.id, request.body);

    if (!article) {
      response.status(404).json({ message: "Article introuvable." });
      return;
    }

    response.json(article);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/articles/:id", validateArticleId, async (request, response, next) => {
  try {
    const deleted = await articlesRepository.deleteArticle(request.params.id);

    if (!deleted) {
      response.status(404).json({ message: "Article introuvable." });
      return;
    }

    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get("/api/articles/:id/comments", validateArticleId, async (request, response, next) => {
  try {
    const comments = await commentsRepository.getCommentsByArticle(request.params.id);
    response.json(comments);
  } catch (error) {
    next(error);
  }
});

app.post("/api/articles/:id/comments", validateArticleId, validateCommentPayload, async (request, response, next) => {
  try {
    const comment = await commentsRepository.createComment(request.params.id, request.body);
    response.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).json({
    message: "Erreur serveur. Verifiez la connexion MySQL et les variables d'environnement."
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Clutch Time Media API disponible sur http://localhost:${port}`);
});
