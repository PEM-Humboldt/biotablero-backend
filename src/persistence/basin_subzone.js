module.exports = (db, { geoBasinSubzones }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinSubzones.query()
      .select('id_subzone as id', 'name_subzone as name', 'id_zone', 'id_basin')
  ),

  /**
   * Get the total area for the given subzone
   *
   * @param {String} subzoneId subzone id
   */
  getTotalAreaBySubzone: subzoneId => (
    geoBasinSubzones.query()
      .where('id_subzone', subzoneId)
      .select('area_ha as area')
  ),
});
