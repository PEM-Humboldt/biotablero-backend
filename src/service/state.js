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
    let totalArea = await statePersistence.getTotalAreaByState(stateId);
    if (totalArea.length === 0) {
      throw new Error('state doesn\'t exists');
    }
    totalArea = totalArea[0].area;
    const areas = await seService.getAreasByState(stateId);
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
   * Get state total area divided by protected area type
   */
  getAreaByPA: async stateId => ([
    { area: 100, percentage: 0.4437728527, type: 'Santuario de Fauna y Flora' },
    { area: 110, percentage: 0.5562271473, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get state total area divided by protected area type
   */
  getAreaByCoverage: async stateId => ([
    { area: 100, percentage: 0.4437728527, type: 'Natural' },
    { area: 110, percentage: 0.5562271473, type: 'Transformado' },
  ]),

  /**
   * Get the national layer divided by states
   */
  getNationalLayer: async () => statePersistence.findNationalLayer(),
});
