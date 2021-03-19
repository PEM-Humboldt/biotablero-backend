module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_basin_areas',
    idAttribute: 'id_basin',
  })
);
