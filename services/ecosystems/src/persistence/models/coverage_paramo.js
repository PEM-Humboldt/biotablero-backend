module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'coverage_paramo',
    idAttribute: 'id',
  });
