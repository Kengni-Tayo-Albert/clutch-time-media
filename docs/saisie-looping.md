# Saisie du MCD dans Looping

Ce fichier sert de guide pour creer le MCD dans Looping.
Il faut creer les entites, puis les associations avec leurs cardinalites.

## 1. Entites a creer

### AUTEUR

Identifiant :

- `id_auteur`

Proprietes :

- `prenom`
- `nom`
- `email`
- `mot_de_passe`
- `role`

Interpretation :

Un auteur represente une personne qui peut rediger des articles ou ecrire
des commentaires. Le role permet de distinguer un administrateur, un auteur ou
un lecteur.

### ARTICLE

Identifiant :

- `id_article`

Proprietes :

- `titre`
- `sous_titre`
- `resume`
- `contenu`
- `image`
- `date_parution`
- `temps_lecture`
- `mis_en_avant`

Interpretation :

Un article est le contenu principal du blog. Il possede un titre, un texte, une
image et une date de parution.

### CATEGORIE

Identifiant :

- `id_categorie`

Proprietes :

- `nom`
- `slug`

Interpretation :

Une categorie sert a classer les articles par theme.
Exemples : Players, Teams, Playoffs.

### COMMENTAIRE

Identifiant :

- `id_commentaire`

Proprietes :

- `contenu`
- `date_creation`

Interpretation :

Un commentaire est un message publie par un auteur sous un article.

### TAG

Identifiant :

- `id_tag`

Proprietes :

- `nom`
- `slug`

Interpretation :

Un tag est un mot-cle rattache a un article.
Exemples : NBA, MVP, LeBron James.

## 2. Associations a creer

### REDIGER

Relie :

- `AUTEUR`
- `ARTICLE`

Cardinalites :

- cote `AUTEUR` : `0,n`
- cote `ARTICLE` : `1,1`

Phrase d'explication :

Un auteur peut rediger zero ou plusieurs articles.
Un article est redige par un seul auteur.

### CLASSER

Relie :

- `CATEGORIE`
- `ARTICLE`

Cardinalites :

- cote `CATEGORIE` : `0,n`
- cote `ARTICLE` : `1,1`

Phrase d'explication :

Une categorie peut classer zero ou plusieurs articles.
Un article appartient a une seule categorie.

### RECEVOIR

Relie :

- `ARTICLE`
- `COMMENTAIRE`

Cardinalites :

- cote `ARTICLE` : `0,n`
- cote `COMMENTAIRE` : `1,1`

Phrase d'explication :

Un article peut recevoir zero ou plusieurs commentaires.
Un commentaire concerne un seul article.

### ECRIRE

Relie :

- `AUTEUR`
- `COMMENTAIRE`

Cardinalites :

- cote `AUTEUR` : `0,n`
- cote `COMMENTAIRE` : `1,1`

Phrase d'explication :

Un auteur peut ecrire zero ou plusieurs commentaires.
Un commentaire est ecrit par un seul auteur.

### ETIQUETER

Relie :

- `ARTICLE`
- `TAG`

Cardinalites :

- cote `ARTICLE` : `0,n`
- cote `TAG` : `0,n`

Phrase d'explication :

Un article peut avoir zero ou plusieurs tags.
Un tag peut etre utilise sur zero ou plusieurs articles.

Point important :

Cette association est une relation plusieurs-a-plusieurs.
Au passage vers le modele logique, Looping creera une table d'association.
Elle correspond a la future table SQL `article_tags`.

## 3. Schema visuel a reproduire

```text
AUTEUR 0,n --- REDIGER --- 1,1 ARTICLE
AUTEUR 0,n --- ECRIRE  --- 1,1 COMMENTAIRE

CATEGORIE   0,n --- CLASSER --- 1,1 ARTICLE

ARTICLE     0,n --- RECEVOIR --- 1,1 COMMENTAIRE
ARTICLE     0,n --- ETIQUETER -- 0,n TAG
```

## 4. Conseils de placement dans Looping

Placement conseille pour que le MCD soit lisible :

- `ARTICLE` au centre ;
- `AUTEUR` a gauche ;
- `CATEGORIE` au-dessus de `ARTICLE` ;
- `COMMENTAIRE` en-dessous de `ARTICLE` ;
- `TAG` a droite ;
- `REDIGER` entre `AUTEUR` et `ARTICLE` ;
- `ECRIRE` entre `AUTEUR` et `COMMENTAIRE` ;
- `CLASSER` entre `CATEGORIE` et `ARTICLE` ;
- `RECEVOIR` entre `ARTICLE` et `COMMENTAIRE` ;
- `ETIQUETER` entre `ARTICLE` et `TAG`.

Un schema visuel est disponible dans le fichier :

- `docs/mcd-blog.svg`

## 5. Ce qu'il ne faut pas mettre dans le MCD

Dans le MCD, il ne faut pas ajouter directement :

- `id_auteur` dans `ARTICLE` ;
- `id_categorie` dans `ARTICLE` ;
- `id_article` dans `COMMENTAIRE` ;
- `id_auteur` dans `COMMENTAIRE`.

Ces champs seront ajoutes automatiquement plus tard dans le MLD sous forme de
cles etrangeres grace aux associations et aux cardinalites.
