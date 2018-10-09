module.exports = strategyPersistence => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: async strategy => strategyPersistence.createStrategy(strategy),

  /**
   * List all strategies that belong to a user and project
   *
   * @param {Number} userId strategies owner id
   * @param {Number} projectId project associated with the stretegies
   *
   * @returns {Object[]} list of project strategies
   */
  listStrategies: async (userId, projectId) => (
    strategyPersistence.findByUserAndProject(userId, projectId)
  ),
});
