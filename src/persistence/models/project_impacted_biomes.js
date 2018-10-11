const requiredFields = ['id_project', 'id_ea', 'id_subzone', 'id_biome'];

/**
 * Create a model for the project_impacted_biomes table
 *
 * @param {Object} bookshelf bookshelf ref to create the model
 * @param {Object} eventHandlers default event handlers, see util/events to see available ones
 */
module.exports = (bookshelf, { saving }) => (
  bookshelf.Model.extend({
    tableName: 'project_impacted_biomes',
    idAttribute: 'id',
    defaults: {
      natural_area_ha: 0,
      seconday_area_ha: 0,
      transformed_area_ha: 0,
      area_impacted_ha: 0,
      area_to_compensate_ha: 0,
    },

    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      // See note on http://bookshelfjs.org/index.html#Model-event-saving
      this.on('saving', model => saving(requiredFields, model.changed));
    },
  })
);
