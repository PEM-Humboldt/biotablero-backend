module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_basin_zones',
    idAttribute: 'id_zone',
  })
);
