module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_wetland_details',
    idAttribute: 'gid',
  })
);
