module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'strategies',
    idAttribute: 'id_strategy',
  })
);
