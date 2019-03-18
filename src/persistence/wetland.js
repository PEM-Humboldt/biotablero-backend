module.exports = (db, { geoWetlandDetails2002 }) => ({
  /**
   * Get areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  findAreaByEA: eaId => (
    geoWetlandDetails2002.query()
      .where('id_ea', eaId)
      .sum('area_ha as area')
  ),
});
