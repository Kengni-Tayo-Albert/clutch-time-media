# Soutenance - Backend SQL Clutch Time Media

## Objectif Du Bloc

Ce projet montre la mise en place d'une partie backend connectee a une base de donnees relationnelle MySQL.

Competences couvertes :

- modeliser une base de donnees relationnelle ;
- creer une base SQL avec des tables reliees ;
- utiliser des cles primaires et des cles etrangeres ;
- executer des requetes CRUD ;
- connecter un backend Node.js / Express a MySQL ;
- faire communiquer le front-end avec le backend via une API ;
- verifier les donnees dans DBeaver.

## Architecture Du Projet

```text
Front-end HTML / CSS / JavaScript
        |
        | fetch()
        v
Backend Node.js / Express
        |
        | Requetes SQL avec mysql2
        v
Base MySQL blog
```

Avant l'ajout du backend, les articles etaient lus depuis `assets/data/articles.json`.
Maintenant, le site peut lire et creer des donnees depuis MySQL grace a l'API.

## 1. Modelisation Avec Looping

Le MCD represente les entites principales du blog :

```text
Article
Auteur
Categorie
Commentaire
Tag
```

Relations importantes :

```text
Un auteur peut ecrire plusieurs articles.
Un article est ecrit par un seul auteur.
Une categorie peut classer plusieurs articles.
Un article appartient a une seule categorie.
Un article peut recevoir plusieurs commentaires.
Un commentaire concerne un seul article.
Un auteur peut rediger plusieurs commentaires.
Un article peut avoir plusieurs tags.
Un tag peut etre associe a plusieurs articles.
```

La relation entre `article` et `tag` est une relation plusieurs-a-plusieurs. Elle est transformee en table d'association SQL :

```text
taguer
```

## 2. Base SQL Dans DBeaver

La base utilisee s'appelle :

```text
blog
```

Les tables finales sont :

```text
categorie
tag
auteur
article
commentaire
taguer
```

Les scripts DBeaver propres sont ranges dans :

```text
database/dbeaver/
```

Ordre d'execution :

```text
01_creation_base_blog.sql
02_creation_tables_blog.sql
03_peuplement_blog.sql
04_crud_blog.sql
05_requetes_jury_blog.sql
06_verification_finale_blog.sql
```

## 3. Role Des Scripts SQL

`01_creation_base_blog.sql`

```text
Cree la base de donnees blog.
```

`02_creation_tables_blog.sql`

```text
Cree les tables, les cles primaires et les cles etrangeres.
```

`03_peuplement_blog.sql`

```text
Insere les donnees du vrai site Clutch Time Media dans MySQL.
```

Donnees principales :

```text
LeBron James brille encore a 42 ans
OKC champion NBA
La saison parfaite du Thunder
Le King reste incontournable
```

`04_crud_blog.sql`

```text
Demontre CREATE, READ, UPDATE, DELETE sur un article de test.
```

`05_requetes_jury_blog.sql`

```text
Contient les requetes demandees : recherches, filtres, tris, statistiques, jointures.
```

`06_verification_finale_blog.sql`

```text
Verifie que les relations fonctionnent avec des jointures.
```

## 4. Requetes SQL Importantes A Montrer

Afficher les articles avec leur auteur et leur categorie :

```sql
SELECT
   ar.id_article,
   ar.titre,
   au.nom_auteur,
   ca.nom_categorie,
   ar.temps_de_lecture,
   ar.date_de_creation
FROM article ar
JOIN auteur au ON ar.id_auteur = au.id_auteur
JOIN categorie ca ON ar.id_categorie = ca.id_categorie
ORDER BY ar.date_de_creation DESC;
```

Afficher les commentaires d'un article :

```sql
SELECT
   c.id_commentaire,
   c.texte_commentaire,
   c.date_commentaire,
   au.nom_auteur,
   ar.titre AS article
FROM commentaire c
JOIN auteur au ON c.id_auteur = au.id_auteur
JOIN article ar ON c.id_article = ar.id_article
WHERE ar.id_article = 1;
```

Afficher le nombre d'articles par categorie :

```sql
SELECT
   ca.nom_categorie,
   COUNT(ar.id_article) AS nombre_articles
FROM categorie ca
LEFT JOIN article ar ON ca.id_categorie = ar.id_categorie
GROUP BY ca.id_categorie, ca.nom_categorie;
```

Afficher le nombre de tags par article :

```sql
SELECT
   ar.id_article,
   ar.titre,
   COUNT(tg.id_tag) AS nombre_tags
FROM article ar
LEFT JOIN taguer tg ON ar.id_article = tg.id_article
GROUP BY ar.id_article, ar.titre;
```

