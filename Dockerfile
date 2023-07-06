# Utilisation d'une image de base contenant Node.js
FROM node:16.0.0

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le package.json et package-lock.json vers le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier le reste des fichiers du projet vers le répertoire de travail
COPY . .

# Exposer le port sur lequel l'API sera accessible
EXPOSE 3000

# Définir la commande d'exécution pour démarrer l'API
CMD ["node", "server.js"]