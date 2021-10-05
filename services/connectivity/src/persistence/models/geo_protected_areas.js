module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_protected_areas',
    idAttribute: 'gid',
  });
