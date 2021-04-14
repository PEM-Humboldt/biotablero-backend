const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const bookshelfModels = require('../persistence/models/setup');

const ConnectivityService = require('../service/connectivity');

const ConnectivityRoutes = require('../routes/connectivity');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('connectivityService', () => ConnectivityService());

bottle.factory('routes', container => ([
  ConnectivityRoutes(container.errorHandler, container.connectivityService),
]));

module.exports = bottle.container;
