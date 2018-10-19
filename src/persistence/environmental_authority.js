module.exports = (db, { compensaciones2017carszhmun, eaBioticUnits }) => ({
  /**
   * Find total area grouped by compensation factor in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by compensation factor
   */
  findAreaByCF: envAuthorityId => (
    compensaciones2017carszhmun.query()
      .where('id_car', envAuthorityId)
      .sum('area_ha')
      .groupBy('fc_valor')
      .orderBy('fc_valor', 'asc')
      .select('fc_valor')
  ),

  /**
   * Find total area grouped by biotic unit in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by biotic unit
   */
  findAreaByBioticUnit: envAuthorityId => (
    eaBioticUnits.query()
      .where('id_ea', envAuthorityId)
      .sum('area_ha')
      .groupBy('name')
      .orderBy('name', 'asc')
      .select('name')
  ),

  /**
   * Find total area grouped by biome in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by biome
   */
  findAreaByBiome: envAuthorityId => (
    compensaciones2017carszhmun.query()
      .where('id_car', envAuthorityId)
      .sum('area_ha')
      .groupBy('bioma_prel')
      .orderBy('bioma_prel', 'asc')
      .select('bioma_prel')
  ),
});
