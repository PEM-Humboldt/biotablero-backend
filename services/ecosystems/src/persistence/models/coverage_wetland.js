module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'coverage_wetland',
    idAttribute: 'id',
  });
