# Base image
FROM node:22.15-slim AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

# Development environment
FROM base AS development

ENV NODE_ENV=development
WORKDIR /app
COPY . .

CMD ["npm", "run", "dev"]

# Production build
FROM base AS builder

ENV NODE_ENV=production
WORKDIR /app
COPY . .
RUN npm run build

# Production runtime
FROM node:22.15-slim AS production

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev && npm install pm2

# Next.js ビルド済みファイルをコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

# PM2 設定ファイルもコピー
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js

EXPOSE 3000

# ★ PM2 でアプリを起動
CMD ["pm2-runtime", "ecosystem.config.js"]