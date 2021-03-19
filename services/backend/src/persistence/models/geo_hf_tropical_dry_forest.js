module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'geo_hf_tropical_dry_forest',
    idAttribute: 'gid',
  })
);
