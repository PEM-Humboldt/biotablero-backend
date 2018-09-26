const Bottlejs = require('bottlejs');

const ErrorHandler = require('./errorHandler');
const logger = require('./logger');

const bookshelfConn = require('../persistence/connection');
const GeoEABiome = require('../persistence/models/geo_ea_biome');

const BiomePersistence = require('../persistence/biome');

const BiomeService = require('../service/biome');

const GeofencesRoutes = require('../routes/geofences');

const bottle = new Bottlejs();

bottle.factory('logger', () => logger);
bottle.factory('errorHandler', container => ErrorHandler(container.logger));

bottle.factory('bookshelfConn', () => bookshelfConn);
bottle.factory('geoEABiome', container => GeoEABiome(container.bookshelfConn));

bottle.factory('biomePersistence', container => (
  BiomePersistence(container.bookshelfConn, { GeoEABiome: container.geoEABiome })
));

bottle.factory('biomeService', container => BiomeService(container.biomePersistence));

bottle.factory('routes', container => ([
  GeofencesRoutes(container.errorHandler, container.biomeService),
]));


module.exports = bottle.container;
