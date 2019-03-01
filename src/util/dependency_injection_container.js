const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfModels = require('../persistence/models/setup');

const BiomePersistence = require('../persistence/biome');
const ProjectPersistence = require('../persistence/project');
const ProjectStrategyPersistence = require('../persistence/project_strategy');
const StrategyPersistence = require('../persistence/strategy');
const EAPersistence = require('../persistence/environmental_authority');
const StatePersistence = require('../persistence/state');
const MunicipalityPersistence = require('../persistence/municipality');

const BiomeService = require('../service/biome');
const ProjectService = require('../service/project');
const ProjectStrategyService = require('../service/project_strategy');
const StrategyService = require('../service/strategy');
const EAService = require('../service/environmental_authority');
const UserService = require('../service/user');
const StateService = require('../service/state');
const MunicipalityService = require('../service/municipality');

const BiomesRoutes = require('../routes/biomes');
const ProjectsRoutes = require('../routes/projects');
const ProjectStrategiesRoutes = require('../routes/project_strategies');
const StrategiesRoutes = require('../routes/strategies');
const GeofencesRoutes = require('../routes/geofences');
const UsersRoutes = require('../routes/users');
const EARoutes = require('../routes/environmental_authorities');

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
bottle.factory('strategyPersistence', () => (
  StrategyPersistence(bookshelfModels.db, bookshelfModels.models)
));
bottle.factory('eaPersistence', () => (
  EAPersistence(bookshelfModels.db, bookshelfModels.models)
));
bottle.factory('statePersistence', () => (
  StatePersistence(bookshelfModels.db, bookshelfModels.models)
));
bottle.factory('municipalityPersistence', () => (
  MunicipalityPersistence(bookshelfModels.db, bookshelfModels.models)
));

bottle.factory('biomeService', container => BiomeService(container.biomePersistence));
bottle.factory('projectService', container => (
  ProjectService(container.projectPersistence, container.biomeService)
));
bottle.factory('projectStrategyService',
  container => ProjectStrategyService(container.projectStrategyPersistence));
bottle.factory('strategyService',
  container => StrategyService(container.strategyPersistence, container.logger));
bottle.factory('eaService',
  container => EAService(container.eaPersistence));
bottle.factory('userService', () => UserService());
bottle.factory('stateService',
  container => StateService(container.statePersistence));
bottle.factory('municipalityService',
  container => MunicipalityService(container.municipalityPersistence));

bottle.factory('routes', container => ([
  BiomesRoutes(container.errorHandler, container.biomeService),
  ProjectsRoutes(container.errorHandler, container.projectService),
  ProjectStrategiesRoutes(container.errorHandler, container.projectStrategyService),
  StrategiesRoutes(container.errorHandler, container.strategyService),
  GeofencesRoutes(
    container.errorHandler, container.eaService, container.stateService,
    container.municipalityService,
  ),
  UsersRoutes(container.errorHandler, container.userService),
  EARoutes(container.errorHandler, container.eaService),
]));


module.exports = bottle.container;
