module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'coverage_paramos',
    idAttribute: 'id',
  });
