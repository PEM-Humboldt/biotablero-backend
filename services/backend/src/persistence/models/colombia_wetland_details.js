module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'colombia_wetland_details',
    idAttribute: 'gid',
  });
