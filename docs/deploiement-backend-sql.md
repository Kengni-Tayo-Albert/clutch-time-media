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
CLIENT_ORIGIN=https://url-de-ton-site
DB_HOST=host_mysql_distant
DB_PORT=3306
DB_USER=utilisateur_mysql
DB_PASSWORD=mot_de_passe_mysql
DB_NAME=nom_base_mysql
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

8. Ouvrir l'URL publique fournie par Railway.

9. Tester :

```text
/api/health
/api/articles
/assets/pages/articles.html
/assets/pages/article-detail.html?id=1
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
Pour le deploiement, je ne peux pas garder la base MySQL locale en localhost. J'ai donc prepare le backend pour utiliser des variables d'environnement et se connecter a une base MySQL distante fournie par l'hebergeur.
```