## 5. Backend Node.js / Express

Le backend se trouve dans :

```text
server/
```

Fichiers principaux :

```text
server/app.js
server/db.js
server/articles.repository.js
server/comments.repository.js
```

Role des fichiers :

```text
app.js : declare les routes API.
db.js : configure la connexion MySQL.
articles.repository.js : contient les requetes SQL pour les articles.
comments.repository.js : contient les requetes SQL pour les commentaires.
```

La connexion MySQL utilise le fichier `.env` :

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=blog
```

Le fichier `.env` n'est pas versionne grace a `.gitignore`.

## 6. URLs Finales A Montrer

Front GitHub Pages :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/articles.html
```

Backend Railway :

```text
https://clutch-time-media-production.up.railway.app
```

Routes API de preuve :

```text
https://clutch-time-media-production.up.railway.app/api/health
https://clutch-time-media-production.up.railway.app/api/articles
https://clutch-time-media-production.up.railway.app/api/articles/5/comments
```

Preuve fonctionnelle :

```text
Un article de test a ete cree depuis le site public GitHub Pages.
Il est visible dans /api/articles.
Un commentaire a ete cree sur l'article 5.
Il est visible dans /api/articles/5/comments.
```

## 7. Routes API A Connaitre

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

## 8. Demonstrations A Faire Au Jury

### Demonstration 1 - API Articles

Ouvrir dans le navigateur :

```text
https://clutch-time-media-production.up.railway.app/api/articles
```

Preuve :

```text
Les articles sont renvoyes en JSON depuis MySQL.
```

### Demonstration 2 - Site Articles

Ouvrir :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/articles.html
```

Preuve :

```text
Le front affiche les articles venant de l'API.
```

### Demonstration 3 - Creation D'Article

Ouvrir :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/creation-article.html
```

Creer un article test depuis le formulaire.

Preuve dans DBeaver :

```sql
SELECT
   ar.id_article,
   ar.titre,
   ar.resumer,
   au.nom_auteur,
   ca.nom_categorie
FROM article ar
JOIN auteur au ON ar.id_auteur = au.id_auteur
JOIN categorie ca ON ar.id_categorie = ca.id_categorie
ORDER BY ar.id_article DESC;
```

### Demonstration 4 - Creation De Commentaire

Ouvrir une page detail :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/article-detail.html?id=5
```

Ajouter un commentaire depuis le formulaire.

Preuve dans DBeaver :

```sql
SELECT
   c.id_commentaire,
   c.texte_commentaire,
   c.date_commentaire,
   au.nom_auteur,
   ar.titre AS article
FROM commentaire c
JOIN auteur au ON c.id_auteur = au.id_auteur
JOIN article ar ON c.id_article = ar.id_article
ORDER BY c.id_commentaire DESC;
```

## 9. Securite Minimale

Elements mis en place :

```text
.env pour ne pas ecrire le mot de passe MySQL dans le code.
.gitignore pour eviter de publier .env et node_modules.
Requetes preparees avec mysql2 pour limiter les injections SQL.
Limite de taille sur les donnees JSON envoyees au backend.
Validation des champs article et commentaire avant insertion.
Controle des identifiants dans les routes avec :id.
Configuration CORS limitee aux origines locales autorisees.
Gestion des erreurs serveur.
```

## 10. Difference Avec MongoDB

MongoDB stocke les donnees sous forme de documents souples.

```text
Un article peut contenir directement son auteur, ses tags et ses commentaires.
```

MySQL organise les donnees dans des tables reliees.

```text
article.id_auteur pointe vers auteur.id_auteur
article.id_categorie pointe vers categorie.id_categorie
commentaire.id_article pointe vers article.id_article
taguer relie article et tag
```

Phrase simple pour la soutenance :

```text
MongoDB est oriente documents, alors que MySQL est relationnel. Dans ce projet, MySQL me permet de montrer clairement les relations entre articles, auteurs, categories, commentaires et tags.
```

## 11. Discours Court Pour Le Jury

```text
Au depart, mon site Clutch Time Media affichait les articles depuis un fichier JSON.
Pour couvrir le bloc SQL relationnel, j'ai commence par modeliser la base avec Looping.
J'ai ensuite cree la base blog dans MySQL avec DBeaver, puis les tables article, auteur, categorie, commentaire, tag et taguer.
J'ai ajoute les cles primaires, les cles etrangeres et les relations.
Ensuite, j'ai developpe un backend Node.js / Express connecte a MySQL.
Le front appelle maintenant l'API avec fetch().
Les articles et les commentaires peuvent etre lus et crees depuis le site, puis verifies dans DBeaver.
```
