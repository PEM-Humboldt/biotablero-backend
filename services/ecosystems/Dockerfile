FROM node:14.15
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN yarn install --production
COPY . /home/node/app

CMD yarn run start-prod
EXPOSE 4004
