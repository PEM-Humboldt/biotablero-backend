module.exports = (eaPersistence, seService) => ({
  /**
   * Get total area grouped by compensation factor for a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total area for each compensation factor
   */
  getAreaByCF: async (envAuthorityId) => {
    const areas = await eaPersistence.findAreaByCF(envAuthorityId);
    const keys = [];
    const values = [];
    areas.forEach((area) => {
      let fc = parseFloat(area.fc_valor);
      const fcDiff = fc - parseInt(fc, 10);
      if (fcDiff !== 0 && fcDiff !== 0.5) fc += 0.25;
      const key = keys.findIndex(e => e === fc);
      if (key === -1) {
        keys.push(fc);
        values.push(area.sum);
      } else {
        values[key] += area.sum;
      }
    });

    return keys.map((fc, idx) => ({ key: fc, area: values[idx] }));
  },

  /**
   * Get total area grouped by biotic unit for a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total area for each biotic unit
   */
  getAreaByBioticUnit: async envAuthorityId => eaPersistence.findAreaByBioticUnit(envAuthorityId),

  /**
   * Get total area grouped by biome for a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total area for each biome
   */
  getAreaByBiome: async envAuthorityId => eaPersistence.findAreaByBiome(envAuthorityId),

  /**
   * Get total area grouped by sub-basin given environmental authority filtered by a biome
   *
   * @param {String} envAuthorityId environmental authority id
   * @param {String} biomeName biome name
   *
   * @returns {Object[]} total area for each sub-basin
   */
  getBiomeAreaBySubzone: async (envAuthorityId, biomeName) => (
    eaPersistence.findBiomeAreaBySubzone(envAuthorityId, biomeName)
  ),

  /**
   * Get a list with all environmental authorities information
   */
  getAll: async () => eaPersistence.findAll(),

  /**
   * Get EA total area divided by strategic ecosystem type
   *
   * @param {String} envAuthorityId environmental authority id
   */
  getAreaBySE: async (envAuthorityId) => {
    let totalArea = await eaPersistence.getTotalAreaByEA(envAuthorityId);
    totalArea = totalArea[0].area;
    const areas = await seService.getAreasByEA(envAuthorityId);
    areas.unshift({
      area: totalArea,
      percentage: 1,
      type: 'Total',
    });
    return areas.map(se => ({
      ...se,
      percentage: se.area / totalArea,
    }));
  },

  /**
   * Get EA total area divided by protected area type
   */
  getAreaByPA: async envAuthorityId => ([
    { percentage: 0.4437728527, type: 'Santuario de Fauna y Flora' },
    { percentage: 0.5562271473, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get EA total area divided by protected area type
   */
  getAreaByCoverage: async envAuthorityId => ([
    { percentage: 0.4437728527, type: 'Natural' },
    { percentage: 0.5562271473, type: 'Transformado' },
  ]),
});
