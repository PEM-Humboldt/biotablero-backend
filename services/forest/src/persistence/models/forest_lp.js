module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'forest_lp',
    idAttribute: 'id',
  });
