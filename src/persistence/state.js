module.exports = (db, { geoStates }) => ({
  /**
   * Get all states id and name
   */
  findAll: () => (
    geoStates.query()
      .select('id_state as id', 'name')
  ),

  /**
   * Get the total area for the given state
   *
   * @param {String} stateId state id
   */
  getTotalAreaByState: stateId => (
    geoStates.query()
      .where('id_state', stateId)
      .select('area_ha as area')
  ),
});
