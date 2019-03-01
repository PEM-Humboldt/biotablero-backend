module.exports = municipalityPersistence => ({
  /**
   * Get a list with all municipalities information
   */
  getAll: async () => municipalityPersistence.findAll(),
});
