const Bottlejs = require('bottlejs');

const bookshelfConn = require('./persistence/connection');

const BiomeByEAModel = require('./persistence/models/BiomeByEA');

const BiomePersistence = require('./persistence/biome');

const bottle = new Bottlejs();

bottle.factory('bookshelfConn', () => bookshelfConn);
bottle.factory('BiomeByEA', container => BiomeByEAModel(container.bookshelfConn));
bottle.factory('biomePersistence', container => (
  BiomePersistence(container.bookshelfConn, { BiomeByEA: container.BiomeByEA })
));


module.exports = bottle.container;
