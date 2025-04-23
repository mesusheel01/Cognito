FROM node:20-alpine

WORKDIR usr/src/app

ARG DATABASE_URL

COPY ./packages ./packages
COPY ./yarn.lock ./yarn.lock

COPY ./package.json ./package.json
COPY ./turbo.json ./turbo.json

COPY ./apps/client ./apps/client

RUN npm install

RUN DATABASE_URL=${DATABASE_URL} npm run build

EXPOSE 5000

CMD [ "npm", "yarn", "run" ,"index.ts"]
