module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_biomes',
    idAttribute: 'id_biome',
  })
);
