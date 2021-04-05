module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_municipalities',
    idAttribute: 'id_state',
  })
);
