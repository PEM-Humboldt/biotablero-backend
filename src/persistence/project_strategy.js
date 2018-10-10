module.exports = (db, { selectedStrategies }) => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: strategy => selectedStrategies.forge(strategy).save(),

  /**
   * Find all selected strategies with the given user id and project id
   *
   * @param {Number} userId strategies owner id
   * @param {Number} projectId project associated with the stretegies
   *
   * @returns {Object[]} List of selected strategies
   */
  findByUserAndProject: (userId, projectId) => {
    console.log(selectedStrategies);
    return selectedStrategies
      .where({ id_user: userId, id_project: projectId })
      .fetch({ withRelated: 'biome' })
      .then((results) => {
        console.log(results);
        console.log('-------------------');
        console.log(results.related('biome').toJSON());
        return results.toJSON();
      });
  },
});
