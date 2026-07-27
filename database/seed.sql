-- =========================================================
-- Donnees d'exemple - Clutch Time Media
-- A executer apres database/schema.sql
-- =========================================================

USE clutch_time_media;

-- auteurs et lecteurs
INSERT INTO auteurs (prenom, nom, email, mot_de_passe, role) VALUES
('Sarah', 'Connord', 'sarah.connord@example.com', 'demo_mot_de_passe', 'author'),
('Tom', 'Tatum', 'tom.tatum@example.com', 'demo_mot_de_passe', 'author'),
('Albert', 'Foster', 'albert.foster@example.com', 'demo_mot_de_passe', 'admin'),
('Maya', 'Reader', 'maya.reader@example.com', 'demo_mot_de_passe', 'reader');

-- Categories principales du blog
INSERT INTO categories (name, slug) VALUES
('Players', 'players'),
('Teams', 'teams'),
('Playoffs', 'playoffs');

-- Tags utilisables sur plusieurs articles
INSERT INTO tags (name, slug) VALUES
('NBA', 'nba'),
('LeBron James', 'lebron-james'),
('Oklahoma City Thunder', 'oklahoma-city-thunder'),
('Champion', 'champion'),
('MVP', 'mvp');

-- Articles d'exemple proches du fichier articles.json
INSERT INTO articles (
  category_id,
  auteur_id,
  title,
  subtitle,
  summary,
  content,
  image_url,
  published_at,
  reading_time,
  featured
) VALUES
(
  1,
  1,
  'LeBron James brille encore a 42 ans',
  'Le King en mode MVP !',
  'A 42 ans, LeBron James continue d impressionner en NBA avec des performances dignes d un MVP.',
  'Contenu complet de l article sur LeBron James...',
  './assets/img/Lbj.svg',
  '2026-03-31 10:00:00',
  3,
  TRUE
),
(
  2,
  2,
  'OKC champion NBA',
  'Premier sacre pour Oklahoma City',
  'Les Oklahoma City Thunder sont champions NBA. Retour sur leur parcours exceptionnel.',
  'Contenu complet de l article sur OKC...',
  './assets/img/okc-champions-nba.svg',
  '2026-04-06 10:00:00',
  5,
  TRUE
);

-- Association des articles avec leurs tags
INSERT INTO article_tags (article_id, tag_id) VALUES
(1, 1),
(1, 2),
(1, 5),
(2, 1),
(2, 3),
(2, 4);

-- Commentaires d'exemple
INSERT INTO comments (article_id, auteur_id, content) VALUES
(1, 4, 'Tres bon article sur la longevite de LeBron.'),
(2, 4, 'OKC merite vraiment ce titre !');
