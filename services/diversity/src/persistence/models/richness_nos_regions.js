module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'richness_nos_regions',
    idAttribute: 'id',
  })
);
