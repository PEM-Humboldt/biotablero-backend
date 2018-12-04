module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'colombia_details',
    idAttribute: 'gid',
  })
);
