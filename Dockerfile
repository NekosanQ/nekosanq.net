FROM node:22.15.1-alpine3.17 AS base
# Stage 1: Base image

WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Development environment
FROM base AS development

ENV NODE_ENV=development
WORKDIR /app
COPY . .

CMD ["npm", "run", "dev"]

# Stage 3: Production build
FROM base AS builder

ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm run build

# Stage 4: Production runtime
FROM node:22.15.1-alpine3.17 AS production

ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
# Development build
# docker-compose up --build
# Production build
# NODE_ENV=production BUILD_TARGET=production docker-compose up --build

