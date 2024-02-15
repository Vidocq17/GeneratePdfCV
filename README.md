Générateur de CV PDF
Ce projet est une API REST construite avec Node.js et Express qui permet de générer dynamiquement des fichiers PDF de CV à partir de données JSON fournies via une requête POST. Le PDF généré peut être téléchargé automatiquement dans un navigateur web grâce à un script côté client utilisant l'API Fetch.

Fonctionnalités
Générer un PDF de CV à partir de données JSON.
Téléchargement automatique du PDF via le navigateur.
Template de CV personnalisable via Handlebars.

Technologies Utilisées
Node.js : Environnement d'exécution côté serveur.
Express : Framework pour créer l'API REST.
Puppeteer : Bibliothèque pour générer des PDF à partir de HTML.
Handlebars : Moteur de template pour construire le HTML du CV.

Prérequis
Node.js (version 12.x ou supérieure)
npm (inclus avec Node.js)

Installation

Clonez le dépôt sur votre machine locale :
git clone [https://exemple.com/mon-projet.git](https://github.com/Vidocq17/GeneratePdfCV.git    )
cd mon-projet

Installez les dépendances :
npm install

Lancez le serveur avec Node.js :
node index.js

Utilisation
API
Envoyez une requête POST à http://localhost:3000/generate-pdf avec un corps JSON contenant les données du CV :

{
  "nom": "John Doe",
  "experiences": [...],
  "educations": [...],
  "competences": [...]
}

Côté Client
Intégrez le script JavaScript fourni dans votre page HTML pour déclencher le téléchargement du PDF généré.
