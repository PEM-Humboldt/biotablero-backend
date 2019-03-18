module.exports = (db, { geoBasinSubzones, colombiaDetails }) => ({
  /**
   * Get all basin zones
   */
  findAll: () => (
    geoBasinSubzones.query()
      .select('id_subzone as id', 'name_subzo as name', 'id_zone', 'id_basin')
  ),

  /**
   * Get the total area for the given subzone
   *
   * @param {String} subzoneId subzone id
   */
  getTotalAreaBySubzone: subzoneId => (
    colombiaDetails.query()
      .where('id_sz', subzoneId)
      .sum('area_ha as area')
  ),
});
