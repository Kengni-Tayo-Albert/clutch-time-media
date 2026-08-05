-- 02_creation_tables_blog.sql
-- Objectif : creer les tables relationnelles du blog Clutch Time Media.
-- Ce script supprime d'abord les anciennes tables pour repartir proprement.

USE blog;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS taguer;
DROP TABLE IF EXISTS commentaire;
DROP TABLE IF EXISTS article;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS auteur;
DROP TABLE IF EXISTS categorie;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE categorie (
   id_categorie INT AUTO_INCREMENT,
   nom_categorie VARCHAR(50) NOT NULL,
   PRIMARY KEY(id_categorie)
) ENGINE=InnoDB;

CREATE TABLE tag (
   id_tag INT AUTO_INCREMENT,
   texte_descriptif VARCHAR(1000) NOT NULL,
   PRIMARY KEY(id_tag)
) ENGINE=InnoDB;

CREATE TABLE auteur (
   id_auteur INT AUTO_INCREMENT,
   nom_auteur VARCHAR(50) NOT NULL,
   email_auteur VARCHAR(100) NOT NULL,
   PRIMARY KEY(id_auteur),
   UNIQUE(email_auteur)
) ENGINE=InnoDB;

CREATE TABLE article (
   id_article INT AUTO_INCREMENT,
   titre VARCHAR(200) NOT NULL,
   resumer VARCHAR(500) NOT NULL,
   temps_de_lecture INT NOT NULL,
   date_de_creation DATE NOT NULL,
   contenu_article VARCHAR(1000) NOT NULL,
   image VARCHAR(255) NOT NULL,
   id_categorie INT NOT NULL,
   id_auteur INT NOT NULL,
   PRIMARY KEY(id_article),
   FOREIGN KEY(id_categorie) REFERENCES categorie(id_categorie),
   FOREIGN KEY(id_auteur) REFERENCES auteur(id_auteur)
) ENGINE=InnoDB;

CREATE TABLE commentaire (
   id_commentaire INT AUTO_INCREMENT,
   texte_commentaire VARCHAR(255) NOT NULL,
   date_commentaire DATE NOT NULL,
   id_auteur INT NOT NULL,
   id_article INT NOT NULL,
   PRIMARY KEY(id_commentaire),
   FOREIGN KEY(id_auteur) REFERENCES auteur(id_auteur),
   FOREIGN KEY(id_article) REFERENCES article(id_article) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE taguer (
   id_article INT,
   id_tag INT,
   PRIMARY KEY(id_article, id_tag),
   FOREIGN KEY(id_article) REFERENCES article(id_article) ON DELETE CASCADE,
   FOREIGN KEY(id_tag) REFERENCES tag(id_tag) ON DELETE CASCADE
) ENGINE=InnoDB;
