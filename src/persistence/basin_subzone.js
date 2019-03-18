module.exports = (db, { geoBasinSubzones }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinSubzones.query()
      .select('id_subzone as id', 'name_subzone as name', 'id_zone', 'id_basin')
  ),
});
