module.exports = (basinAreaPersistence) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinAreaPersistence.findAll(),
});
