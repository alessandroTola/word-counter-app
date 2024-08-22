# Usa l'immagine base Node.js
FROM node:20-alpine

# Imposta la directory di lavoro
WORKDIR /app

# Copia i file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia tutto il resto del codice
COPY . .

# Compila l'applicazione
RUN npm run build

# Esponi la porta dell'applicazione
EXPOSE 3000

# Comando di avvio
CMD ["npm", "run", "start:prod"]