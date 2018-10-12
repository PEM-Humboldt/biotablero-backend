module.exports = bookshelf => (
  bookshelf.Model.extend({
    // Table name will change to geo_biomes (talked about it with Alejandro)
    tableName: 'biomes',
    idAttribute: 'id_biome',
  })
);
