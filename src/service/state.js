module.exports = (statePersistence, municipalityService, seService) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => statePersistence.findAll(),

  /**
   * Get municipalities in the given state
   *
   * @param stateId state Id to filter by
   */
  getMunicipalities: async stateId => municipalityService.getByState(stateId),

  /**
   * Get state total area divided by strategic ecosystem type
   */
  getAreaBySE: async (stateId) => {
    let stateArea = await statePersistence.getTotalAreaByState(stateId);
    if (stateArea.length === 0) {
      throw new Error('state doesn\'t exists');
    }
    stateArea = stateArea[0].area;
    const areas = await seService.getAreasByState(stateId);
    let totalSE = 0;
    const result = areas.map((se) => {
      totalSE += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / stateArea,
      };
    });
    result.unshift({
      area: totalSE,
      percentage: totalSE / stateArea,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get information about an strategic ecosystem in an state. Includes:
   * - percentage of the given strategic ecosystem respect the national area
   *
   * @param {String} stateId environmental authority id
   * @param {String} seType strategic ecosystem type
   */
  getSEDetails: async (stateId, seType) => {
    // create another function if this one gets too much unnecessary information
    const seNationalArea = await seService.getEcosystemNatInfo(seType);
    const seArea = await seService.getSEAreaInState(stateId, seType);
    return {
      national_percentage: seArea.area / seNationalArea.area,
    };
  },

  /**
   * Get coverage areas in an strategic ecosystem in a state
   *
   * @param {String} stateId state id
   * @param {String} seType strategic ecosystem type
   */
  getCoverageInSE: async (stateId, seType) => {
    const seArea = await seService.getSEAreaInState(stateId, seType);
    const coverAreas = await seService.getSECoverageInState(stateId, seType);
    return coverAreas.map(area => ({
      ...area,
      percentage: area.area / seArea.area,
    }));
  },

  /**
   * Get protected area distribution in an strategic ecosystem in a state
   *
   * @param {String} stateId state id
   * @param {String} seType strategic ecosystem type
   */
  getPAInSE: async (stateId, seType) => {
    const seArea = await seService.getSEAreaInState(stateId, seType);
    const paAreas = await seService.getSEPAInState(stateId, seType);
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
   * Get state total area divided by protected area type
   *
   * @param {Number} stateId state id
   */
  getAreaByPA: async (stateId) => {
    let stateArea = await statePersistence.getTotalAreaByState(stateId);
    if (stateArea[0].area === null) {
      throw new Error('state doesn\'t exists');
    }
    stateArea = stateArea[0].area;
    const areas = await statePersistence.findAreaByPA(stateId);
    let nonProtected = stateArea;
    let totalProtected = 0;
    const result = areas.map((se) => {
      nonProtected -= parseFloat(se.area);
      totalProtected += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / stateArea,
      };
    });
    result.unshift({
      area: totalProtected,
      percentage: totalProtected / stateArea,
      type: 'Total',
    });
    result.push({
      area: nonProtected,
      percentage: nonProtected / stateArea,
      type: 'No Protegida',
    });
    return result;
  },

  /**
   * Get state total area divided by protected area type
   */
  getAreaByCoverage: async (stateId) => {
    const stateArea = await statePersistence.getTotalAreaByState(stateId);
    return [
      { area: stateArea[0].area, percentage: 1, type: 'Total' },
      { area: 100, percentage: 0.4437728527, type: 'Natural' },
      { area: 110, percentage: 0.5562271473, type: 'Transformado' },
    ];
  },

  /**
   * Get the national layer divided by states
   */
  getNationalLayer: async () => statePersistence.findNationalLayer(),
});
