# Biotablero backend
Backend services for BioTablero.

## Getting Started

### Prerequisites
You'll need nodejs v14.15+ and yarn to run the project.

### Install dependencies
After cloning the project, install its dependencies running: `yarn install`

### Setup
Check every [service](./services) documentation to correctly config them.

## Deployment

[WIP]

## Documentation
To generate the global documentation run `yarn all docs`, it will be located under the */docs* folder

Production version of these docs are available [here](https://pem-humboldt.github.io/biotablero-backend/).

If you want to generate only one service documentation run `yarn workspace <service_name> run docs`, it will be located under the */docs* folder for that service.

If you want to generate the documentation for all services, but keep it separated run `yarn workspaces foreach run docs`, it will be located under the */docs* folder in every service.

## Contributing

There are no guidelines for contribution currently.

## Authors
Ingeniería de Datos y Desarrollo, Programa de Evaluación y Monitoreo de la Biodiversidad, Instituto Alexander von Humboldt Colombia

## License
This project is licensed under the MIT License.
