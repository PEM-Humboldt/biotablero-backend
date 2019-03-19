module.exports = (paPersistence, seService) => ({
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
   *
   * @param {String} categoryName category to filter by
   */
  getAreaBySE: async (categoryName) => {
    let totalArea = await paPersistence.getTotalAreaByCategory(categoryName);
    totalArea = totalArea[0].area;
    const areas = await seService.getAreasByPACategory(categoryName);
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
