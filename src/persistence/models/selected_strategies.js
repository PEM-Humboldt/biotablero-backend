const requiredFields = ['id_biome', 'id_ea', 'id_h_subzone', 'id_strategy', 'area', 'id_project',
  'id_user'];

/**
 * Event: http://bookshelfjs.org/index.html#Model-event-saving
 * Note: There's currently a bug that leads to attrs only containing attributes that were
 * passed as argument to save. You can work around this by accessing model.changed which
 * does contain all the attributes that will be inserted or updated.
 */
const onSaving = (model) => {
  const missing = requiredFields.filter(field => !model.changed[field]);
  if (missing.length > 0) {
    const error = new Error(`The following properties are missing a value: ${missing}`);
    error.code = 400;
    throw error;
  }
};

module.exports = bookshelf => (
  bookshelf.Model.extend({
    tableName: 'selected_strategies',
    defaults: { register_date: new Date() },
    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      this.on('saving', onSaving);
    },
  })
);
