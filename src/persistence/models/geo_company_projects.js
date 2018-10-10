const requiredFields = ['name', 'id_company', 'id_region'];

/**
 * Create a model for the geo_company_projects table
 *
 * @param {Object} bookshelf bookshelf ref to create the model
 * @param {Object} param1 default event handlers, see util/events to see available ones
 */
module.exports = (bookshelf, { saving }) => (
  bookshelf.Model.extend({
    tableName: 'geo_company_projects',
    idAttribute: 'gid',
    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      // See note on http://bookshelfjs.org/index.html#Model-event-saving
      this.on('saving', model => saving(requiredFields, model.changed));
    },
  })
);
