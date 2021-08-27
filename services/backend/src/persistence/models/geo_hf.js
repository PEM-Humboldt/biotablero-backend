module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_hf',
    idAttribute: 'gid',
  });
