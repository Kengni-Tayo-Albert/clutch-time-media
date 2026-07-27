USE blog;

-- CREATE : creer un nouvel article
INSERT INTO article (
   titre,
   resume,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
) VALUES (
   'Nouvel article test CRUD',
   'Resume de l article cree pour tester le CRUD.',
   40,
   CURDATE(),
   'Contenu de test pour verifier la creation d un article.',
   './assets/img/hero-section.svg',
   1,
   1
);

-- READ : afficher les derniers articles
SELECT *
FROM article
ORDER BY date_de_creation DESC;

-- READ : afficher un article precis
SELECT *
FROM article
WHERE id_article = 1;

-- UPDATE : modifier le titre et le resume d'un article
UPDATE article
SET titre = 'Article modifie avec SQL',
    resume = 'Resume modifie avec une requete UPDATE.'
WHERE id_article = 1;

-- CREATE : creer un commentaire
INSERT INTO commentaire (
   texte_commentaire,
   date_commentaire,
   id_auteur,
   id_article
) VALUES (
   'Commentaire cree avec SQL.',
   CURDATE(),
   2,
   1
);

-- DELETE : supprimer un commentaire de test
DELETE FROM commentaire
WHERE texte_commentaire = 'Commentaire cree avec SQL.';

-- DELETE : supprimer l'article de test cree au debut du fichier
DELETE FROM article
WHERE titre = 'Nouvel article test CRUD';
