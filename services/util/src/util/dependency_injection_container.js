const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const TextsPersistence = require('../persistence/texts');

const UtilService = require('../services/util');

const UtilRoute = require('../routes/util');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('TextsPersistence', () =>
  TextsPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('UtilService', (container) =>
  UtilService(container.TextsPersistence),
);

bottle.factory('routes', (container) => [
  UtilRoute(container.errorHandler, container.UtilService),
]);

module.exports = bottle.container;
