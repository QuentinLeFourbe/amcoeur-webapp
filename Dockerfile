# Utilisation de l'image Node.js LTS
FROM node:lts

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie de la racine de ton monorepo
COPY . .

# Installation des dépendances
RUN npm install

# Construction du serveur
RUN npm run build:server

# Exposer le port que ton serveur utilise (Fly.io utilise 3000 par défaut)
EXPOSE 3000

# Commande pour démarrer l'application en production
CMD ["node", "apps/server/build/index.js"]
