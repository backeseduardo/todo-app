FROM node:16.15-alpine

RUN apk add --no-cache bash

ARG HTTP_PORT

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE $HTTP_PORT

CMD ["npm", "start"]