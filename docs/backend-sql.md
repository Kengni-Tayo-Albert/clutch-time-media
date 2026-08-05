# Backend SQL - Clutch Time Media

## Objectif

Ce backend relie le site Clutch Time Media a la base MySQL `blog`.

Architecture :

```text
Front HTML/CSS/JS -> API Node.js/Express -> Base MySQL blog
```

## Prerequis

- MySQL lance en local
- Base `blog` creee dans DBeaver
- Scripts SQL executes dans l'ordre :
  - `01_creation_base_blog.sql`
  - `02_creation_tables_blog.sql`
  - `03_peuplement_blog.sql`

## Installation

Dans le dossier du projet :

```bash
npm install
```

Copier le fichier d'exemple :

```bash
copy .env.example .env
```

Puis adapter `.env` si besoin :

```text
DB_USER=root
DB_PASSWORD=ton_mot_de_passe_mysql
DB_NAME=blog
```

## Lancement

```bash
npm start
```

Le site sera disponible ici :

```text
http://localhost:3000
```

## Routes API principales

```text
GET    /api/health
GET    /api/articles
GET    /api/articles/:id
POST   /api/articles
PUT    /api/articles/:id
DELETE /api/articles/:id
GET    /api/articles/:id/comments
POST   /api/articles/:id/comments
```

## Demonstrations possibles

Afficher les articles depuis MySQL :

```text
http://localhost:3000/api/articles
```

Afficher les commentaires d'un article :

```text
http://localhost:3000/api/articles/1/comments
```

Depuis le site, la page detail d'un article permet aussi d'ajouter un commentaire. Le commentaire est enregistre dans la table `commentaire`, puis relie a `article` et `auteur` avec des cles etrangeres.

## Securite minimale

Le backend contient plusieurs protections simples :

```text
.env garde le mot de passe MySQL hors du code.
.gitignore evite de versionner .env et node_modules.
mysql2 execute des requetes preparees avec des parametres.
express.json limite la taille des donnees recues.
Les champs des articles et commentaires sont verifies avant l'insertion SQL.
Les identifiants dans les URL sont controles.
Le CORS est limite aux origines locales autorisees.
```
