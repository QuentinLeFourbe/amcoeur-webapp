# Utilisation de l'image Node.js LTS
FROM node:lts

# Installation de pnpm
RUN npm install -g pnpm

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers de configuration pnpm et package.json (uniquement ceux existants)
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/server/package.json ./apps/server/
COPY apps/client/package.json ./apps/client/
COPY apps/backoffice/package.json ./apps/backoffice/

# Installation des dépendances avec pnpm
RUN pnpm install --frozen-lockfile

# Copie du reste du monorepo
COPY . .

# Construction du serveur avec pnpm
RUN pnpm run build:server

# Exposer le port que ton serveur utilise (Fly.io utilise 3000 par défaut)
EXPOSE 3000

# Commande pour démarrer l'application en production
CMD ["node", "dist/apps/server/index.js"]
