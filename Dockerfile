# Utilisation de l'image Node.js LTS
FROM node:lts

# Répertoire de travail dans le conteneur
WORKDIR /app

# Copie de la racine de ton monorepo
COPY . .

# Installation des dépendances
RUN npm install

# Construction du client et du serveur
RUN npm run build-server

# Exposer le port que ton serveur utilise
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "run", "start"]
