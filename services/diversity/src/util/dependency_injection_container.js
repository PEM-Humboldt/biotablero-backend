const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const bookshelfModels = require('../persistence/models/setup.js');

const RichnessService = require('../services/richness');

const RichnessRoute = require('../routes/richness');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('RichnessService', () => RichnessService());

bottle.factory('routes', container => ([
  RichnessRoute(container.errorHandler, container.RichnessService),
]));

module.exports = bottle.container;
