const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const restAPI = require('./restAPI');

const bookshelfModels = require('../persistence/models/setup');
const CoveragePersistence = require('../persistence/coverage');

const CoverageService = require('../services/coverage');

const CoverageRoute = require('../routes/coverage');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));
bottle.factory('restAPI', () => restAPI);

bottle.factory('CoveragePersistence', () =>
  CoveragePersistence(bookshelfModels.db, bookshelfModels.models, logger),
);
bottle.factory('CoverageService', (container) =>
  CoverageService(container.CoveragePersistence, container.restAPI),
);

bottle.factory('routes', (container) => [
  CoverageRoute(container.errorHandler, container.CoverageService),
]);

module.exports = bottle.container;
