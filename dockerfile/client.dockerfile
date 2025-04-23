FROM node:20-alpine

WORKDIR usr/src/app

COPY ./packages ./packages
COPY ./yarn.lock ./yarn.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/client ./apps/client

RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "yarn", "run" ]
