# Stage 1: Build the client
FROM node:18.17.1-alpine AS Client-builder

RUN apk update && apk add git

WORKDIR /app/Client

COPY Client/package*.json ./
RUN npm install --silent

COPY Client/ ./

# Stage 2: Set up the server
FROM node:18.17.1-alpine AS Server-setup

WORKDIR /app/Server

COPY Server/package*.json ./
RUN npm install --silent

COPY Server/ ./

# Stage 3: Create the production image
FROM node:18.17.1-alpine

WORKDIR /app

# Install 'concurrently' to run both client and server
RUN npm install -g concurrently

# Copy client build and server code from previous stages
COPY --from=Client-builder /app/Client /app/Client
COPY --from=Server-setup /app/Server /app/Server

EXPOSE 3000 5000

# Start both client and server using concurrently
CMD ["concurrently", "cd /app/Client && npm start", "cd /app/Server && node server.js"]
