const requiredFields = ['name', 'id_company', 'id_region'];

/**
 * Create a model for the geo_company_projects table
 *
 * @param {Object} bookshelf bookshelf ref to create the model
 * @param {Object} handlers default event handlers, see util/events to see available ones
 */
module.exports = (bookshelf, { saving }) => {
  const obj = bookshelf.Model.extend({
    tableName: 'geo_company_projects',
    idAttribute: 'gid',
    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      // See note on http://bookshelfjs.org/index.html#Model-event-saving
      this.on('saving', model => saving(requiredFields, model.attributes));
    },
  });

  /**
   * Associate with required models
   *
   * @param {Object} models set of available objects to relate with
   */
  obj.setRelations = (models) => {
    /* eslint-disable no-param-reassign */
    models.geoCompanyProjects.prototype.biomes = function biomes() {
      return this.belongsToMany(
        models.geoBiomes, 'project_impacted_biomes', 'id_project', 'id_biome',
      );
    };
  };
  /* eslint-enable no-param-reassign */

  return obj;
};
