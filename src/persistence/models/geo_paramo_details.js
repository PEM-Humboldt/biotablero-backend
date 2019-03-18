module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_paramo_details',
    idAttribute: 'gid',
  })
);
