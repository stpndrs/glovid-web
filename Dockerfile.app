FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm run build

ARG APP_PORT

EXPOSE ${APP_PORT}

RUN echo ${APP_PORT}
ENV APP_PORT=${APP_PORT}

CMD [ "npm", "run", "app", "--app-port=${APP_PORT}" ]