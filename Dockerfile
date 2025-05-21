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

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000
CMD ["npm", "run", "start"]

