module.exports = (bookshelf) => {
  const obj = bookshelf.Model.extend({
    tableName: 'geo_compensation_strategies_2018',
    idAttribute: 'gid',
  });

  /**
   * Associate with required models
   *
   * @param {Object} models set of available objects to relate with
   */
  obj.setRelations = (models) => {
    /* eslint-disable no-param-reassign */
    models.geoCompensationStrategies2018.prototype.strategy = function strategy() {
      return this.belongsTo(models.strategies, 'id_strategy', 'id_strategy');
    };
    /* eslint-enable no-param-reassign */
  };

  return obj;
};
