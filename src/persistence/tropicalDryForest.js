module.exports = (db, { geoTropicalDryForestDetails }) => ({
  /**
   * Get the area inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  findAreaByEA: eaId => (
    geoTropicalDryForestDetails.query()
      .where('id_ea', eaId)
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
  ),

  /**
   * Get the area inside the given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   */
  findAreaBySubzone: subzoneId => (
    geoTropicalDryForestDetails.query()
      .where('id_subzone', subzoneId)
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
  ),
});
