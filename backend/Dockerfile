# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install && npm prune --production

# Copy application source code
COPY . .

# Set environment variables
ENV PORT=4000
EXPOSE 4000

# Start the application
CMD ["node", "server.js"]
