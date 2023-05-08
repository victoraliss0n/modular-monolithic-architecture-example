FROM node:14-alpine

LABEL BOILERPLATE QSO

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY package*.json ./

RUN npm i -g typescript

COPY . .

RUN yarn

EXPOSE 3000

CMD [ "yarn", "start:dev" ]