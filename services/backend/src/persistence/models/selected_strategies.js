const requiredFields = [
  'id_biome',
  'id_ea',
  'id_subzone',
  'id_strategy',
  'area',
  'id_project',
  'id_user',
];

/**
 * Create a model for the selected_strategies table
 *
 * @param {Object} bookshelf bookshelf ref to create the model
 * @param {Object} eventHandlers default event handlers, see util/events to see available ones
 */
module.exports = (bookshelf, { saving }) => {
  const obj = bookshelf.Model.extend({
    tableName: 'selected_strategies',
    defaults: { register_date: new Date() },

    constructor: function constructor(...args) {
      bookshelf.Model.apply(this, args);
      // See note on http://bookshelfjs.org/index.html#Model-event-saving
      this.on('saving', (model) => saving(requiredFields, model.changed));
    },
  });

  /**
   * Associate with required models
   *
   * @param {Object} models set of available objects to relate with
   */
  obj.setRelations = (models) => {
    /* eslint-disable no-param-reassign */
    models.selectedStrategies.prototype.biome = function biome() {
      return this.belongsTo(models.geoBiomes, 'id_biome', 'id_biome');
    };
    models.selectedStrategies.prototype.ea = function biome() {
      return this.belongsTo(models.geoEnvironmentalAuthorities, 'id_ea', 'geofence_id');
    };
    models.selectedStrategies.prototype.szh = function biome() {
      return this.belongsTo(models.geoBasinSubzones, 'id_subzone', 'geofence_id');
    };
    models.selectedStrategies.prototype.strategy = function biome() {
      return this.belongsTo(models.strategies, 'id_strategy', 'id_strategy');
    };
  };
  /* eslint-enable no-param-reassign */
  return obj;
};
