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
    let categoryArea = await paPersistence.getTotalAreaByCategory(categoryName);
    if (categoryArea.length === 0) {
      throw new Error('protected area category doesn\'t exists');
    }
    categoryArea = categoryArea[0].area;
    const areas = await seService.getAreasByPACategory(categoryName);
    let totalSE = 0;
    const result = areas.map((se) => {
      totalSE += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / categoryArea,
      };
    });
    result.unshift({
      area: totalSE,
      percentage: totalSE / categoryArea,
      type: 'Total',
    });
    return result;
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
   * Get coverage areas in an strategic ecosystem in a protected area category
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
   * Get protected area distribution in an strategic ecosystem in a protected area category
   *
   * @param {String} categoryName protected area category
   * @param {String} seType strategic ecosystem type
   */
  getPAInSE: async (categoryName, seType) => {
    const seArea = await seService.getSEAreaInPACategory(categoryName, seType);
    const paAreas = await seService.getSEPAInPACategory(categoryName, seType);
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
   * Get protected area divided by protected area type
   *
   * @param {String} categoryName protected area category
   *
   * @returns {Object[]} list of protected areas + 2 elements: total protected area (and percentage)
   * and non protected area (and percentage)
   */
  getAreaByPA: async (categoryName) => {
    let categoryArea = await paPersistence.getTotalAreaByCategory(categoryName);
    if (categoryArea[0].area === null) {
      throw new Error('protected area category doesn\'t exists');
    }
    categoryArea = categoryArea[0].area;
    const areas = [{
      area: parseFloat(categoryArea),
      type: categoryName,
    }];
    let nonProtected = categoryArea;
    let totalProtected = 0;
    const result = areas.map((se) => {
      nonProtected -= parseFloat(se.area);
      totalProtected += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / categoryArea,
      };
    });
    result.unshift({
      area: totalProtected,
      percentage: totalProtected / categoryArea,
      type: 'Total',
    });
    result.push({
      area: nonProtected,
      percentage: nonProtected / categoryArea,
      type: 'No Protegida',
    });
    return result;
  },

  /**
   * Get protected area divided by protected area type
   *
   * @param {String} categoryName protected area category
   *
   * @returns {Object[]} list of protected areas + 1 element: total area in the category
   */
  getAreaByCoverage: async (categoryName) => {
    let categoryArea = await paPersistence.getTotalAreaByCategory(categoryName);
    if (categoryArea[0].area === null) {
      throw new Error('state doesn\'t exists');
    }
    categoryArea = categoryArea[0].area;
    const areas = await paPersistence.findAreaByCoverage(categoryName);
    const result = areas.map(cover => ({
      ...cover,
      percentage: cover.area / categoryArea,
    }));
    result.unshift({
      area: categoryArea,
      percentage: 1,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get the national layer divided by protected area
   */
  getNationalLayer: async () => null,
});
