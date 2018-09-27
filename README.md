# Biotablero
Backend side for BioTablero project.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
You'll need nodejs v8.11+ and npm v5.6+ to run the project.

### Install dependencies
After cloning the project, install its dependencies running `npm i`

### Setup
Copy the [config file](config/default.json) with the name of the environment you're running, this name needs to be the same as the env var **NODE_CONFIG_ENV**.

By default **NODE_CONFIG_ENV** is *develop* , so you'll need to create *config/develop.json* and set minimum the "db" parameters.

### Run
Run `npm start` to start the server, this will launch nodemon with a delay of 3 seconds, ready to watch your changes.

## Deployment
// TODO

## Tests
There are no tests currently.

## Documentation
You can generate the API documentation with `npm run gen_docs`, it will generate them under the */docs* folder

## Contributing

There are no guidelines for contribution currently.

### Folder Structure

| folder/file path | description |
| ---------------- | ----------- |
| config | config files. |
| docs | generated api doc. |
| src |  |
| src.persistence | Database access layer. |
| src.persistence.models | Map for each database table, filename must match the tale name. |
| src.persistence.connection.js | Database connection file. |
| src.persistence.*.js | Other .js files correspond to model accessors. One file for main "object", for example, all queries were projects are created, listed, filter by some criteria, etc. are grouped under *project.js*. This is because we can't control the database design, so the model accessors will be like our entities according to the app logic. Filename must be in singular. |
| src.routes | Endpoint handlers. Each file groups endpoints related with a "main" object, for example, projects.js has endpoints that should create, list or search projects, even if the endpoints are not related. **This organization is on trial and should be reviewed when the endpoints increase.** Filename must be in plural. |
| src.service | Logic layer, most of the time these will be just a connection between endpoints handlers and the entity they want to consume. But if there are transformation or events thar affect other entities (more than just queries or joins) it should be done between services. Filename must be in singular. |
| src.util | Utilities |
| src.util.dependency_injection_container.js | Connects the dependencies. |
| src.util.errorHandler.js | Wrapper to handle uncaught errors, and to log all of them. |
| src.util.logger.js | Logger object, it logs to console and error and info files. |

## Authors
Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

## License
This project is licensed under the MIT License.
