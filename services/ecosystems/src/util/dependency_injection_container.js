const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const restAPI = require('./restAPI');

const bookshelfModels = require('../persistence/models/setup');
const CoveragePersistence = require('../persistence/coverage');
const CoverageDryForestPersistence = require('../persistence/coverageDryForest');
const CoverageParamoPersistence = require('../persistence/coverageParamo');
const CoverageWetlandPersistence = require('../persistence/coverageWetland');

const EcosystemsService = require('../services/ecosystems');

const EcosystemsRoute = require('../routes/ecosystems');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));
bottle.factory('restAPI', () => restAPI);

bottle.factory('CoveragePersistence', () =>
  CoveragePersistence(bookshelfModels.db, bookshelfModels.models, logger),
);
bottle.factory('CoverageDryForestPersistence', () =>
  CoverageDryForestPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);
bottle.factory('CoverageParamoPersistence', () =>
  CoverageParamoPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);
bottle.factory('CoverageWetlandPersistence', () =>
  CoverageWetlandPersistence(bookshelfModels.db, bookshelfModels.models, logger),
);

bottle.factory('EcosystemsService', (container) =>
  EcosystemsService(
    container.CoveragePersistence,
    container.CoverageDryForestPersistence,
    container.CoverageParamoPersistence,
    container.CoverageWetlandPersistence,
    container.restAPI,
  ),
);

bottle.factory('routes', (container) => [
  EcosystemsRoute(container.errorHandler, container.EcosystemsService),
]);

module.exports = bottle.container;
