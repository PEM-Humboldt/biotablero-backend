module.exports = (basinZonePersistence) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinZonePersistence.findAll(),
});
