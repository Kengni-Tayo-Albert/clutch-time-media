-- 06_verification_finale_blog.sql
-- Objectif : verifier que la base blog est complete, remplie et relationnelle.

USE blog;

-- 1. Verifier que les tables existent.
SHOW TABLES;

-- 2. Verifier le nombre de donnees dans chaque table.
SELECT 'categorie' AS table_nom, COUNT(*) AS total FROM categorie
UNION ALL
SELECT 'auteur', COUNT(*) FROM auteur
UNION ALL
SELECT 'tag', COUNT(*) FROM tag
UNION ALL
SELECT 'article', COUNT(*) FROM article
UNION ALL
SELECT 'commentaire', COUNT(*) FROM commentaire
UNION ALL
SELECT 'taguer', COUNT(*) FROM taguer;

-- 3. Verifier les articles avec leur auteur et leur categorie.
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

-- 4. Verifier les commentaires avec article et auteur.
SELECT 
   c.id_commentaire,
   c.texte_commentaire,
   c.date_commentaire,
   ar.titre AS article,
   au.nom_auteur AS auteur_commentaire
FROM commentaire c
JOIN article ar ON c.id_article = ar.id_article
JOIN auteur au ON c.id_auteur = au.id_auteur
ORDER BY c.date_commentaire DESC;

-- 5. Verifier les tags associes aux articles.
SELECT 
   ar.titre,
   t.texte_descriptif AS tag
FROM taguer tg
JOIN article ar ON tg.id_article = ar.id_article
JOIN tag t ON tg.id_tag = t.id_tag
ORDER BY ar.id_article, t.texte_descriptif;
