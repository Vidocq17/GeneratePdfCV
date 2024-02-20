    Projet Générateur de CV PDF
Ce projet permet aux utilisateurs de créer un CV personnalisé et de le télécharger sous forme de fichier PDF. Il utilise Node.js, Express pour le backend, Puppeteer pour la génération de PDF, et Handlebars pour les templates HTML.

    Fonctionnalités
Formulaire web pour saisir les informations du CV (nom, prénom, email, téléphone, profil, expériences, parcours professionnel, compétences).
Génération dynamique de PDF à partir des informations soumises.
Téléchargement automatique du CV en PDF via l'interface web.
    Prérequis

Avant de commencer, assurez-vous que vous avez Docker et Docker Compose installés sur votre machine.
Pour exécuter ce projet, vous aurez besoin de Node.js et npm installés sur votre machine. Vous pouvez les télécharger et les installer à partir de nodejs.org.

    Installation

Clonez le dépôt sur votre machine locale :
git clone https://votre_repo/projet-api-pdf.git
cd projet-api-pdf

Démarrer les services :
Pour lancer l'application avec toutes ses dépendances, exécutez la commande suivante dans le répertoire racine de votre projet, là où se trouve le fichier docker-compose.yml :
docker-compose up

Pour arréter et supprimer les conteneurs; le réseau crée, et toutes les images utilisées, éxécutez : 
docker-compose down

Installez les dépendances nécessaires :
npm install

Lancez le serveur :
node index.js

Le serveur devrait démarrer sur http://localhost:3000. Ouvrez cette URL dans votre navigateur pour accéder à l'application.