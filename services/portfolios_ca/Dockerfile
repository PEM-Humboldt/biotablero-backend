FROM public.ecr.aws/docker/library/node:18.20
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node . /home/node/app
RUN yarn install
RUN find /home/node/app/config/ ! -name 'default.json' ! -name 'custom-environment-variables.json' -type f -exec rm -f {} +

RUN yarn run build
CMD yarn start-prod
EXPOSE 4006
