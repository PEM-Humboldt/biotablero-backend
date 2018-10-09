module.exports = strategyPersistence => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: async strategy => strategyPersistence.createStrategy(strategy),
});
