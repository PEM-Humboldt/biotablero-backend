module.exports = (db, { geoBasinSubzones }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinSubzones
      .fetchAll({ columns: ['id_subzone', 'name_subzo', 'id_zone', 'id_basin'] })
      .then(zones => zones.toJSON())
  ),
});
