module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'hidro_areas',
    idAttribute: 'id_subzone',
  })
);
