FROM node:18-bullseye

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN cd client && npm i && cd ..
RUN npm run build:client
RUN npm run build:server

EXPOSE ${APP_PORT}

CMD [ "node", "dist/index.js" ]