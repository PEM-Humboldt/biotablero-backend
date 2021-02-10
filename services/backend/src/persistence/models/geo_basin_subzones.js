module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_basin_subzones',
    idAttribute: 'id_subzone',
  })
);
