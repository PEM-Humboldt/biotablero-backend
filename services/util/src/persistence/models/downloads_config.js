module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'downloads_config',
    idAttribute: 'id',
  });
