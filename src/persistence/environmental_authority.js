module.exports = (
  db,
  { colombiaDetails, eaBioticUnits, environmentalAuthorities },
) => ({
  /**
   * Find total area grouped by compensation factor in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by compensation factor
   */
  findAreaByCF: envAuthorityId => (
    colombiaDetails.query()
      .where('idcar', envAuthorityId)
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
      .sum('area_ha as area')
      .groupBy('name')
      .orderBy('name', 'asc')
      .select('name as key')
  ),

  /**
   * Find total area grouped by biome in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by biome
   */
  findAreaByBiome: envAuthorityId => (
    colombiaDetails.query()
      .where('idcar', envAuthorityId)
      .sum('area_ha as area')
      .groupBy('bioma_prel')
      .orderBy('bioma_prel', 'asc')
      .select('bioma_prel as key')
  ),

  /**
   * Find total area grouped by sub-basin in a given environmental authority filtered by biome
   *
   * @param {String} envAuthorityId environmental authority id
   * @param {String} biomeName biome name
   *
   * @returns {Object[]} total areas by sub-basin
   */
  findBiomeAreaBySubzone: (envAuthorityId, biomeName) => (
    colombiaDetails.query()
      .where({ idcar: envAuthorityId, bioma_iavh: biomeName })
      .sum('area_ha as area')
      .groupBy('nomszh')
      .orderBy('nomszh', 'asc')
      .select('nomszh as key')
  ),

  /**
   * Get all environmental authorities id and name
   */
  findAll: () => (
    environmentalAuthorities.query()
      .select('id_ea as id', 'name')
  ),
});
