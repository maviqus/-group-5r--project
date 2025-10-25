FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first
COPY package*.json ./
RUN npm install --only=production

# Copy application source
COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "server.js"]
