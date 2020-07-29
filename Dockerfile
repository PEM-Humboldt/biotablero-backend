FROM node:8-alpine

USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN npm install --production
COPY . /home/node/app
RUN find /home/node/app/config/ ! -name 'default.json' -type f -exec rm -f {} +

CMD npm run start-prod
EXPOSE 4000
