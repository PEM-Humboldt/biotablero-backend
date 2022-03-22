module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'coverage_dry_forest',
    idAttribute: 'id',
  });
