# syntax=docker/dockerfile:1
FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production PORT=8080 HOSTNAME=0.0.0.0
COPY package.json package-lock.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build
EXPOSE 8080
# Offline: migrate, seed fixtures (prints demo logins), then serve.
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm start"]
