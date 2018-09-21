const Bottlejs = require('bottlejs');

const pino = require('pino');
const bookshelfConn = require('./persistence/connection');

const BiomeByEAModel = require('./persistence/models/BiomeByEA');

const BiomePersistence = require('./persistence/biome');

const BiomeService = require('./service/biome');

const GeofencesRoutes = require('./routes/geofences');

const bottle = new Bottlejs();

bottle.factory('logger', () => (
  pino({ base: null, timestamp: () => `,"time": ${new Date(Date.now()).toUTCString()}` })
));

bottle.factory('bookshelfConn', () => bookshelfConn);
bottle.factory('biomeByEA', container => BiomeByEAModel(container.bookshelfConn));
bottle.factory('biomePersistence', container => (
  BiomePersistence(container.bookshelfConn, { BiomeByEA: container.biomeByEA })
));
bottle.factory('biomeService', container => BiomeService(container.biomePersistence));
bottle.factory('routes', container => ([
  GeofencesRoutes(container.biomeService),
]));


module.exports = bottle.container;
