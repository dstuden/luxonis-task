FROM node:18-bullseye

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

EXPOSE ${APP_PORT}

CMD [ "node", "dist/index.js" ]