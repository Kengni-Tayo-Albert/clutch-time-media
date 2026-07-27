# 🏀 Clutch Time Media

## 📌 Présentation du projet
**Clutch Time Media** est une application web de type blog dédiée à l’univers du basketball, et plus particulièrement à la NBA.  
Elle propose une plateforme moderne, claire et responsive permettant de consulter des articles, suivre l’actualité NBA et accéder à des contenus détaillés.

L’utilisateur peut :
- parcourir les articles depuis la page d’accueil  
- accéder à une page dédiée pour chaque article  
- profiter d’une expérience fluide et responsive sur tous les supports  

---

## 🎨 Maquettes Figma

### ✔️ Desktop
- Maquettes complètes réalisées pour ordinateur  
- Prototypage interactif permettant :  
  - navigation entre les pages  
  - transitions fluides via les interactions (boutons, liens)

### ✔️ Mobile (Responsive)
- Adaptation de toutes les pages au format mobile  
- Travail sur l’ergonomie et la lisibilité  
- Cohérence visuelle entre desktop et mobile  

---

## 💻 Développement

### 🔹 HTML / CSS
- Intégration fidèle des maquettes Figma  
- Structure propre et organisée  
- Design moderne et cohérent  
- Responsive design complet (mobile, tablette, desktop)

### 🔹 JavaScript
- Utilisation de `fetch` pour récupérer les données depuis un fichier JSON local  
- Affichage dynamique des articles  
- Navigation vers les pages détail via un ID  
- Code structuré et commenté  

---

## ⚙️ Fonctionnalités principales
- Page d’accueil avec hero section et articles  
- Liste d’articles dynamique  
- Page détail pour chaque article  
- Navigation fluide entre les pages  
- Responsive design  
- Menu burger avec :  
  - animation d’ouverture / fermeture  
  - transformation en croix  
  - fermeture au clic extérieur  
- Animations et effets visuels (hover, transitions)

---

## 🗂️ Gestion des données
- Articles stockés dans un fichier `articles.json`  
- Données récupérées via `fetch`  
- Structure pensée pour évoluer vers un futur système dynamique (formulaire + base de données)

---

## 🚀 Déploiement
Le projet est déployé en ligne et disponible sur GitHub.

### 🔗 Lien Figma  
https://www.figma.com/design/qoabLng61ftYGBNYjHOs0b/Clutch-Time-Media%F0%9F%8F%80?node-id=0-1&p=f

---

## 🤖 Utilisation de l’IA
L’IA a été utilisée comme outil d’assistance pour :
- la logique JavaScript (notamment `fetch`)  
- certains ajustements CSS (responsive, animations)

Avec une démarche responsable :
- chaque partie générée a été relue, comprise et adaptée  
- des commentaires ont été ajoutés pour démontrer la compréhension  
- l’objectif était d’apprendre, comprendre et progresser  

---

## 📈 Axes d’amélioration
- Approfondir JavaScript (logique, manipulation du DOM)  
- Ajouter une base de données  
- Implémenter une authentification  
- Créer un espace administrateur  
- Connecter un formulaire de création d’articles  

---

## 👨‍💻 Auteur
Projet réalisé dans le cadre de la formation développeur web.

---

## 🏁 Conclusion
Ce projet représente une première étape vers la création d’applications web complètes.  
Il met en évidence une bonne maîtrise des bases (**HTML, CSS, JS**) ainsi qu’une capacité à structurer un projet et anticiper ses évolutions.

---

## Base de donnees relationnelle

Une partie modelisation SQL a ete ajoutee pour couvrir la competence base de donnees relationnelle :

- `docs/modelisation-bdd.md` : analyse, entites, relations, MCD simplifie et MLD.
- `docs/saisie-looping.md` : elements a saisir dans Looping pour construire le MCD.
- `docs/mcd-blog.svg` : schema visuel du MCD a reproduire dans Looping.
- `database/schema.sql` : creation des tables MySQL avec cles primaires et cles etrangeres.
- `database/seed.sql` : donnees d'exemple pour tester la base.

Le fichier JSON actuel simule les donnees cote front-end. La modelisation SQL montre comment le projet peut evoluer vers une vraie base MySQL.
