# Base image
FROM node:22.15-alpine3.21 AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci

# 開発環境
FROM base AS development

ENV NODE_ENV=development
WORKDIR /app
COPY . .

CMD ["npm", "run", "dev"]

# Builder stage (本番ビルド用)
FROM base AS builder
COPY . .
# Next.jsアプリケーションをビルド
RUN npm run build

# 本番環境
FROM node:22.15-alpine3.21 AS production
ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
WORKDIR /app

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000
USER node

CMD ["node", "server.js"]
