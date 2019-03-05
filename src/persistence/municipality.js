module.exports = (db, { geoMunicipalities }) => ({
  /**
   * Get all municipalities id and name
   */
  findAll: () => (
    geoMunicipalities
      .fetchAll({ columns: ['id_municipality', 'municipality'] })
      .then(municipalities => municipalities.toJSON())
  ),

  /**
   * Get municipalities in the given state
   *
   * @param stateId state Id to filter by
   */
  findByState: async stateId => (
    geoMunicipalities.query()
      .where('id_state', stateId)
      .select('id_municipality', 'municipality')
  ),
});
