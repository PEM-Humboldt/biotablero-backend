module.exports = (db, { geoStates }) => ({
  /**
   * Get all states id and name
   */
  findAll: () => (
    geoStates.query()
      .select('id_state as id', 'name')
  ),
});
