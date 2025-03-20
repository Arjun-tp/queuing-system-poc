# Use Node.js base image
FROM node:18 AS backend

WORKDIR /app

# Copy backend dependencies separately for better caching
COPY backend/package*.json ./
RUN npm ci

# Copy backend source code
COPY backend/ .

# Expose backend API port
EXPOSE 7004

# Start backend server
CMD ["node", "server.js"]
