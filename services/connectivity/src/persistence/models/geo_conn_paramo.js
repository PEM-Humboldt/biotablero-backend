module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_conn_paramo',
    idAttribute: 'gid',
  });
