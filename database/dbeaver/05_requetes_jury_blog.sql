-- 05_requetes_jury_blog.sql
-- Objectif : executer les requetes demandees pour analyser les donnees du blog.
-- Le mot de recherche utilise ici est "NBA", car il existe dans les vrais articles du site.

USE blog;

-- 1. Afficher les commentaires d'un article donne par son id_article.
SELECT 
   c.id_commentaire,
   c.texte_commentaire,
   c.date_commentaire,
   a.nom_auteur AS auteur_commentaire
FROM commentaire c
JOIN auteur a ON c.id_auteur = a.id_auteur
WHERE c.id_article = 1;

-- 2. Afficher les articles contenant le mot "NBA" dans le texte.
SELECT 
   id_article,
   titre,
   contenu_article
FROM article
WHERE contenu_article LIKE '%NBA%';

-- 3. Afficher les articles contenant le mot "NBA" dans le titre.
SELECT 
   id_article,
   titre
FROM article
WHERE titre LIKE '%NBA%';

-- 4. Afficher les articles contenant le mot "NBA" dans le texte et dans le titre.
SELECT 
   id_article,
   titre,
   contenu_article
FROM article
WHERE titre LIKE '%NBA%'
  AND contenu_article LIKE '%NBA%';

-- 5. Afficher les 5 articles les plus recents.
SELECT 
   id_article,
   titre,
   date_de_creation
FROM article
ORDER BY date_de_creation DESC
LIMIT 5;

-- 6. Afficher les articles dont le temps de lecture est inferieur a 60 minutes.
SELECT 
   id_article,
   titre,
   temps_de_lecture
FROM article
WHERE temps_de_lecture < 60;

-- 7. Afficher les articles dont le temps de lecture est compris entre 3 et 5 minutes.
SELECT 
   id_article,
   titre,
   temps_de_lecture
FROM article
WHERE temps_de_lecture BETWEEN 3 AND 5;

-- 8. Afficher les articles postes entre deux dates.
SELECT 
   id_article,
   titre,
   date_de_creation
FROM article
WHERE date_de_creation BETWEEN '2026-02-01' AND '2026-04-10';

-- 9. Afficher le nombre d'articles par categorie.
SELECT 
   ca.nom_categorie,
   COUNT(ar.id_article) AS nombre_articles
FROM categorie ca
LEFT JOIN article ar ON ca.id_categorie = ar.id_categorie
GROUP BY ca.id_categorie, ca.nom_categorie;

-- 10. Afficher le nombre de commentaires par article.
SELECT 
   ar.id_article,
   ar.titre,
   COUNT(c.id_commentaire) AS nombre_commentaires
FROM article ar
LEFT JOIN commentaire c ON ar.id_article = c.id_article
GROUP BY ar.id_article, ar.titre;

-- 11. Afficher le nombre de tags par article.
SELECT 
   ar.id_article,
   ar.titre,
   COUNT(tg.id_tag) AS nombre_tags
FROM article ar
LEFT JOIN taguer tg ON ar.id_article = tg.id_article
GROUP BY ar.id_article, ar.titre;

-- 12. Afficher la moyenne de temps de lecture de tous les articles.
SELECT 
   AVG(temps_de_lecture) AS moyenne_temps_lecture
FROM article;

-- 13. Afficher la moyenne de temps de lecture par categorie.
SELECT 
   ca.nom_categorie,
   AVG(ar.temps_de_lecture) AS moyenne_temps_lecture
FROM categorie ca
LEFT JOIN article ar ON ca.id_categorie = ar.id_categorie
GROUP BY ca.id_categorie, ca.nom_categorie;
