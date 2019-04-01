module.exports = (
  sePersistence, paramoPersistence, tropicalDryForestPersistence, wetlandPersistence,
) => ({
  /**
   * Get all strategic ecosystems
   */
  getAll: async () => sePersistence.findAll(),

  /**
   * Get all distinct primary ecosystems
   */
  getPrimary: async () => sePersistence.findAllPrimary(),

  /**
   * Get different strategic ecosystems areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  getAreasByEA: async (eaId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByEA(eaId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByEA(eaId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByEA(eaId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  },

  /**
   * Get different strategic ecosystems areas inside the given basin subzone
   *
   * @param {String} subzoneId subzone id
   */
  getAreasBySubzone: async (subzoneId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  },

  /**
   * Get different strategic ecosystems areas inside the given state
   *
   * @param {String} stateId state id
   */
  getAreasByState: async (stateId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByState(stateId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByState(stateId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByState(stateId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  },

  /**
   * Get different strategic ecosystems areas inside all the protected areas with the given category
   *
   * @param {String} categoryName category
   */
  getAreasByPACategory: async (categoryName) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByPACategory(categoryName);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByPACategory(categoryName);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByPACategory(categoryName);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  },

  /**
   * Get different type areas for the given ecosystem
   *
   * @param {String} ecosystem ecosystem type to get information
   */
  getAreasByEcosystem: async (ecosystem) => {
    const countryArea = await paramoPersistence.findCountryTotalArea();
    let national;
    let coverageAreas;
    let protectedAreas;
    switch (ecosystem) {
      case 'Páramo': {
        national = await paramoPersistence.findTotalArea();
        coverageAreas = await paramoPersistence.findCoverAreas();
        protectedAreas = await paramoPersistence.findProtectedAreas();
        break;
      }
      case 'Humedal': {
        national = await wetlandPersistence.findTotalArea();
        coverageAreas = await wetlandPersistence.findCoverAreas();
        protectedAreas = await wetlandPersistence.findProtectedAreas();
        break;
      }
      case 'Bosque Seco Tropical': {
        national = await tropicalDryForestPersistence.findTotalArea();
        coverageAreas = await tropicalDryForestPersistence.findCoverAreas();
        protectedAreas = await tropicalDryForestPersistence.findProtectedAreas();
        break;
      }
      default:
        return {};
    }
    return {
      national: {
        ...national[0],
        percentage: national[0].area / countryArea[0].area,
        type: ecosystem,
      },
      coverage: coverageAreas.map(area => ({
        ...area,
        percentage: area.area / national[0].area,
      })),
      pa: protectedAreas.map(area => ({
        ...area,
        percentage: area.area / national[0].area,
      })),
    };
  },
});
