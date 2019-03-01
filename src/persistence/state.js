module.exports = (db, { geoStates }) => ({
  /**
   * Get all states id and name
   */
  findAll: () => (
    geoStates
      .fetchAll({ columns: ['id_state', 'name'] })
      .then(states => states.toJSON())
  ),
});
