module.exports = strategyPersistence => ({
  /**
   * Create a new project strategy
   *
   * @param {}
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: async (projectId, strategy) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }
    return strategyPersistence.createStrategy({ ...strategy, id_project: pId });
  },

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
