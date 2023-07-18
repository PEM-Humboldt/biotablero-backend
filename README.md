# Biotablero backend

Backend services for BioTablero.

## Getting Started

### Prerequisites

You'll need nodejs v14.15+ and yarn to run the project.

- For a better performance run in SO linux.

### Install dependencies

After cloning the project, install its dependencies running: `yarn install`

### Setup

Check every [service](./services) documentation to correctly config them.

## Deployment

See instructions in every service.

## Documentation

To generate the global documentation run `yarn all_docs`, it will be located under the _/docs_ folder

Production version of these docs are available [here](https://pem-humboldt.github.io/biotablero-backend/).

If you want to generate only one service documentation run `yarn workspace <service_name> run docs`, it will be located under the _/docs_ folder for that service.

If you want to generate the documentation for all services, but keep them separated run `yarn workspaces foreach run docs`, it will be located under the _/docs_ folder in every service.

## Contributing

There are no guidelines for contribution currently.

## Authors

Arquitectura informática y manejo de datos - Programa de Evaluación y Monitoreo de la Biodiversidad - Instituto Alexander von Humboldt Colombia

- **Erika Suárez** - [Erikasv](https://github.com/erikasv)
- **Camilo Zapata** - [cazapatamar](https://github.com/cazapatamar)
- **Angela Checa** - [Trjegul84](https://github.com/Trjegul84)

See also the list of [contributors](https://github.com/PEM-Humboldt/biotablero-backend/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License.
