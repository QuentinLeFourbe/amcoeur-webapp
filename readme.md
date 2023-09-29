# Projet Amcoeur Monorepo

Ce monorepo contient un serveur en Express (Node.js, TypeScript) et un client en React (TypeScript, Vite) pour le projet "Amcoeur".

## Configuration

Pour le serveur, veuillez configurer les variables d'environnement suivantes dans un fichier `.env` à la racine du dossier "server":

```plaintext
CONTACT_EMAIL=votre_email
CONTACT_PASSWORD=votre_mot_de_passe
```

## Installation

```bash
# Installation des dépendances pour le serveur et le client
npm install
```

## Lancement en développement

Pour lancer le serveur en mode développement avec rechargement automatique (via Nodemon) et builder le client en mode dev ou en watch :

```bash
# Lancer le serveur en mode dev avec rechargement automatique
npm run dev-server

# Lancer le client en mode dev (dans une autre fenêtre/terminal)
npm run dev
```

Si vous préférez que le client se mette en mode watch pour builder en continu pendant le développement :

```bash
# Lancer le client en mode watch (dans une autre fenêtre/terminal)
npm run watch
```

Notez que vous devez exécuter le lancement du serveur et du client dans des fenêtres/terminaux séparés.

## Lancement en production

Pour lancer le serveur en production :

```bash
# Lancer le serveur en prod
npm start
```

## Structure du Monorepo

- `server/` : Contient le code du serveur Express (Node.js, TypeScript).
- `client/` : Contient le code du client React (TypeScript, Vite).

## License

Ce projet est sous licence [MIT](LICENSE).
