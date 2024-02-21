module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'texts',
    idAttribute: 'id',
  });
