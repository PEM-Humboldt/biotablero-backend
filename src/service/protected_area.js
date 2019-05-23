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
    if (totalArea.length === 0) {
      throw new Error('protected area category doesn\'t exists');
    }
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
   * Get information about an strategic ecosystem in a protected area. Includes:
   * - percentage of the given strategic ecosystem respect the national area
   *
   * @param {String} categoryName protected area category
   * @param {String} seType strategic ecosystem type
   */
  getSEDetails: async (categoryName, seType) => {
    // create another function if this one gets too much unnecessary information
    const seNationalArea = await seService.getEcosystemNatInfo(seType);
    const seArea = await seService.getSEAreaInPACategory(categoryName, seType);
    return {
      national_percentage: seArea.area / seNationalArea.area,
    };
  },

  /**
   * Get coverage areas in an strategic ecosystem in a protected area
   *
   * @param {String} categoryName protected area category
   * @param {String} seType strategic ecosystem type
   */
  getCoverageInSE: async (categoryName, seType) => {
    const seArea = await seService.getSEAreaInPACategory(categoryName, seType);
    const coverAreas = await seService.getSECoverageInPACategory(categoryName, seType);
    return coverAreas.map(area => ({
      ...area,
      percentage: area.area / seArea.area,
    }));
  },

  /**
   * Get protected area divided by protected area type
   */
  getAreaByPA: async categoryName => ([
    { area: 0, percentage: 0, type: 'Santuario de Fauna y Flora' },
    { area: 210, percentage: 1, type: 'Parques Naturales Regionales' },
  ]),

  /**
   * Get protected area divided by protected area type
   */
  getAreaByCoverage: async categoryName => ([
    { area: 100, percentage: 0.4437728527, type: 'Natural' },
    { area: 110, percentage: 0.5562271473, type: 'Transformado' },
  ]),

  /**
   * Get the national layer divided by protected area
   */
  getNationalLayer: async () => ({
    type: 'FeatureCollection',
    totalFeatures: 1,
    features: [
      {
        type: 'Feature',
        id: 'jurisdicciones_low.1',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-79.2778, 16.1152],
                [-79.2778, 16.0708],
                [-79.1453, 16.0708],
                [-78.7959, 16.0708],
                [-78.4306, 16.0708],
                [-78.4306, 15.8955],
                [-78.4306, 15.8004],
                [-78.4306, 15.6],
                [-78.6333, 15.6],
                [-78.6333, 15.157],
                [-78.6333, 15.0745],
                [-78.6333, 14.4936],
                [-78.5079, 14.3945],
                [-78.3917, 14.3027],
                [-78.325, 14.25],
                [-78.1835, 14.2142],
                [-78.0993, 14.1929],
                [-78.0029, 14.1766],
                [-77.9995, 13.3204],
                [-77.9995, 12.505],
                [-78.4612, 12.5],
                [-78.5845, 12.5],
                [-78.7648, 12.5],
                [-79, 12.5],
                [-79, 11.8333],
                [-79.147, 11.8333],
                [-80, 11.8333],
                [-80, 11.6654],
                [-80, 11],
                [-81.25, 11],
                [-81.495, 10.8127],
                [-82.2333, 10.8167],
                [-82.2282, 10.9958],
                [-82, 11],
                [-82, 11.7839],
                [-82, 11.8623],
                [-82, 12.0079],
                [-82, 12.0848],
                [-82, 12.2916],
                [-82, 13.0684],
                [-82, 13.3869],
                [-82, 13.7062],
                [-82, 14.0296],
                [-82, 14.7551],
                [-82, 14.9856],
                [-81.5817, 14.9856],
                [-81.5424, 14.9856],
                [-81.2188, 14.9856],
                [-80.985, 14.9856],
                [-80.4713, 14.9856],
                [-79.9471, 14.9856],
                [-79.9333, 14.9856],
                [-79.9333, 15.1837],
                [-79.9333, 15.5028],
                [-79.9615, 15.5591],
                [-80.0336, 15.7034],
                [-80.0653, 15.7667],
                [-80.0674, 15.7877],
                [-80.0668, 15.8094],
                [-80.0654, 15.8219],
                [-80.061, 15.8436],
                [-80.0507, 15.8733],
                [-80.0419, 15.891],
                [-80.026, 15.9151],
                [-80.0089, 15.9346],
                [-79.9906, 15.9508],
                [-79.9637, 15.9685],
                [-79.9444, 15.9778],
                [-79.8422, 16.0708],
                [-79.596, 16.0708],
                [-79.4889, 16.0708],
                [-79.4889, 16.1694],
                [-79.2778, 16.1694],
                [-79.2778, 16.1152],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: {
          AREA: 180336000000,
          IDCAR: 'CORALINA',
          NOMCAR: 'Corporacion para el Desarrollo Sostenible del Archipielago de San Andres, Providencia y Santa Catalina'
        },
      },
    ],
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::4326',
      },
    },
  }),
});
