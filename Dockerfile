# --- Etapa 1: Construcción y Dependencias ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# --- Etapa 2: Entorno de Producción Optimizado ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm prune --production

# Transferencia selectiva de activos limpios
COPY --from=builder /app/src ./src
COPY --from=builder /app/server.js ./server.js

EXPOSE 8080
CMD ["node", "server.js"]
