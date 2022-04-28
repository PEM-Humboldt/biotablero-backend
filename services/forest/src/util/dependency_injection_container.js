const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const restAPI = require('./restAPI');

const SCIHFPersistence = require('../persistence/SCIHF');
const ForestLPPersistence = require('../persistence/forestLP');

const SCIHFService = require('../service/SCIHF');
const ForestLPService = require('../service/forestLP');

const SCIHFRoute = require('../route/SCIHF');
const ForestLPRoute = require('../route/forestLP');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('restAPI', () => restAPI);

bottle.factory('SCIHFPersistence', () =>
  SCIHFPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('ForestLPPersistence', () =>
  ForestLPPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('SCIHFService', (container) =>
  SCIHFService(container.SCIHFPersistence, container.restAPI),
);

bottle.factory('ForestLPService', (container) => 
  ForestLPService(container.ForestLPPersistence, container.restAPI)
);

bottle.factory('routes', (container) => [
  SCIHFRoute(container.errorHandler, container.SCIHFService),
  ForestLPRoute(container.errorHandler, container.ForestLPService),
]);

module.exports = bottle.container;
