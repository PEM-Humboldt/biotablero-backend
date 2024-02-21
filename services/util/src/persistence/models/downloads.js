module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'downloads',
    idAttribute: 'id',
  });
