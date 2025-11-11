# --- Stage 1: Build the TypeScript ---
FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm install

COPY . .
# Generate Prisma client
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma generate
RUN npm run build

# --- Stage 2: Production ---
FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache openssl

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/generated ./generated
COPY package.json ./


# Gracefully handle non-empty DBs
CMD ["sh", "-c", "npx prisma migrate deploy || npx prisma migrate resolve --applied $(ls prisma/migrations | head -n 1) && node dist/index.js"]