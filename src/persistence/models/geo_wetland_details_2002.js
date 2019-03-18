module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_wetland_details_2002',
    idAttribute: 'gid',
  })
);
