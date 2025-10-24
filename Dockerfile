FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --production

# Copy source
COPY . .

ENV PORT=4000
EXPOSE 4000

CMD ["node", "server.js"]
