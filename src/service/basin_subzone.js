module.exports = basinSubzonePersistence => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinSubzonePersistence.findAll(),

  /**
   * Get subzone total area divided by strategic ecosystem type
   */
  getAreaBySE: async subzoneId => ([
    { area: 284538.960066167, percentage: 0.4318134185, type: 'Humedal' },
    { area: 166148.838843223, percentage: 0.2521457802, type: 'Páramo' },
    { area: 208251.798376851, percentage: 0.3160408014, type: 'Bosque Seco Tropical' },
  ]),

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
});
