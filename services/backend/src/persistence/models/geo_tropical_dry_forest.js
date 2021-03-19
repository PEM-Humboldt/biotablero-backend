module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_tropical_dry_forest',
    idAttribute: 'id_ecosystem',
  })
);
