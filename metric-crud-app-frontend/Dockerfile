FROM node:18-alpine3.16 as base

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD npm run start