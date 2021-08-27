module.exports = (db, { geoBasinAreas }) => ({
  /**
   * Get all basin areas
   */
  findAll: () => geoBasinAreas.query().select('id_basin as id', 'name_basin as name'),
});
