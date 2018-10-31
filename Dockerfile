FROM node:8-alpine

WORKDIR /app
COPY package.json /app
RUN npm install --production
COPY . /app
RUN find /app/config/ ! -name 'default.json' -type f -exec rm -f {} +

CMD npm run start-prod
EXPOSE 4000
