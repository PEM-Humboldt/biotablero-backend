module.exports = (db, { geoBasinAreas }) => ({
  /**
   * Get all basin areas
   */
  findAll: () => (
    geoBasinAreas
      .fetchAll({ columns: ['id_basin', 'name_basin'] })
      .then(basins => basins.toJSON())
  ),
});
