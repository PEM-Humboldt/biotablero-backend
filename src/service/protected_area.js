const { persistenceKeys } = require('../util/appropriate_keys');

module.exports = (paPersistence, seService) => {
  const protectedArea = {
    /**
     * Get the protected areas categories
     */
    getCategories: async () => paPersistence.findCategories(),

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
        total_area: seArea.area,
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
      const result = paAreas.map(area => ({
        ...area,
        percentage: area.area / seArea.area,
      }));
      return result;
    },

    /**
     * Get protected area divided by protected area type
     *
     * @param {String} categoryName protected area category
     *
     * @returns {Object[]} list of protected areas + 2 elements: total protected area (and
     * percentage) and non protected area (and percentage)
     */
    getAreaByPA: async (categoryName) => {
      let categoryArea = await paPersistence.getTotalAreaByCategory(categoryName);
      if (!categoryArea || categoryArea[0].area === null) {
        throw new Error('protected area category doesn\'t exists');
      }
      categoryArea = categoryArea[0].area;
      const areas = await paPersistence.findAreaByPA(categoryName);
      let totalProtected = 0;
      const result = areas.map((pa) => {
        totalProtected += parseFloat(pa.area);
        return {
          ...pa,
          percentage: pa.area / categoryArea,
        };
      });
      result.unshift({
        area: totalProtected,
        percentage: totalProtected / categoryArea,
        type: 'Total',
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
      let categoryArea = await protectedArea.getTotalArea(categoryName);
      categoryArea = categoryArea.total_area;
      const areas = await paPersistence.findAreaByCoverage(categoryName);
      const result = areas.map(cover => ({
        ...cover,
        percentage: cover.area / categoryArea,
      }));
      return result;
    },

    /**
     * Get the total area for the protected area category
     *
     * @param {String} categoryName protected area category
     *
     * @returns {Object} One attribute object with the total area for the protected area category
     */
    getTotalArea: async (categoryName) => {
      const categoryArea = await paPersistence.getTotalAreaByCategory(categoryName);
      if (categoryArea[0].area === null) {
        throw new Error('protected area category doesn\'t exists');
      }
      return { total_area: categoryArea[0].area };
    },

    /**
     * Get the current value of human footprint for the given protected area
     * @param {String} categoryName protected area category
     *
     * @returns {Object} One attribute object with the current human footprint value.
     */
    getHFCurrentValue: async (categoryName) => {
      const value = await paPersistence.findHFCurrentValue(categoryName);
      if (value[0].HFCurrent === null) {
        throw new Error('protected area category doesn\'t exists');
      }
      return { value: value[0].HFCurrent };
    },

    /**
      * Get the information about the persistence of human footprint in the given protected area
      * category
      * @param {String} categoryName protected area category
      *
      * @returns {Object[]} Array of persistence values with their respective percentage.
      */
    getAreaByHFPersistence: async (categoryName) => {
      let paArea = await protectedArea.getTotalArea(categoryName);
      paArea = paArea.total_area;
      const values = await paPersistence.findHFPersistenceAreas(categoryName);
      return values.map(value => ({
        ...value,
        key: persistenceKeys(value.key),
        percentage: value.area / paArea,
      }));
    },

    /**
     * Get the national layer divided by protected area
     */
    getNationalLayer: async () => null,

    /**
     * Get the geometry for a given protected area category
     * @param {String} categoryName protected area category
     *
     * @return {Object} Geojson object with the geometry
     */
    getLayer: async (categoryName) => {
      const geom = await paPersistence.findLayerByCategory(categoryName);
      if (geom && geom.features) return geom;
      return {};
    },
  };

  return protectedArea;
};
