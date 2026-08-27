# Clutch Time Media

Clutch Time Media est une application web de type blog consacree au basketball et a la NBA.

Le projet a d'abord ete construit comme un site front-end HTML, CSS et JavaScript. Il a ensuite ete complete avec une base de donnees relationnelle MySQL, un backend Node.js / Express et un deploiement en ligne afin de couvrir le bloc de competence SQL relationnel du titre professionnel.

## Statut du projet

Le projet est maintenant une application full stack pour la partie blog dynamique.

Chaine de fonctionnement en production :

```text
GitHub Pages -> Backend Railway -> MySQL Railway
```

Ce que cela signifie concretement :

- le front-end est heberge sur GitHub Pages ;
- le backend Node.js / Express est heberge sur Railway ;
- les articles et commentaires sont stockes dans une base MySQL Railway ;
- le site appelle l'API Railway avec `fetch()` ;
- les donnees sont lues et creees dans une base SQL relationnelle.

Nuance importante : les pages purement statiques comme certaines pages de navigation, de presentation ou de contact restent du front-end classique. La partie blog, articles et commentaires est bien connectee au backend et a MySQL.

## URLs en ligne

Site public :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/
```

Page articles :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/articles.html
```

Backend Railway :

```text
https://clutch-time-media-production.up.railway.app
```

Routes de verification :

```text
https://clutch-time-media-production.up.railway.app/api/health
https://clutch-time-media-production.up.railway.app/api/articles
https://clutch-time-media-production.up.railway.app/api/articles/5/comments
```

## Objectif pedagogique

Ce projet permet de montrer les competences suivantes :

- mettre en place une base de donnees relationnelle ;
- modeliser les donnees avec un MCD ;
- creer des tables SQL avec cles primaires et cles etrangeres ;
- ecrire des requetes SQL avec jointures ;
- realiser des operations CRUD ;
- developper un backend qui accede a MySQL ;
- connecter un front-end a une API ;
- deployer une application web dynamique.

Ce travail correspond notamment au bloc :

```text
RNCP37674BC02 - Developper la partie back-end d'une application web ou web mobile securisee
```

## Fonctionnalites connectees a MySQL

Les fonctionnalites suivantes utilisent la base MySQL via le backend :

- affichage de la liste des articles ;
- affichage du detail d'un article ;
- creation d'un nouvel article ;
- affichage des commentaires d'un article ;
- creation d'un commentaire ;
- verification des donnees depuis les routes API ;
- verification des donnees dans DBeaver ou Railway.

Exemple valide en production :

```text
Article : Test production SQL
Auteur : Alberto TAYO
Categorie : Players
Commentaire : Excellent
Auteur du commentaire : Oscar
```

## Architecture technique

```text
assets/pages/*.html
assets/js/*.js
        |
        | fetch()
        v
server/app.js
        |
        | mysql2
        v
Base MySQL blog
```

Le front-end ne se connecte pas directement a MySQL. Il passe par le backend Express.

## Stack technique

Front-end :

- HTML
- CSS
- JavaScript
- GitHub Pages

Back-end :

- Node.js
- Express
- mysql2
- dotenv
- Railway

Base de donnees :

- MySQL
- DBeaver
- Looping pour le MCD

## Modele relationnel

La base `blog` contient les tables suivantes :

```text
categorie
auteur
article
commentaire
tag
taguer
```

Relations principales :

```text
Un auteur peut ecrire plusieurs articles.
Un article appartient a une categorie.
Un article peut recevoir plusieurs commentaires.
Un commentaire est redige par un auteur.
Un article peut avoir plusieurs tags.
Un tag peut etre associe a plusieurs articles.
```

La table `taguer` est une table d'association entre `article` et `tag`.

## Scripts SQL

Les scripts SQL sont ranges dans :

```text
database/dbeaver/
```

Ordre conseille :

```text
01_creation_base_blog.sql
02_creation_tables_blog.sql
03_peuplement_blog.sql
04_crud_blog.sql
05_requetes_jury_blog.sql
06_verification_finale_blog.sql
```

Role des scripts :

- `01_creation_base_blog.sql` : creation de la base `blog` ;
- `02_creation_tables_blog.sql` : creation des tables relationnelles ;
- `03_peuplement_blog.sql` : insertion des donnees du blog ;
- `04_crud_blog.sql` : exemples Create, Read, Update, Delete ;
- `05_requetes_jury_blog.sql` : requetes demandees pour la soutenance ;
- `06_verification_finale_blog.sql` : controles finaux de la base.

## Routes API

Routes principales du backend :

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

Exemples :

```text
GET /api/articles
```

Permet de recuperer les articles depuis MySQL.

```text
GET /api/articles/5/comments
```

Permet de recuperer les commentaires de l'article 5.

## Requete SQL avec jointures

Exemple de requete utilisee pour afficher les articles avec leur auteur et leur categorie :

```sql
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
ORDER BY ar.date_de_creation DESC, ar.id_article DESC;
```

Cette requete montre l'interet de la base relationnelle : les informations viennent de plusieurs tables reliees.

## Securite minimale

Elements mis en place :

- le mot de passe MySQL n'est pas ecrit dans le code ;
- les variables sensibles sont dans `.env` ou dans Railway Variables ;
- `.env` est ignore par Git ;
- les requetes SQL utilisent `mysql2` avec des parametres ;
- les champs envoyes par les formulaires sont verifies cote backend ;
- les identifiants dans les routes sont controles ;
- le backend limite les origines autorisees avec CORS.

## Installation locale

Installer les dependances :

```bash
npm install
```

Creer le fichier `.env` a partir de l'exemple :

```bash
copy .env.example .env
```

Configurer les variables locales :

```text
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=blog
```

Lancer le backend :

```bash
npm start
```

Tester en local :

```text
http://localhost:3000/api/health
http://localhost:3000/api/articles
```

## Documentation de soutenance

Documents utiles :

```text
docs/backend-sql.md
docs/deploiement-backend-sql.md
docs/discours-jury-backend-sql.md
docs/soutenance-backend-sql.md
docs/soutenance-sql-clutch-time-media.md
output/pdf/soutenance-sql-clutch-time-media.pdf
```

## Discours court pour le jury

```text
Au depart, Clutch Time Media etait un site front-end qui affichait des articles.
Pour couvrir la competence SQL relationnelle, j'ai modelise une base de donnees de blog avec Looping, puis je l'ai creee dans MySQL avec DBeaver.

J'ai ajoute les tables article, auteur, categorie, commentaire, tag et taguer, avec des cles primaires et des cles etrangeres.

Ensuite, j'ai developpe un backend Node.js / Express. Le site appelle ce backend avec fetch, et le backend execute les requetes SQL vers MySQL.

Enfin, j'ai deploye le front sur GitHub Pages, le backend sur Railway et la base MySQL sur Railway. La chaine finale est donc : GitHub Pages, API Railway, MySQL Railway.
```

## Auteur

Projet realise dans le cadre de la formation developpeur web.

