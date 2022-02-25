module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'coverages',
    idAttribute: 'id',
  });
