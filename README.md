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

### Folder Structure

```
|-- config            -> config files
|-- docs              -> generated api doc
|-- src
    |-- persistence   -> Models, db connection and model accessors
    |-- routes        -> endpoints handlers
    |-- service       -> logic layer
    |-- util          -> Error handler, dependency injection container, logger
```


## Deployment
// TODO

## Tests
There are no tests currently.

## Documentation
You can generate the API documentation with `npm run gen_docs`, it will generate them under the */docs* folder

## Authors
Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

## License
This project is licensed under the MIT License.
