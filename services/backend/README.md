# Biotablero
Main service for BioTablero backend.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You'll need nodejs v14.15+ and yarn to run the project.

### Install dependencies
After cloning the project, install its dependencies running: `yarn install`

### Setup
Copy the [config file](config/default.json) with the name of the environment you're running, this name needs to be the same as the env var **NODE_CONFIG_ENV**.

By default **NODE_CONFIG_ENV** is *develop*, so you'll need to create *config/develop.json* and set minimum the "db" parameters.

#### Temporary note

The users administration in the current version is very limited and acts just as a mockup. So, in the config file you'll have to add a new property:

``` json
"users": [
  {
    "username": "admin",
    "name": "Admin",
    "password": "password_admin"
  },
  {
    "username": "test",
    "password": "password_test"
  }
]
```

The property users is an array of objects, each one has a *username* and *password* properties at least and they will be used to login the users you'll want to enable.

**This property isn't present in the default config file, if you don't provide it in your custom configuration all endpoints related with users will not work**

### Run
Run `yarn start` to start the server, this will launch nodemon ready to watch your changes.

## Deployment

Deployment is made with docker, you'll need Docker v17.05.0+ and docker compose v1.17.1+

### Build image

To build the image run: `docker build -t biotablero-backend:<version> .`

It is recommended to use the [current release](https://github.com/PEM-Humboldt/biotablero-backend/releases) for the image tag version.

### Deploy container

#### Config

After you've built the image, create a copy of the [config](config/default.json) file with your configuration values.

**NOTE**: *If you change the server port in the configuration (4000 by default), you'll need to change the exposed port in the Dockerfile and rebuild the image*

#### Deploy

In the file [docker-compose.yml](docker-compose.yml):

1. Update the image tag to use
1. In the **volumes** section link the config file you created in the previous step to the config file in the container. The name of the file inside the container must match the NODE_CONFIG_ENV value.
1. If you changed the port in the config, change the container side of **ports** section for the value set, and change the host side for the ort in which you want to expose the service

Then run: `docker-compose up -d`

## Tests
There are no tests currently.

## Documentation
You can generate the API documentation with `yarn run gen_docs`, it will generate them under the */docs* folder

Production version of these docs are available [here](https://pem-humboldt.github.io/biotablero-backend/).

## Contributing

There are no guidelines for contribution currently.

### Folder Structure

| folder/file path | description |
| ---------------- | ----------- |
| config | config files. |
| docs | generated api doc. |
| src |  |
| src.persistence | Database access layer. |
| src.persistence.models | Map for each database table, filename must match the table name. |
| src.persistence.models.util | utilities functions for models, contains event handlers functions for now. |
| src.persistence.connection.js | Database connection file. |
| src.persistence.*.js | Other .js files correspond to model accessors. One file for main "object", for example, all queries were projects are created, listed, filter by some criteria, etc. are grouped under *project.js*. This is because we can't control the database design, so the model accessors will be like our entities according to the app logic. Filename must be in singular. |
| src.routes | Endpoint handlers. Each file groups endpoints related with a "main" object, for example, projects.js has endpoints that should create, list or search projects, even if the endpoints are not related. **This organization is on trial and should be reviewed when the endpoints increase.** Filename must be in plural. |
| src.service | Logic layer, most of the time these will be just a connection between endpoints handlers and the entity they want to consume. But if there are transformation or events that affect other entities (more than just queries or joins) it should be done between services. Filename must be in singular. |
| src.util | Utilities |
| src.util.dependency_injection_container.js | Connects the dependencies. |
| src.util.errorHandler.js | Wrapper to handle uncaught errors, and to log all of them. |
| src.util.logger.js | Logger object, it logs to console and error and info files. |

## Authors
Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

## License
This project is licensed under the MIT License.
