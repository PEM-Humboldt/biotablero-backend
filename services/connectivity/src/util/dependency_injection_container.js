const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const ConnectivityPersistence = require('../persistence/connectivity');

const ConnectivityService = require('../service/connectivity');

const ConnectivityRoutes = require('../routes/connectivity');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('connectivityPersistence', () => (
  ConnectivityPersistence(bookshelfModels.db, bookshelfModels.models, logger)
));

bottle.factory('connectivityService', container => ConnectivityService(container.connectivityPersistence));

bottle.factory('routes', container => ([
  ConnectivityRoutes(container.errorHandler, container.connectivityService),
]));

module.exports = bottle.container;
