-- 03_peuplement_blog.sql
-- Objectif : inserer les donnees du vrai site Clutch Time Media dans la base blog.

USE blog;

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE taguer;
TRUNCATE TABLE commentaire;
TRUNCATE TABLE article;
TRUNCATE TABLE tag;
TRUNCATE TABLE auteur;
TRUNCATE TABLE categorie;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO categorie (id_categorie, nom_categorie) VALUES
(1, 'Players'),
(2, 'Teams');

INSERT INTO auteur (id_auteur, nom_auteur, email_auteur) VALUES
(1, 'Sarah Connord', 'sarah.connord@clutchtime.fr'),
(2, 'Tom Tatum', 'tom.tatum@clutchtime.fr'),
(3, 'Albert Foster', 'albert.foster@clutchtime.fr'),
(4, 'Maya Reader', 'maya.reader@clutchtime.fr');

INSERT INTO tag (id_tag, texte_descriptif) VALUES
(1, 'NBA'),
(2, 'LeBron James'),
(3, 'MVP'),
(4, 'Oklahoma City Thunder'),
(5, 'Champion'),
(6, 'Saison'),
(7, 'Leadership');

INSERT INTO article (
   id_article,
   titre,
   resumer,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
) VALUES
(1, 'LeBron James brille encore a 42 ans', 'LeBron James continue d impressionner en NBA avec des performances dignes d un MVP.', 3, '2026-03-31', 'LeBron James continue de repousser les limites de la longevite en NBA. Son experience, sa lecture du jeu et sa capacite a rester performant en font encore une reference pour toute une generation.', './assets/img/Lbj.svg', 1, 1),
(2, 'OKC champion NBA', 'Les Oklahoma City Thunder sont champions NBA apres un parcours exceptionnel.', 5, '2026-04-06', 'Oklahoma City remporte un titre NBA historique. Entre jeunesse, intensite defensive et progression collective, la franchise valide un projet sportif construit sur plusieurs saisons.', './assets/img/okc-champions-nba.svg', 2, 2),
(3, 'La saison parfaite du Thunder', 'OKC confirme son statut avec une saison maitrisee de bout en bout.', 5, '2026-02-06', 'La montee en puissance du Thunder repose sur un collectif equilibre, une defense agressive et des joueurs capables de faire la difference dans les moments importants.', './assets/img/okc-champs.svg', 2, 3),
(4, 'Le King reste incontournable', 'LeBron James montre encore pourquoi il reste une legende vivante de la NBA.', 4, '2026-03-31', 'Au-dela des statistiques, LeBron influence le rythme, le placement et la confiance de ses coequipiers. Son impact reste visible dans toutes les phases du jeu.', './assets/img/le-king.svg', 1, 1);

INSERT INTO commentaire (id_commentaire, texte_commentaire, date_commentaire, id_auteur, id_article) VALUES
(1, 'Tres bon article sur la longevite de LeBron.', '2026-04-01', 4, 1),
(2, 'OKC merite vraiment ce titre.', '2026-04-07', 1, 2),
(3, 'Le Thunder a construit une equipe impressionnante.', '2026-02-07', 2, 3),
(4, 'Le leadership de LeBron reste incroyable.', '2026-04-01', 3, 4);

INSERT INTO taguer (id_article, id_tag) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(2, 5),
(3, 4),
(3, 6),
(4, 2),
(4, 7);

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
