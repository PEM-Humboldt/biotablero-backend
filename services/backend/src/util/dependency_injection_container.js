const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');
const AWSUtils = require('./AWS');

const bookshelfModels = require('../persistence/models/setup');

const BiomePersistence = require('../persistence/biome');
const ProjectPersistence = require('../persistence/project');
const ProjectStrategyPersistence = require('../persistence/project_strategy');
const StrategyPersistence = require('../persistence/strategy');
const EAPersistence = require('../persistence/environmental_authority');
const StatePersistence = require('../persistence/state');
const MunicipalityPersistence = require('../persistence/municipality');
const PAPersistence = require('../persistence/protected_area');
const BasinAreaPersistence = require('../persistence/basin_area');
const BasinZonePersistence = require('../persistence/basin_zone');
const BasinSubzonePersistence = require('../persistence/basin_subzone');
const SEPersistence = require('../persistence/strategyc_ecosystem');
const ParamoPersistence = require('../persistence/paramo');
const TropicalDryForestPersistence = require('../persistence/tropicalDryForest');
const WetlandPersistence = require('../persistence/wetland');
const GlobalProtectedAreaPersistence = require('../persistence/global_protected_area');

const BiomeService = require('../service/biome');
const ProjectService = require('../service/project');
const ProjectStrategyService = require('../service/project_strategy');
const StrategyService = require('../service/strategy');
const EAService = require('../service/environmental_authority');
const UserService = require('../service/user');
const StateService = require('../service/state');
const MunicipalityService = require('../service/municipality');
const PAService = require('../service/protected_area');
const BasinAreaService = require('../service/basin_area');
const BasinZoneService = require('../service/basin_zone');
const BasinSubzoneService = require('../service/basin_subzone');
const SEService = require('../service/strategic_ecosystem');
const GlobalProtectedAreaService = require('../service/global_protected_area');

const BiomesRoutes = require('../routes/biomes');
const ProjectsRoutes = require('../routes/projects');
const ProjectStrategiesRoutes = require('../routes/project_strategies');
const StrategiesRoutes = require('../routes/strategies');
const MunicipalitiesRoutes = require('../routes/municipalities');
const UsersRoutes = require('../routes/users');
const EARoutes = require('../routes/environmental_authorities');
const StatesRoutes = require('../routes/states');
const PARoutes = require('../routes/protected_areas');
const BasinsRoutes = require('../routes/basins');
const BasinSubzonesRoutes = require('../routes/basin_subzones');
const SERoutes = require('../routes/strategic_ecosystems');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', (container) => ErrorHandler(container.logger));
bottle.factory('aws', () => AWSUtils);

bottle.factory('biomePersistence', () =>
  BiomePersistence(bookshelfModels.db, bookshelfModels.models, bookshelfModels.collections),
);
bottle.factory('projectPersistence', () =>
  ProjectPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('projectStrategyPersistence', () =>
  ProjectStrategyPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('strategyPersistence', () =>
  StrategyPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('eaPersistence', () => EAPersistence(bookshelfModels.db, bookshelfModels.models));
bottle.factory('statePersistence', () =>
  StatePersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('municipalityPersistence', () =>
  MunicipalityPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('paPersistence', () => PAPersistence(bookshelfModels.db, bookshelfModels.models));
bottle.factory('basinAreaPersistence', () =>
  BasinAreaPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('basinZonePersistence', () =>
  BasinZonePersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('basinSubzonePersistence', () =>
  BasinSubzonePersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('sePersistence', () => SEPersistence(bookshelfModels.db, bookshelfModels.models));
bottle.factory('paramoPersistence', () =>
  ParamoPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('tropicalDryForestPersistence', () =>
  TropicalDryForestPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('wetlandPersistence', () =>
  WetlandPersistence(bookshelfModels.db, bookshelfModels.models),
);
bottle.factory('globalProtectedAreaPersistence', (container) =>
  GlobalProtectedAreaPersistence(bookshelfModels.db, bookshelfModels.models, container.logger),
);

bottle.factory('biomeService', (container) => BiomeService(container.biomePersistence));
bottle.factory('projectService', (container) =>
  ProjectService(container.projectPersistence, container.biomeService),
);
bottle.factory('projectStrategyService', (container) =>
  ProjectStrategyService(container.projectStrategyPersistence, container.aws),
);
bottle.factory('strategyService', (container) =>
  StrategyService(container.strategyPersistence, container.logger),
);
bottle.factory('eaService', (container) =>
  EAService(container.eaPersistence, container.seService, container.globalProtectedAreaService),
);
bottle.factory('userService', () => UserService());
bottle.factory('stateService', (container) =>
  StateService(container.statePersistence, container.municipalityService, container.seService),
);
bottle.factory('municipalityService', (container) =>
  MunicipalityService(container.municipalityPersistence),
);
bottle.factory('paService', (container) => PAService(container.paPersistence, container.seService));
bottle.factory('basinAreaService', (container) => BasinAreaService(container.basinAreaPersistence));
bottle.factory('basinZoneService', (container) => BasinZoneService(container.basinZonePersistence));
bottle.factory('basinSubzoneService', (container) =>
  BasinSubzoneService(container.basinSubzonePersistence, container.seService),
);
bottle.factory('seService', (container) =>
  SEService(
    container.sePersistence,
    container.paramoPersistence,
    container.tropicalDryForestPersistence,
    container.wetlandPersistence,
  ),
);
bottle.factory('globalProtectedAreaService', (container) =>
  GlobalProtectedAreaService(container.globalProtectedAreaPersistence),
);

bottle.factory('routes', (container) => [
  BiomesRoutes(container.errorHandler, container.biomeService),
  ProjectsRoutes(container.errorHandler, container.projectService),
  ProjectStrategiesRoutes(container.errorHandler, container.projectStrategyService),
  StrategiesRoutes(container.errorHandler, container.strategyService),
  MunicipalitiesRoutes(container.errorHandler, container.municipalityService),
  UsersRoutes(container.errorHandler, container.userService),
  EARoutes(container.errorHandler, container.eaService),
  StatesRoutes(container.errorHandler, container.stateService),
  PARoutes(container.errorHandler, container.paService),
  BasinsRoutes(container.errorHandler, container.basinAreaService, container.basinZoneService),
  BasinSubzonesRoutes(container.errorHandler, container.basinSubzoneService),
  SERoutes(container.errorHandler, container.seService),
]);

module.exports = bottle.container;
