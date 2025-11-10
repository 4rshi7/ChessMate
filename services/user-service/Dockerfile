# --- Stage 1: Build the TypeScript ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Generate Prisma client
RUN npx prisma generate
RUN npm run build 

# --- Stage 2: Production ---
FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

RUN apk add --no-cache openssl

# Gracefully handle non-empty DBs
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma migrate resolve --applied $(ls prisma/migrations | head -n 1) && node dist/index.js"]
