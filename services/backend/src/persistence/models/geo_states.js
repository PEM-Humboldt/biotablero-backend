module.exports = (bookshelf) =>
  bookshelf.Model.extend({
    tableName: 'geo_states',
    idAttribute: 'id_state',
  });
