module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_integrity',
    idAttribute: 'gid',
  });
