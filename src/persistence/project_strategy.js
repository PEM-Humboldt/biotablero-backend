module.exports = (bookshelfConn, { SelectedStrategies }) => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: strategy => SelectedStrategies.forge(strategy).save(),

  /**
   * Find all selected strategies with the given user id and project id
   *
   * @param {Number} userId strategies owner id
   * @param {Number} projectId project associated with the stretegies
   *
   * @returns {Object[]} List of selected strategies
   */
  findByUserAndProject: (userId, projectId) => (
    SelectedStrategies
      .where({ id_user: userId, id_project: projectId })
      .fetchAll()
      .then(results => results.toJSON())
  ),
});
