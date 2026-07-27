USE blog;

INSERT INTO categorie (nom_categorie) VALUES
('NBA'),
('Technologie'),
('Analyse'),
('Opinion');

INSERT INTO tag (texte_descriptif) VALUES
('NBA'),
('logiciel'),
('MVP'),
('Finales'),
('Statistiques'),
('Oklahoma City Thunder'),
('LeBron James');

INSERT INTO auteur (nom_auteur, email_auteur) VALUES
('Sarah Connord', 'sarah.connord@example.com'),
('Tom Tatum', 'tom.tatum@example.com'),
('Albert Foster', 'albert.foster@example.com'),
('Maya Reader', 'maya.reader@example.com');

INSERT INTO article (
   titre,
   resume,
   temps_de_lecture,
   date_de_creation,
   contenu_article,
   image,
   id_categorie,
   id_auteur
) VALUES
(
   'LeBron James brille encore',
   'Un article sur la longevite de LeBron James.',
   35,
   '2026-07-01',
   'LeBron James continue d impressionner en NBA avec des performances solides.',
   './assets/img/Lbj.svg',
   1,
   1
),
(
   'OKC champion NBA',
   'Retour sur le titre de Oklahoma City.',
   55,
   '2026-07-03',
   'Oklahoma City Thunder remporte le titre apres une saison impressionnante.',
   './assets/img/okc-champions-nba.svg',
   1,
   2
),
(
   'Un logiciel pour analyser les matchs NBA',
   'Article sur les outils numeriques dans le sport.',
   75,
   '2026-07-05',
   'Ce logiciel permet de comparer les statistiques des joueurs et des equipes.',
   './assets/img/hero-section.svg',
   2,
   3
),
(
   'Les donnees changent la lecture du basket',
   'Analyse du role des donnees dans le sport moderne.',
   90,
   '2026-07-07',
   'Les equipes utilisent un logiciel pour mieux comprendre les performances.',
   './assets/img/bg-articles.svg',
   3,
   3
),
(
   'Pourquoi les finales NBA passionnent toujours',
   'Opinion sur les finales NBA.',
   45,
   '2026-07-09',
   'Les finales restent un moment fort pour les fans de basket.',
   './assets/img/okc-champs.svg',
   4,
   2
),
(
   'Logiciel, statistiques et MVP',
   'Un article qui parle du lien entre logiciel et performance.',
   65,
   '2026-07-11',
   'Le mot logiciel apparait dans le titre et dans le texte pour tester les requetes.',
   './assets/img/le-king.svg',
   2,
   1
),
(
   'Les jeunes joueurs a suivre',
   'Selection de jeunes talents NBA.',
   25,
   '2026-07-13',
   'Plusieurs jeunes joueurs progressent rapidement cette saison.',
   './assets/img/hero-section.svg',
   1,
   1
);

INSERT INTO commentaire (texte_commentaire, date_commentaire, id_auteur, id_article) VALUES
('Tres bon article.', '2026-07-14', 4, 1),
('OKC merite ce titre.', '2026-07-14', 1, 2),
('Le sujet logiciel est interessant.', '2026-07-15', 2, 3),
('Bonne analyse.', '2026-07-15', 4, 4),
('Article clair.', '2026-07-16', 3, 6);

INSERT INTO taguer (id_article, id_tag) VALUES
(1, 1),
(1, 7),
(2, 1),
(2, 4),
(2, 6),
(3, 1),
(3, 2),
(3, 5),
(4, 2),
(4, 5),
(5, 1),
(5, 4),
(6, 2),
(6, 3),
(6, 5),
(7, 1);
