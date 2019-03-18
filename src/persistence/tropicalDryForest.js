module.exports = (db, { geoTropicalDryForestDetails }) => ({
  /**
   * Get areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  findAreaByEA: eaId => (
    geoTropicalDryForestDetails.query()
      .where('id_ea', eaId)
      .sum('area_ha as area')
  ),
});
