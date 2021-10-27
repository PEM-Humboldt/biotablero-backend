module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_conn_wetland',
    idAttribute: 'id',
  });
