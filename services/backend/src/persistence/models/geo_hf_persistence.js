module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_hf_persistence',
    idAttribute: 'gid',
  });
