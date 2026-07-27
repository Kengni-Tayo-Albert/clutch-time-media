-- =========================================================
-- RESET DE LA BASE BLOG
-- Attention : ce script supprime puis recree la base blog.
-- A utiliser uniquement si tu veux repartir d'une base propre.
-- =========================================================

DROP DATABASE IF EXISTS blog;

CREATE DATABASE blog
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE blog;
