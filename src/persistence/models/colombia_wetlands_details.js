module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'colombia_wetlands_details',
    idAttribute: 'gid',
  })
);
