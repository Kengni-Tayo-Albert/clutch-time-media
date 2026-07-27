USE blog;

-- Verification 1 : les tables existent.
SHOW TABLES;

-- Verification 2 : les donnees sont presentes.
SELECT 'categorie' AS table_name, COUNT(*) AS total FROM categorie
UNION ALL
SELECT 'tag', COUNT(*) FROM tag
UNION ALL
SELECT 'auteur', COUNT(*) FROM auteur
UNION ALL
SELECT 'article', COUNT(*) FROM article
UNION ALL
SELECT 'commentaire', COUNT(*) FROM commentaire
UNION ALL
SELECT 'taguer', COUNT(*) FROM taguer;

-- Verification 3 : les articles sont bien relies aux auteurs et categories.
SELECT ar.id_article,
       ar.titre,
       au.nom_auteur,
       cat.nom_categorie
FROM article ar
JOIN auteur au ON au.id_auteur = ar.id_auteur
JOIN categorie cat ON cat.id_categorie = ar.id_categorie
ORDER BY ar.id_article;

-- Verification 4 : les commentaires sont bien relies aux articles.
SELECT c.id_commentaire,
       c.texte_commentaire,
       ar.titre AS article,
       au.nom_auteur AS auteur_commentaire
FROM commentaire c
JOIN article ar ON ar.id_article = c.id_article
JOIN auteur au ON au.id_auteur = c.id_auteur
ORDER BY c.id_commentaire;
