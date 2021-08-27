module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'connectivity_dpc',
    idAttribute: 'id',
  });
