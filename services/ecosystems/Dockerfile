FROM node:18.15
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json /home/node/app
RUN yarn install --production
COPY --chown=node:node . /home/node/app
RUN find /home/node/app/config/ ! -name 'default.json' -type f -exec rm -f {} +

CMD yarn run start-prod
EXPOSE 4004
