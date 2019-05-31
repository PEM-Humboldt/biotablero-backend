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
    if (totalArea.length === 0) {
      throw new Error('environmental authority doesn\'t exists');
    }
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
   * Get information about an strategic ecosystem in an environmental authority. Includes:
   * - percentage of the given strategic ecosystem respect the national area
   *
   * @param {String} envAuthorityId environmental authority id
   * @param {String} seType strategic ecosystem type
   */
  getSEDetails: async (envAuthorityId, seType) => {
    // create another function if this one gets too much unnecessary information
    const seNationalArea = await seService.getEcosystemNatInfo(seType);
    const seArea = await seService.getSEAreaInEA(envAuthorityId, seType);
    return {
      national_percentage: seArea.area / seNationalArea.area,
    };
  },

  /**
   * Get coverage areas in an strategic ecosystem in an environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   * @param {String} seType strategic ecosystem type
   */
  getCoverageInSE: async (envAuthorityId, seType) => {
    const seArea = await seService.getSEAreaInEA(envAuthorityId, seType);
    const coverAreas = await seService.getSECoverageInEA(envAuthorityId, seType);
    return coverAreas.map(area => ({
      ...area,
      percentage: area.area / seArea.area,
    }));
  },

  /**
   * Get protected area distribution in an strategic ecosystem in an environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   * @param {String} seType strategic ecosystem type
   */
  getPAInSE: async (envAuthorityId, seType) => {
    const seArea = await seService.getSEAreaInEA(envAuthorityId, seType);
    const paAreas = await seService.getSEPAInEA(envAuthorityId, seType);
    let nonProtected = seArea.area;
    const result = paAreas.map((area) => {
      nonProtected -= parseFloat(area.area);
      return {
        ...area,
        percentage: area.area / seArea.area,
      };
    });
    if (result.length !== 0) {
      result.push({
        area: nonProtected,
        percentage: nonProtected / seArea.area,
        type: 'No Protegida',
      });
    }
    return result;
  },

  /**
   * Get EA total area divided by protected area type
   *
   * @param {String} enAuthorityId environmental authority id
   */
  getAreaByPA: async (envAuthorityId) => {
    let totalArea = await eaPersistence.getTotalAreaByEA(envAuthorityId);
    if (totalArea[0].area === null) {
      throw new Error('environmental authority doesn\'t exists');
    }
    totalArea = totalArea[0].area;
    const areas = await eaPersistence.findAreaByPA(envAuthorityId);
    let nonProtected = totalArea;
    const result = areas.map((se) => {
      nonProtected -= parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / totalArea,
      };
    });
    result.unshift({
      area: totalArea,
      percentage: 1,
      type: 'Total',
    });
    result.push({
      area: nonProtected,
      percentage: nonProtected / totalArea,
      type: 'No Protegida',
    });
    return result;
  },

  /**
   * Get EA total area divided by coverage type
   */
  getAreaByCoverage: async envAuthorityId => ([
    { area: 100, percentage: 0.4437728527, type: 'Natural' },
    { area: 110, percentage: 0.5562271473, type: 'Transformado' },
  ]),

  /**
   * Get the national layer divided by environmental authority
   */
  getNationalLayer: async () => eaPersistence.findNationalLayer(),
});
