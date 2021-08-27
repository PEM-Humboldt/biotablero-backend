module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'richness_nos',
    idAttribute: 'id',
  });
