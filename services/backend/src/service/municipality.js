module.exports = municipalityPersistence => ({
  /**
   * Get a list with all municipalities information
   */
  getAll: async () => municipalityPersistence.findAll(),

  /**
   * Get municipalities in the given state
   *
   * @param stateId state Id to filter by
   */
  getByState: async stateId => municipalityPersistence.findByState(stateId),
});
