module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'connectivity',
    idAttribute: 'id',
  })
);
