module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_wetlands',
    idAttribute: 'id_ecosystem',
  });
