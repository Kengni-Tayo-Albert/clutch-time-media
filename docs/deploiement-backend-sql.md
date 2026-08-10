# Deploiement - Backend SQL Clutch Time Media

## Objectif

Deployer le projet en ligne avec :

```text
Site Clutch Time Media
Backend Node.js / Express
Base MySQL distante
```

En local, MySQL est sur `localhost:3306`. En ligne, `localhost` ne fonctionne plus pour le jury, car il pointe vers le serveur de l'hebergeur et non vers ton ordinateur.

Il faut donc utiliser une base MySQL hebergee.

## URLs Finales

Front GitHub Pages :

```text
https://kengni-tayo-albert.github.io/clutch-time-media/
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/articles.html
```

Backend Railway :

```text
https://clutch-time-media-production.up.railway.app
```

Routes API a montrer :

```text
https://clutch-time-media-production.up.railway.app/api/health
https://clutch-time-media-production.up.railway.app/api/articles
https://clutch-time-media-production.up.railway.app/api/articles/5/comments
```

Tests deja valides :

```text
/api/health renvoie {"status":"ok","database":"blog"}.
/api/articles renvoie les articles stockes dans MySQL Railway.
/api/articles/5/comments renvoie le commentaire cree depuis le site.
```

## Choix Recommande

Pour garder un parcours simple, le chemin recommande est :

```text
Railway
```

Pourquoi :

```text
Railway peut heberger une application Node.js.
Railway peut ajouter une base MySQL dans le meme projet.
Railway gere les variables d'environnement.
Railway fournit une URL publique pour tester l'application.
```

## Preparation Du Projet

Le projet est deja adapte au deploiement :

```text
package.json contient npm start.
server/app.js utilise process.env.PORT.
server/app.js ecoute sur 0.0.0.0.
server/db.js lit les variables MySQL locales ou distantes.
.env est ignore par Git.
.env.example montre les variables necessaires sans exposer de secret.
```

## Variables D'Environnement A Prevoir

En production, il faudra configurer :

```text
CLIENT_ORIGIN=https://kengni-tayo-albert.github.io
MYSQL_URL=mysql://user:password@host:port/database
NODE_ENV=production
DB_SSL=false
```

En local, on peut garder :

```text
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=blog
DB_SSL=false
```

Si l'hebergeur donne une URL complete, on peut aussi utiliser :

```text
MYSQL_URL=mysql://user:password@host:port/database
```

ou :

```text
DATABASE_URL=mysql://user:password@host:port/database
```

## Etapes De Deploiement

1. Mettre le projet sur GitHub.

2. Creer un projet Railway.

3. Ajouter un service MySQL.

4. Importer les tables dans la base MySQL distante avec les scripts :

```text
01_creation_base_blog.sql
02_creation_tables_blog.sql
03_peuplement_blog.sql
```

5. Ajouter un service Node.js pour le projet Clutch Time Media.

6. Configurer les variables d'environnement du service Node.js.

7. Deployer le service.

8. Ouvrir l'URL publique fournie par Railway :

```text
https://clutch-time-media-production.up.railway.app
```

9. Tester :

```text
https://clutch-time-media-production.up.railway.app/api/health
https://clutch-time-media-production.up.railway.app/api/articles
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/articles.html
https://kengni-tayo-albert.github.io/clutch-time-media/assets/pages/article-detail.html?id=5
```

## Commandes Locales Utiles

Installer les dependances :

```bash
npm install
```

Lancer le backend :

```bash
npm start
```

Tester en local :

```text
http://localhost:3000/api/articles
```

## Points A Expliquer Au Jury

En local :

```text
Le site utilise MySQL sur mon ordinateur.
```

En ligne :

```text
Le site doit utiliser une base MySQL hebergee.
```

La difference est importante :

```text
localhost fonctionne uniquement sur ma machine.
Pour un deploiement public, il faut une base accessible par le serveur heberge.
```

## Phrase Simple Pour La Soutenance

```text
Pour le deploiement, je ne pouvais pas garder la base MySQL locale en localhost. J'ai donc deploye une base MySQL sur Railway, puis connecte le backend Express a cette base avec des variables d'environnement. Le front GitHub Pages appelle maintenant l'API Railway.
```
