# --- Stage 1: Build the TypeScript ---
FROM node:18-alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build # This assumes you have a 'build' script in package.json to run 'tsc'

# --- Stage 2: Production ---
FROM node:18-alpine

WORKDIR /app
# Copy built code and node_modules from the 'builder' stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY src/db/init.sql ./init.sql
# Install Postgres client (to run psql)
RUN apk add --no-cache postgresql-client

# Run migrations (init.sql) before starting server
CMD ["sh", "-c", "PGPASSWORD=$PGPASSWORD psql -h $PGHOST -U $PGUSER -d $PGDATABASE -f ./init.sql && node dist/index.js"]