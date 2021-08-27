module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_paramo',
    idAttribute: 'id_ecosystem',
  });
