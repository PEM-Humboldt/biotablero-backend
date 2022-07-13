const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const TextsPersistence = require('../persistence/texts');
const DownloadsPersistence = require('../persistence/downloads');

const UtilService = require('../services/util');
const DownloadsService = require('../services/downloads');

const UtilRoute = require('../routes/util');
const DownloadsRoute = require('../routes/downloads');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));

bottle.factory('TextsPersistence', () =>
  TextsPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);
bottle.factory('DownloadsPersistence', () =>
  DownloadsPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('UtilService', (container) => UtilService(container.TextsPersistence));
bottle.factory('DownloadsService', (container) => DownloadsService(container.DownloadsPersistence));

bottle.factory('routes', (container) => [
  UtilRoute(container.errorHandler, container.UtilService),
  DownloadsRoute(container.errorHandler, container.DownloadsService),
]);

module.exports = bottle.container;
