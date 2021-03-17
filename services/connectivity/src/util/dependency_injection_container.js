const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

// eslint-disable-next-line no-unused-vars
const bookshelfModels = require('../persistence/models/setup');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('routes', () => ([

]));

module.exports = bottle.container;
