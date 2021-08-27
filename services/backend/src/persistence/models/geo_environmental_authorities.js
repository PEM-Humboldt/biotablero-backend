module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_environmental_authorities',
    idAttribute: 'gid',
  });
