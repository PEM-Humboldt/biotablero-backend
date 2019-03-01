module.exports = statePersistence => ({
  /**
   * Get a list with states information
   */
  getAll: async () => statePersistence.findAll(),
});
