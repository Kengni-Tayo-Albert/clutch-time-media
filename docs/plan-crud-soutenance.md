# Plan de travail - Blog SQL, Looping, DBeaver, VS Code

Objectif : couvrir les consignes de Bertrand sur la base de donnees du blog :

- creer la base de donnees `blog` ;
- creer les tables issues du MCD ;
- inserer des donnees de test ;
- ecrire des requetes CRUD ;
- ecrire les requetes demandees sur les articles, commentaires, categories et tags.

## Etat actuel

Ce qui est deja bon :

- Le MCD existe dans Looping avec les entites principales.
- Le projet contient un fichier `blog.loo`.
- La base `blog` a ete creee dans DBeaver.
- Le projet contient deja une premiere modelisation SQL.

Ce qui reste a faire :

- Executer un script propre de creation des tables dans DBeaver.
- Inserer assez de donnees pour tester les requetes.
- Executer les requetes CRUD.
- Executer les requetes demandees par Bertrand.
- Garder les scripts SQL dans VS Code pour pouvoir les presenter au jury.

## Plan global

### 1. Looping

But : prouver que la base a ete pensee avant le SQL.

Actions :

1. Ouvrir `blog.loo`.
2. Verifier les entites :
   - `AUTEUR`
   - `ARTICLE`
   - `CATEGORIE`
   - `COMMENTAIRE`
   - `TAG`
3. Verifier les associations :
   - `AUTEUR` redige `ARTICLE`
   - `AUTEUR` ecrit `COMMENTAIRE`
   - `CATEGORIE` classe `ARTICLE`
   - `ARTICLE` recoit `COMMENTAIRE`
   - `ARTICLE` est tague par `TAG`
4. Verifier les cardinalites.
5. Generer ou comparer avec le MLD.

Fin de la partie Looping :

- Le MCD est lisible.
- Les cardinalites sont justes.
- Le fichier `blog.loo` est sauvegarde.

### 2. VS Code

But : garder les scripts propres dans le projet.

Scripts a utiliser :

- `database/dbeaver/01_create_tables.sql`
- `database/dbeaver/02_seed_data.sql`
- `database/dbeaver/03_crud_examples.sql`
- `database/dbeaver/04_requetes_bertrand.sql`

Actions :

1. Ouvrir le dossier du projet dans VS Code.
2. Verifier les scripts SQL.
3. Copier les scripts dans DBeaver quand il faut les executer.
4. Garder les fichiers comme preuves de travail pour la soutenance.

Fin de la partie VS Code :

- Les scripts sont ranges et lisibles.
- Tu sais expliquer a quoi sert chaque fichier.

### 3. DBeaver

But : executer SQL et verifier que le CRUD fonctionne.

Ordre exact :

1. Executer `01_create_tables.sql`.
2. Regenerer le dossier `Tables`.
3. Verifier que les tables sont visibles.
4. Executer `02_seed_data.sql`.
5. Verifier que les donnees sont inserees avec des `SELECT`.
6. Executer `03_crud_examples.sql`.
7. Executer `04_requetes_bertrand.sql`.

Fin de la partie DBeaver :

- La base `blog` existe.
- Les tables existent.
- Les donnees existent.
- Les requetes CRUD fonctionnent.
- Les requetes demandees par Bertrand fonctionnent.

## Quand le travail est termine

Le travail est termine quand les elements suivants sont valides :

- MCD sauvegarde dans Looping.
- Tables creees dans DBeaver.
- Donnees inserees dans DBeaver.
- CRUD teste : creation, lecture, modification, suppression.
- Toutes les requetes demandees par Bertrand ont ete executees au moins une fois.
- Les scripts sont sauvegardes dans le projet.

Quand tout cela est fait, on peut dire : projet SQL termine pour la partie base de donnees.
