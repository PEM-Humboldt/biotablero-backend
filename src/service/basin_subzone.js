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
   * Get subzone total area divided by protected area type
   */
  getAreaByPA: async subzoneId => ([
    { percentage: 0.4437728527, type: 'Santuario de Fauna y Flora' },
    { percentage: 0.5562271473, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get subzone total area divided by protected area type
   */
  getAreaByCoverage: async subzoneId => ([
    { percentage: 0.4437728527, type: 'Natural' },
    { percentage: 0.5562271473, type: 'Transformado' },
  ]),

  /**
   * Get the national layer divided by basin subzones
   */
  getNationalLayer: async () => basinSubzonePersistence.findNationalLayer(),
});
