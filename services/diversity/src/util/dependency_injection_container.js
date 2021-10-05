const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const restAPI = require('./restAPI');

const bookshelfModels = require('../persistence/models/setup');
const RichnessPresistence = require('../persistence/richness_nos');

const RichnessService = require('../services/richness');
const FunctionalService = require('../services/functional');

const RichnessRoute = require('../routes/richness');
const FunctionalRoute = require('../routes/functional');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));
bottle.factory('restAPI', () => restAPI);

bottle.factory('RichnessPersistence', () =>
  RichnessPresistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('RichnessService', (container) =>
  RichnessService(container.RichnessPersistence, container.restAPI),
);
bottle.factory('FunctionalService', () => FunctionalService());

bottle.factory('routes', (container) => [
  RichnessRoute(container.errorHandler, container.RichnessService),
  FunctionalRoute(container.errorHandler, container.FunctionalService),
]);

module.exports = bottle.container;
