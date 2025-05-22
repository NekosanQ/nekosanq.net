# Base image
FROM node:22.15-alpine3.21 AS base

WORKDIR /app
COPY package*.json ./
RUN npm install

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
WORKDIR /app

# package.json と package-lock.json (あれば) をbuilderステージからコピー
COPY --from=builder /app/package*.json ./
# 本番用の依存関係のみをインストール
RUN npm install --omit=dev

# Next.jsのビルド済みファイルをbuilderステージからコピー
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./next.config.js

EXPOSE 3000

# アプリを起動
CMD ["npm", "run", "start"]