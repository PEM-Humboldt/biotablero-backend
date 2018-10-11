const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const BiomePersistence = require('../persistence/biome');
const ProjectPersistence = require('../persistence/project');
const ProjectStrategyPersistence = require('../persistence/project_strategy');

const BiomeService = require('../service/biome');
const ProjectService = require('../service/project');
const ProjectStrategyService = require('../service/project_strategy');

const GeofencesRoutes = require('../routes/geofences');
const ProjectsRoutes = require('../routes/projects');
const ProjectStrategiesRoutes = require('../routes/project_strategies');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('biomePersistence', () => (
  BiomePersistence(bookshelfModels.db, bookshelfModels.models, bookshelfModels.collections)
));
bottle.factory('projectPersistence', () => (
  ProjectPersistence(bookshelfModels.db, bookshelfModels.models)
));
bottle.factory('projectStrategyPersistence', () => (
  ProjectStrategyPersistence(bookshelfModels.db, bookshelfModels.models)
));

bottle.factory('biomeService', container => BiomeService(container.biomePersistence));
bottle.factory('projectService', container => (
  ProjectService(container.projectPersistence, container.biomeService)
));
bottle.factory('projectStrategyService',
  container => ProjectStrategyService(container.projectStrategyPersistence));

bottle.factory('routes', container => ([
  GeofencesRoutes(container.errorHandler, container.biomeService),
  ProjectsRoutes(container.errorHandler, container.projectService),
  ProjectStrategiesRoutes(container.errorHandler, container.projectStrategyService),
]));


module.exports = bottle.container;
