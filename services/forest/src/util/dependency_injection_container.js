const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const SCIHFPersistence = require('../persistence/SCIHF');

const SCIHFService = require('../service/SCIHF');

const SCIHFRoute = require('../route/SCIHF');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('SCIHFPersistence', () => (
  SCIHFPersistence(bookshelfModels.db, bookshelfModels.models)
));

bottle.factory('SCIHFService', container => SCIHFService(container.SCIHFPersistence));

bottle.factory('routes', container => ([
  SCIHFRoute(container.errorHandler, container.SCIHFService),
]));


module.exports = bottle.container;
