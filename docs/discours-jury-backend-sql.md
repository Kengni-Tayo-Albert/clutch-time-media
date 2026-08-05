# Discours Jury - Backend SQL

## 1. Introduction

Bonjour, je vais vous presenter la partie backend SQL de mon projet Clutch Time Media.

Clutch Time Media est un blog autour du basket et de la NBA. Au depart, le site etait principalement un projet front-end : les articles etaient affiches depuis un fichier JSON local.

Pour couvrir le bloc de competence lie au backend et aux bases de donnees relationnelles, j'ai fait evoluer le projet vers une architecture plus complete avec une base MySQL, un backend Node.js / Express et une API.

## 2. Avant Et Maintenant

Avant :

```text
Front-end -> articles.json
```

Le site lisait les articles directement depuis un fichier JSON. C'etait suffisant pour afficher des donnees, mais ce n'etait pas une vraie base relationnelle.

Maintenant :

```text
Front-end -> API Express -> MySQL
```

Le front-end utilise `fetch()` pour appeler le backend. Le backend execute ensuite des requetes SQL vers la base MySQL `blog`.

## 3. Modelisation

J'ai commence par la modelisation avec Looping.

J'ai identifie les entites principales du blog :

```text
Article
Auteur
Categorie
Commentaire
Tag
```

Puis j'ai defini les relations :

```text
Un auteur peut ecrire plusieurs articles.
Un article appartient a une categorie.
Un article peut recevoir plusieurs commentaires.
Un commentaire est redige par un auteur.
Un article peut avoir plusieurs tags.
```

La relation entre les articles et les tags est une relation plusieurs-a-plusieurs. Pour la gerer en SQL, j'ai cree une table d'association appelee `taguer`.

## 4. Base De Donnees Dans DBeaver

Dans DBeaver, j'ai cree une base MySQL appelee `blog`.

Elle contient les tables :

```text
article
auteur
categorie
commentaire
tag
taguer
```

Chaque table possede une cle primaire, par exemple `id_article` pour la table `article`.

Les relations sont gerees avec des cles etrangeres :

```text
article.id_auteur -> auteur.id_auteur
article.id_categorie -> categorie.id_categorie
commentaire.id_article -> article.id_article
commentaire.id_auteur -> auteur.id_auteur
taguer.id_article -> article.id_article
taguer.id_tag -> tag.id_tag
```

## 5. Scripts SQL

J'ai organise les scripts SQL dans un ordre clair :

```text
01_creation_base_blog.sql
02_creation_tables_blog.sql
03_peuplement_blog.sql
04_crud_blog.sql
05_requetes_jury_blog.sql
06_verification_finale_blog.sql
```

Le script `01` cree la base.

Le script `02` cree les tables et les relations.

Le script `03` insere les articles du vrai site.

Le script `04` montre le CRUD : creation, lecture, modification et suppression.

Le script `05` contient les requetes demandees, comme les recherches, les filtres, les tris et les statistiques.

Le script `06` verifie les relations avec des jointures.

## 6. Backend Node.js / Express

J'ai ensuite ajoute un backend avec Node.js et Express.

Le backend sert d'intermediaire entre le site et MySQL. Le navigateur ne se connecte pas directement a la base de donnees.

La connexion MySQL est configuree dans un fichier `.env`, pour ne pas mettre le mot de passe directement dans le code.

Les requetes SQL sont placees dans des fichiers repository :

```text
articles.repository.js
comments.repository.js
```

Cela permet de separer les routes API et les requetes SQL.

## 7. Routes API

Les principales routes API sont :

```text
GET /api/articles
GET /api/articles/:id
POST /api/articles
PUT /api/articles/:id
DELETE /api/articles/:id
GET /api/articles/:id/comments
POST /api/articles/:id/comments
```

Par exemple, quand le site appelle :

```text
GET /api/articles
```

Le backend execute une requete SQL avec des jointures pour recuperer les articles, leur auteur et leur categorie.

## 8. Demonstration A Faire

Je peux montrer d'abord l'API :

```text
http://localhost:3000/api/articles
```

Cela affiche les articles au format JSON.

Ensuite, je peux montrer la page articles du site :

```text
http://localhost:3000/assets/pages/articles.html
```

Les articles affiches viennent maintenant de MySQL via le backend.

Je peux aussi creer un article depuis le formulaire du site, puis verifier dans DBeaver que l'article a bien ete insere dans la table `article`.

Enfin, je peux ajouter un commentaire depuis la page detail d'un article, puis verifier dans DBeaver que le commentaire est bien relie a l'article et a son auteur.

## 9. Difference Avec MongoDB

Avant de passer a la comparaison avec MongoDB, je peux aussi expliquer les securites minimales mises en place.

Le mot de passe MySQL n'est pas ecrit directement dans le code : il est place dans un fichier `.env`.

Ce fichier `.env` est ignore par Git grace au fichier `.gitignore`.

Les requetes SQL utilisent `mysql2` avec des parametres, ce qui evite de construire les requetes en concatenant directement les textes saisis par l'utilisateur.

J'ai aussi ajoute des validations cote backend : par exemple les champs obligatoires, les longueurs maximales, le temps de lecture, les dates et les identifiants dans les URL.

## 10. Difference Avec MongoDB

Avec MongoDB, j'ai l'habitude de travailler avec des documents. Un article peut contenir directement ses commentaires, son auteur et ses tags dans un meme document.

Avec MySQL, les donnees sont separees dans plusieurs tables. Les tables sont ensuite reliees avec des identifiants.

La difference principale est donc :

```text
MongoDB : structure orientee document, plus souple.
MySQL : structure relationnelle, plus stricte, avec des tables et des relations.
```

Dans ce projet, MySQL est interessant parce qu'il permet de montrer clairement les relations entre les articles, les auteurs, les categories, les commentaires et les tags.

## 11. Conclusion

Pour resumer, j'ai fait evoluer Clutch Time Media d'un site front-end utilisant un fichier JSON vers une application connectee a une vraie base SQL.

J'ai modelise la base, cree les tables, ajoute les relations, teste le CRUD, developpe un backend Express et connecte le front-end a MySQL.

Cela me permet de presenter une chaine complete :

```text
site web -> API backend -> requetes SQL -> base MySQL
```

Et je peux verifier les donnees directement dans DBeaver.
