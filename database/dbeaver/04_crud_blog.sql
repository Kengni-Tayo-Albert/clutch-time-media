-- 04_crud_blog.sql
-- Objectif : demontrer les operations CRUD sur la table article.
-- CRUD = Create, Read, Update, Delete.

USE blog;

-- CREATE : ajouter un nouvel article de test.
INSERT INTO article (
   titre,
   resumer,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
) VALUES (
   'Article test CRUD',
   'Article cree pour verifier les operations CRUD.',
   3,
   '2026-08-02',
   'Ce contenu sert uniquement a tester la creation, la lecture, la modification et la suppression.',
   './assets/img/hero-section.svg',
   1,
   1
);

-- READ : afficher l'article cree.
SELECT 
   id_article,
   titre,
   resumer,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
FROM article
WHERE titre = 'Article test CRUD';

-- UPDATE : modifier l'article de test.
UPDATE article
SET 
   temps_de_lecture = 4,
   resumer = 'Article modifie pour verifier UPDATE.'
WHERE titre = 'Article test CRUD';

-- READ : afficher l'article apres modification.
SELECT 
   id_article,
   titre,
   resumer,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
FROM article
WHERE titre = 'Article test CRUD';

-- DELETE : supprimer l'article de test.
DELETE FROM article
WHERE titre = 'Article test CRUD';

-- READ final : verifier que l'article a bien ete supprime.
SELECT 
   id_article,
   titre,
   resumer,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
FROM article
WHERE titre = 'Article test CRUD';
