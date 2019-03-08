module.exports = (statePersistence, municipalityService) => ({
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
  getAreaBySE: async stateId => ([
    { area: 284538.960066167, percentage: 0.4318134185, type: 'Humedal' },
    { area: 166148.838843223, percentage: 0.2521457802, type: 'Páramo' },
    { area: 208251.798376851, percentage: 0.3160408014, type: 'Bosque Seco Tropical' },
  ]),

  /**
   * Get state total area divided by protected area type
   */
  getAreaByPA: async stateId => ([
    { percentage: 0.4437728527, type: 'Santuario de Fauna y Flora' },
    { percentage: 0.5562271473, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get state total area divided by protected area type
   */
  getAreaByCoverage: async stateId => ([
    { percentage: 0.4437728527, type: 'Natural' },
    { percentage: 0.5562271473, type: 'Transformado' },
  ]),
});
