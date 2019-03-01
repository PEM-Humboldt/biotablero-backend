module.exports = (statePersistence, municipalityService) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => statePersistence.findAll(),

  /**
   * Get municipalities in the given state
   *
   * @param stateId state Id to filter by
   */
  getMunicipalities: async stateId => municipalityService.getByState(stateId),
});
