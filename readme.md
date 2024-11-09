# Amcoeur webapp [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=QuentinLeFourbe_amcoeur-webapp&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=QuentinLeFourbe_amcoeur-webapp) [![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=QuentinLeFourbe_amcoeur-webapp&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=QuentinLeFourbe_amcoeur-webapp)

Ce monorepo contient une application fullstack contenant le site vitrine, le backoffice ainsi qu'une api afin de permettre aux bénévoles de l'association Amcoeur de modifier le contenu du site vitrine de manière simple et intuitive. Les principaux utilisateurs du site sont des personnes âgés.

## 📂 Structure du Projet

Ce monorepo contient :

- **Deux applications clients** : une app représentant le site vitrine, visible au public; et une app représentant le backoffiice, visible uniquement par les membres de l'association.
- **Une API** : Fournit des endpoints RESTful pour les fonctionnalités de gestions des pages, des formulaires et des adoptions.
- \*_Une librairie de types_: Fournit les types liés à l'application Amcoeur aux différentes applications.

## 🔧 Structure du Monorepo

- `server/` : Contient le code de l'API
- `client/` : Contient le code du site vitrine
- `backoffice/`: Contient le code du backoffice
- `types/`: Contient les types spécifiques à l'application, partagés entre les différentes apps

## 🚀 Technologies Utilisées

- **Frontend** : React.js, TypeScript, Vite
- **Backend** : Node.js, Express, TypeScript
- **Base de données** : MongoDB
- **Autres** : React Query, CodeMirror, React router DOM, React Hook Form, Zod, Panda-CSS

## ⚙️ Configuration

Pour chaque app, veuillez configurer les variables d'environnement suivantes dans un fichier `.env` à la racine du dossier de l'app en question.

Backoffice:

```plaintext
VITE_MS_CLIENT_ID=<Client ID pour l'auth PKCE Microsoft>
```

Server:

```plaintext
CAPTCHA_SERVER_KEY=<Google ReCaptchaV2 secret key>
CONTACT_EMAIL=<Email à qui adresser les formulaires de contact>
ADMIN_EMAIL=<Email à qui envoyer des notifications systèmes>
ADMIN_MS_ID=<Microsoft ID pour accès admin>
NOREPLY_EMAIL=<Email pour envoi de mail automatiques>
NOREPLY_EMAIL_PASSWORD=<Mot de passe de l'email d'envoi de mail automatiques>
DB_URI=<URI de la base de donnée>
REDIS_URL=<URL de la base Redis>
MS_CLIENT_ID=<Client ID pour l'auth PKCE Microsoft>
NODE_ENV=<"development" pour utiliser l'app en mode développement>
```

## ⬇️Installation

```bash
# Installation des dépendances pour le serveur et le client
npm install
```

## 🚀 Lancement en développement

### Préparation

Avant le lancement d'une application, il est nécessaire de builder les types:

```bash
npm run build-types
```

Il est aussi possible de détecter les changements dans les fichiers des types pour build automatiquement si besoin:

```bash
npm run watch-types
```

Lancer le redis et le mongoDB dans un docker:

```bash
npm run start-db
```

### Site vitrine

Pour lancer le site vitrine (client) en mode développement:

```bash
# Lancement du site vitrine avec Vite.js (HMR)
npm run dev-client
```

### Backoffice

Pour lancer le backoffice en mode développement:

```bash
# Lancement du backoffice avec Vite.js (HMR)
npm run dev-backoffice
```

### API

Pour lancer l'API en mode développement avec rechargement automatique (via Nodemon):

```bash
# Lancement de la compilation typescript avec rechargement automatique
npm run watch-server

# Lancer le serveur en mode dev avec rechargement automatique
npm run dev-server
```

## 📄 License

Ce projet est sous licence [MIT](LICENSE).
