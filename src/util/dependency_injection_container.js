const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfConn = require('../persistence/connection');
const eventHandlers = require('../persistence/models/util/events');
const GeoEABiome = require('../persistence/models/geo_ea_biomes');
const GeoCompanyProjects = require('../persistence/models/geo_company_projects');
const SelectedStrategies = require('../persistence/models/selected_strategies');

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

bottle.factory('bookshelfConn', () => bookshelfConn);
bottle.factory('geoEABiome', container => GeoEABiome(container.bookshelfConn));
bottle.factory('geoCompanyProjects', container => (
  GeoCompanyProjects(container.bookshelfConn, eventHandlers)
));
bottle.factory('selectedStrategies', container => (
  SelectedStrategies(container.bookshelfConn, eventHandlers)
));

bottle.factory('biomePersistence', container => (
  BiomePersistence(container.bookshelfConn, { GeoEABiome: container.geoEABiome })
));
bottle.factory('projectPersistence', container => (
  ProjectPersistence(container.bookshelfConn, { GeoCompanyProjects: container.geoCompanyProjects })
));
bottle.factory('projectStrategyPersistence', container => (
  ProjectStrategyPersistence(container.bookshelfConn,
    { SelectedStrategies: container.selectedStrategies })
));

bottle.factory('biomeService', container => BiomeService(container.biomePersistence));
bottle.factory('projectService', container => ProjectService(container.projectPersistence));
bottle.factory('projectStrategyService',
  container => ProjectStrategyService(container.projectStrategyPersistence));

bottle.factory('routes', container => ([
  GeofencesRoutes(container.errorHandler, container.biomeService),
  ProjectsRoutes(container.errorHandler, container.projectService),
  ProjectStrategiesRoutes(container.errorHandler, container.projectStrategyService),
]));


module.exports = bottle.container;
