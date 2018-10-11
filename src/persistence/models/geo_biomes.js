module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'biomes',
    idAttribute: 'id_biome',
  })
);
