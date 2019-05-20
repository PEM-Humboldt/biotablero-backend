module.exports = (basinSubzonePersistence, seService) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinSubzonePersistence.findAll(),

  /**
   * Get subzone total area divided by strategic ecosystem type
   */
  getAreaBySE: async (subzoneId) => {
    let totalArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
    totalArea = totalArea[0].area;
    const areas = await seService.getAreasBySubzone(subzoneId);
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
   * Get information about an strategic ecosystem in a basin subzone. Includes:
   * - percentage of the given strategic ecosystem respect the national area
   *
   * @param {String} subzoneId basin subzone id
   * @param {String} seType strategic ecosystem type
   */
  getSEDetails: async (subzoneId, seType) => {
    // create another function if this one gets too much unnecessary information
    const seNationalArea = await seService.getEcosystemNatInfo(seType);
    const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
    return {
      national_percentage: seArea.area / seNationalArea.area,
    };
  },

  /**
   * Get subzone total area divided by protected area type
   */
  getAreaByPA: async subzoneId => ([
    { area: 100, percentage: 0.4437728527, type: 'Santuario de Fauna y Flora' },
    { area: 110, percentage: 0.5562271473, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get subzone total area divided by protected area type
   */
  getAreaByCoverage: async subzoneId => ([
    { area: 100, percentage: 0.4437728527, type: 'Natural' },
    { area: 110, percentage: 0.5562271473, type: 'Transformado' },
  ]),

  /**
   * Get the national layer divided by basin subzones
   */
  getNationalLayer: async () => basinSubzonePersistence.findNationalLayer(),
});
