module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_conn_tropical_dry_forest',
    idAttribute: 'gid',
  });
