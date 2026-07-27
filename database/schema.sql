-- =========================================================
-- Base de donnees relationnelle - Clutch Time Media
-- Script compatible MySQL / MariaDB
-- =========================================================

CREATE DATABASE IF NOT EXISTS clutch_time_media
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE clutch_time_media;

-- =========================================================
-- Table auteurs
-- Cette table stocke les auteurs des articles et commentaires.
-- Un auteur peut ecrire plusieurs articles et plusieurs commentaires.
-- =========================================================
CREATE TABLE IF NOT EXISTS auteurs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(100) NOT NULL,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL,
  role ENUM('admin', 'author', 'reader') NOT NULL DEFAULT 'reader',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- Table categories
-- Cette table permet de classer les articles par theme.
-- Exemple : Players, Teams, Playoffs, Transferts.
-- =========================================================
CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- Table articles
-- Cette table contient les informations principales d'un article.
-- category_id relie l'article a sa categorie.
-- auteur_id relie l'article a son auteur.
-- =========================================================
CREATE TABLE IF NOT EXISTS articles (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id INT UNSIGNED NOT NULL,
  auteur_id INT UNSIGNED NOT NULL,
  title VARCHAR(180) NOT NULL,
  subtitle VARCHAR(255),
  summary TEXT,
  content LONGTEXT NOT NULL,
  image_url VARCHAR(255),
  published_at DATETIME NOT NULL,
  reading_time INT UNSIGNED NOT NULL DEFAULT 1,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_articles_published_at (published_at),
  INDEX idx_articles_featured (featured),

  CONSTRAINT fk_articles_category
    FOREIGN KEY (category_id)
    REFERENCES categories(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,

  CONSTRAINT fk_articles_auteur
    FOREIGN KEY (auteur_id)
    REFERENCES auteurs(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- Table comments
-- Cette table stocke les commentaires d'un article.
-- Chaque commentaire appartient a un article et a un auteur.
-- =========================================================
CREATE TABLE IF NOT EXISTS comments (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  article_id INT UNSIGNED NOT NULL,
  auteur_id INT UNSIGNED NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_comments_article_id (article_id),

  CONSTRAINT fk_comments_article
    FOREIGN KEY (article_id)
    REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_comments_auteur
    FOREIGN KEY (auteur_id)
    REFERENCES auteurs(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =========================================================
-- Table tags
-- Cette table stocke les mots-cles des articles.
-- Un tag peut etre reutilise sur plusieurs articles.
-- =========================================================
CREATE TABLE IF NOT EXISTS tags (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(120) NOT NULL UNIQUE,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================================================
-- Table article_tags
-- Table d'association entre articles et tags.
-- Elle represente une relation plusieurs-a-plusieurs.
-- =========================================================
CREATE TABLE IF NOT EXISTS article_tags (
  article_id INT UNSIGNED NOT NULL,
  tag_id INT UNSIGNED NOT NULL,

  PRIMARY KEY (article_id, tag_id),

  CONSTRAINT fk_article_tags_article
    FOREIGN KEY (article_id)
    REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

  CONSTRAINT fk_article_tags_tag
    FOREIGN KEY (tag_id)
    REFERENCES tags(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;
