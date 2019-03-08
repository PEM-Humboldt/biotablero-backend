module.exports = paPersistence => ({
  /**
   * Get the protected areas categories
   */
  getCategories: async () => paPersistence.findCategories(),

  /**
   * Get the protected areas in a given category
   */
  getByCategory: async categoryName => paPersistence.findByCategory(categoryName),

  /**
   * Get protected area divided by strategic ecosystem type
   */
  getAreaBySE: async categoryName => ([
    { area: 284538.960066167, percentage: 0.4318134185, type: 'Humedal' },
    { area: 166148.838843223, percentage: 0.2521457802, type: 'Páramo' },
    { area: 208251.798376851, percentage: 0.3160408014, type: 'Bosque Seco Tropical' },
  ]),

  /**
   * Get protected area divided by protected area type
   */
  getAreaByPA: async categoryName => ([
    { percentage: 0, type: 'Santuario de Fauna y Flora' },
    { percentage: 1, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get protected area divided by protected area type
   */
  getAreaByCoverage: async categoryName => ([
    { percentage: 0.4437728527, type: 'Natural' },
    { percentage: 0.5562271473, type: 'Transformado' },
  ]),
});
