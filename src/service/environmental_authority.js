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
    let eaArea = await eaPersistence.getTotalAreaByEA(envAuthorityId);
    if (eaArea.length === 0) {
      throw new Error('environmental authority doesn\'t exists');
    }
    eaArea = eaArea[0].area;
    const areas = await seService.getAreasByEA(envAuthorityId);
    let totalSE = 0;
    const result = areas.map((se) => {
      totalSE += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / eaArea,
      };
    });
    result.unshift({
      area: totalSE,
      percentage: totalSE / eaArea,
      type: 'Total',
    });
    return result;
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
    const result = paAreas.map(area => ({
      ...area,
      percentage: area.area / seArea.area,
    }));
    return result;
  },

  /**
   * Get EA total area divided by protected area type
   *
   * @param {String} enAuthorityId environmental authority id
   *
   * @returns {Object[]} list of protected areas + 2 elements: total protected area (and percentage)
   * and non protected area (and percentage)
   */
  getAreaByPA: async (envAuthorityId) => {
    let eaArea = await eaPersistence.getTotalAreaByEA(envAuthorityId);
    if (eaArea[0].area === null) {
      throw new Error('environmental authority doesn\'t exists');
    }
    eaArea = eaArea[0].area;
    const areas = await eaPersistence.findAreaByPA(envAuthorityId);
    let totalProtected = 0;
    const result = areas.map((pa) => {
      if (pa.type !== 'No protegido') {
        totalProtected += parseFloat(pa.area);
      }
      return {
        ...pa,
        percentage: pa.area / eaArea,
      };
    });
    result.unshift({
      area: totalProtected,
      percentage: totalProtected / eaArea,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get EA total area divided by coverage type
   *
   * @param {String} enAuthorityId environmental authority id
   *
   * @returns {Object[]} list of protected areas + 1 element: total area in the environmental
   * authority
   */
  getAreaByCoverage: async (envAuthorityId) => {
    let eaArea = await eaPersistence.getTotalAreaByEA(envAuthorityId);
    if (eaArea[0].area === null) {
      throw new Error('environmental authority doesn\'t exists');
    }
    eaArea = eaArea[0].area;
    const areas = await eaPersistence.findAreaByCoverage(envAuthorityId);
    const result = areas.map(cover => ({
      ...cover,
      percentage: cover.area / eaArea,
    }));
    result.unshift({
      area: eaArea,
      percentage: 1,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get the national layer divided by environmental authority
   */
  getNationalLayer: async () => eaPersistence.findNationalLayer(),
});
