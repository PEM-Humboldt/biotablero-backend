const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfConn = require('../persistence/connection');
const GeoEABiome = require('../persistence/models/geo_ea_biomes');
const GeoCompanyProject = require('../persistence/models/geo_company_project');

const BiomePersistence = require('../persistence/biome');
const ProjectPersistence = require('../persistence/project');

const BiomeService = require('../service/biome');
const ProjectService = require('../service/project');

const GeofencesRoutes = require('../routes/geofences');
const ProjectsRoutes = require('../routes/projects');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('bookshelfConn', () => bookshelfConn);
bottle.factory('geoEABiome', container => GeoEABiome(container.bookshelfConn));
bottle.factory('geoCompanyProject', container => GeoCompanyProject(container.bookshelfConn));

bottle.factory('biomePersistence', container => (
  BiomePersistence(container.bookshelfConn, { GeoEABiome: container.geoEABiome })
));
bottle.factory('projectPersistence', container => (
  ProjectPersistence(container.bookshelfConn, { GeoCompanyProject: container.geoCompanyProject })
));

bottle.factory('biomeService', container => BiomeService(container.biomePersistence));
bottle.factory('projectService', container => ProjectService(container.projectPersistence));

bottle.factory('routes', container => ([
  GeofencesRoutes(container.errorHandler, container.biomeService),
  ProjectsRoutes(container.errorHandler, container.projectService),
]));


module.exports = bottle.container;
