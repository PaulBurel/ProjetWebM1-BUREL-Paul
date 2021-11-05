# WikiResto

Video


## Installation sur votre machine

### Prerequis

- [Node.js](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)
- [MongoDB](https://www.mongodb.com/)

Après avoir cloner projet il faut ouvrir trois terminaux.

### Terminal 1

Ce terminal va permettre de lancer MongoDB sur votre machine:

Si vous n'avez pas MongoDB (sur mac) :
```bash
$ brew services start mongodb-community@5.0
```

Importer la base de données :
```bash
$ mongoimport --db test -c restaurants --file primer-dataset.json
```

### Terminal 2
On va lancer le serveur :
```bash
$ cd serveur
$ npm install
$ node serverCrudWithMongo.js 
```

### Terminal 3
On va lancer a front 
```bash
$ cd front
$ npm install
$ npm run serve
```

## Fonctionnalités livrées 

- [x] Ajout d'un restaurant dans la BD
- [x] Barre de recherche
- [x] Modifier le nombres d'élèments afficher par page 
- [x] Recherche d'un restaurant par nom
- [x] Affichage du nombre total de restaurants recensé sur le site 
- [x] Supprimer un restaurant
- [x] Navigation sur le tableau de restaurants
- [x] Details d'un restaurant
- [x] Affichage des informations d'un restaurant
- [x] Galerie comportant une image
- [x] Localisation du restaurant dans une carte
- [x] Retourner à la page d'accueil
