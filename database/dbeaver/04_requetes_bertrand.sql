USE blog;

-- 1. Afficher les commentaires d'un article donne
SELECT c.id_commentaire,
       c.texte_commentaire,
       c.date_commentaire,
       a.nom_auteur
FROM commentaire c
JOIN auteur a ON a.id_auteur = c.id_auteur
WHERE c.id_article = 1;

-- 2. Afficher les articles comportant un mot donne dans le texte
SELECT id_article, titre, contenu_article
FROM article
WHERE contenu_article LIKE '%logiciel%';

-- 3. Afficher les articles comportant un mot donne dans le titre
SELECT id_article, titre
FROM article
WHERE titre LIKE '%logiciel%';

-- 4. Afficher les articles comportant un mot donne dans le texte et le titre
SELECT id_article, titre, contenu_article
FROM article
WHERE titre LIKE '%logiciel%'
  AND contenu_article LIKE '%logiciel%';

-- 5. Afficher les 5 articles les plus recents
SELECT id_article, titre, date_de_creation
FROM article
ORDER BY date_de_creation DESC
LIMIT 5;

-- 6. Afficher les articles dont le temps de lecture est inferieur a 60 minutes
SELECT id_article, titre, temps_de_lecture
FROM article
WHERE temps_de_lecture < 60;

-- 7. Afficher les articles dont le temps de lecture est compris entre 45 et 90 minutes
SELECT id_article, titre, temps_de_lecture
FROM article
WHERE temps_de_lecture BETWEEN 45 AND 90;

-- 8. Afficher les articles postes entre 2 dates
SELECT id_article, titre, date_de_creation
FROM article
WHERE date_de_creation BETWEEN '2026-07-01' AND '2026-07-10';

-- 9. Afficher le nombre d'articles par categorie
SELECT cat.nom_categorie,
       COUNT(ar.id_article) AS nombre_articles
FROM categorie cat
LEFT JOIN article ar ON ar.id_categorie = cat.id_categorie
GROUP BY cat.id_categorie, cat.nom_categorie;

-- 10. Afficher le nombre de commentaires par article
SELECT ar.id_article,
       ar.titre,
       COUNT(c.id_commentaire) AS nombre_commentaires
FROM article ar
LEFT JOIN commentaire c ON c.id_article = ar.id_article
GROUP BY ar.id_article, ar.titre;

-- 11. Afficher le nombre de tags par article
SELECT ar.id_article,
       ar.titre,
       COUNT(tg.id_tag) AS nombre_tags
FROM article ar
LEFT JOIN taguer tg ON tg.id_article = ar.id_article
GROUP BY ar.id_article, ar.titre;

-- 12. Afficher la moyenne de temps de lecture de tous les articles
SELECT AVG(temps_de_lecture) AS moyenne_temps_lecture
FROM article;

-- 13. Afficher la moyenne de temps de lecture par categorie
SELECT cat.nom_categorie,
       AVG(ar.temps_de_lecture) AS moyenne_temps_lecture
FROM categorie cat
LEFT JOIN article ar ON ar.id_categorie = cat.id_categorie
GROUP BY cat.id_categorie, cat.nom_categorie;
