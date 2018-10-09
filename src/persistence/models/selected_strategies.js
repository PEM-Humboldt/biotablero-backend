const requiredFields = ['id_biome', 'id_ea', 'id_h_subzone', 'id_strategy', 'area', 'id_project',
  'id_user'];

/**
 * Create a model for the selected_strategies table
 *
 * @param {Object} bookshelf bookshelf ref to create the model
 * @param {Object} param1 default event handlers, see util/events to see available ones
 */
module.exports = (bookshelf, { saving }) => (
  bookshelf.Model.extend({
    tableName: 'selected_strategies',
    defaults: { register_date: new Date() },
    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      // See note on http://bookshelfjs.org/index.html#Model-event-saving
      this.on('saving', model => saving(requiredFields, model.changed));
    },
  })
);
