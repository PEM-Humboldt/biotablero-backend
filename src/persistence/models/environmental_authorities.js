module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'environmental_authorities',
    idAttribute: 'id_ea',
  })
);
