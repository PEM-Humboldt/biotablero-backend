# Biotablero Connectivity service

Connectivity service for biotablero

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You'll need nodejs v14.15+ and yarn to run the project.

### Install dependencies

After cloning the project, install its dependencies running: `yarn install`

### Setup

Copy the [config file](config/default.json) with the name of the environment you're running, this name needs to be the same as the env var **NODE_CONFIG_ENV**.

By default **NODE_CONFIG_ENV** is _develop_, so you'll need to create _config/develop.json_ and set minimum the "db" parameters.

### Run

Run `yarn start` to start the server, this will launch nodemon ready to watch your changes.

## Deployment

Deployment is made with docker, you'll need Docker v17.05.0+ and docker compose v1.17.1+

### Build image

To build the image run: `docker build -t biotablero-connectivity:<version> .`

It is recommended to use the [current release](https://github.com/PEM-Humboldt/biotablero-backend/releases) for the image tag version.

### Config

After you've built the image, create a copy of the [config](config/default.json) file with your configuration values.

**NOTE**: _If you change the server port in the configuration (4002 by default), you'll need to change the exposed port in the Dockerfile and rebuild the image_

### Deploy

Run

```
docker run --restart always --name biotablero-connectivity -p 4002:4002 -v <path/to/your/production.json>:/home/node/app/config/production.json -e NODE_CONFIG_ENV=production -d biotablero-connectivity:<version>
```

to start the container.

## Documentation

You can generate the API documentation with `yarn run docs`, it will generate them under the _/docs_ folder

## Contributing

There are no guidelines for contribution currently.

## License

This project is licensed under the MIT License.
