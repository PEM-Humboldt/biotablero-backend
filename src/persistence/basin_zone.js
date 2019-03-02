module.exports = (db, { geoBasinZones }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinZones
      .fetchAll({ columns: ['id_zone', 'name_zone', 'id_basin'] })
      .then(zones => zones.toJSON())
  ),
});
