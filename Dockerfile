FROM node:14-alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install pm2 -g

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3030

ENV NODE_ENV=production

CMD [ "pm2-runtime", "start", "app.js" ]