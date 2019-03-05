module.exports = basinSubzonePersistence => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinSubzonePersistence.findAll(),
});
