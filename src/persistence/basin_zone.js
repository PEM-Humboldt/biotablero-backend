module.exports = (db, { geoBasinZones }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinZones.query()
      .select('id_zone as id', 'name_zone as name', 'id_basin')
  ),
});
