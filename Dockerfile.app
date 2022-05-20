FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG APP_PORT=3000

CMD [ "npm", "run", "app", "--", "--port", "${APP_PORT}" ]