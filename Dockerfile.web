# Use Node.js base image for web
FROM node:18 AS web

WORKDIR /app

# Copy web dependencies separately for better caching
COPY web/package*.json ./
RUN npm install

# Copy web source code
COPY web/ .

# Expose web development server port
EXPOSE 5173

# Start Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
