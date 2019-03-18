module.exports = (db, { geoParamoDetails }) => ({
  /**
   * Get areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  findAreaByEA: eaId => (
    geoParamoDetails.query()
      .where('id_ea', eaId)
      .sum('area_ha as area')
  ),
});
