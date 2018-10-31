module.exports = (
  db,
  { compensaciones2017carszhmun, eaBioticUnits, environmentalAuthorities },
) => ({
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
    compensaciones2017carszhmun.query()
      .where('id_car', envAuthorityId)
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
    compensaciones2017carszhmun.query()
      .where({ id_car: envAuthorityId, bioma_iavh: biomeName })
      .sum('area_ha as area')
      .groupBy('nom_szh')
      .orderBy('nom_szh', 'asc')
      .select('nom_szh as key')
  ),

  /**
   * Get all environmental authorities id and name
   */
  findAll: () => (
    environmentalAuthorities
      .fetchAll({ columns: ['id_ea', 'name'] })
      .then(ea => ea.toJSON())
  ),
});
