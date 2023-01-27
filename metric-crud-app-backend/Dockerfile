FROM node:18-alpine3.16 as base

WORKDIR /app

ENV NODE_ENV development

COPY . .

RUN npm install

EXPOSE 8080

RUN npm run build

CMD ['node', 'dist/src/index.js']