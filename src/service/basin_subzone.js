const { persistenceKeys, HFCategoriesKeys } = require('../util/appropriate_keys');

module.exports = (basinSubzonePersistence, seService) => {
  const basinSubzone = {
    /**
     * Get a list with states information
     */
    getAll: async () => basinSubzonePersistence.findAll(),

    /**
     * Get subzone total area divided by strategic ecosystem type
     */
    getAreaBySE: async (subzoneId) => {
      let subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
      if (subzoneArea.length === 0) {
        throw new Error('basin subzone doesn\'t exists');
      }
      subzoneArea = subzoneArea[0].area;
      const areas = await seService.getAreasBySubzone(subzoneId);
      let totalSE = 0;
      const result = areas.map((se) => {
        totalSE += parseFloat(se.area);
        return {
          ...se,
          percentage: se.area / subzoneArea,
        };
      });
      result.unshift({
        area: totalSE,
        percentage: totalSE / subzoneArea,
        type: 'Total',
      });
      return result;
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
        total_area: seArea.area,
      };
    },

    /**
     * Get coverage areas in an strategic ecosystem in a basin subzone
     *
     * @param {String} subzoneId subzone id
     * @param {String} seType strategic ecosystem type
     */
    getCoverageInSE: async (subzoneId, seType) => {
      const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
      const coverAreas = await seService.getSECoverageInSubzone(subzoneId, seType);
      return coverAreas.map(area => ({
        ...area,
        percentage: area.area / seArea.area,
      }));
    },

    /**
     * Get protected area distribution in an strategic ecosystem in a basin subzone
     *
     * @param {String} subzoneId basin subzone id
     * @param {String} seType strategic ecosystem type
     */
    getPAInSE: async (subzoneId, seType) => {
      const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
      const paAreas = await seService.getSEPAInSubzone(subzoneId, seType);

      const result = paAreas.map(area => ({
        ...area,
        percentage: parseFloat(area.area) / parseFloat(seArea.area),
      }));
      return result;
    },

    /**
     * Get subzone total area divided by protected area type
     *
     * @param {String} subzoneId basin subzone id
     *
     * @returns {Object[]} list of protected areas + 2 elements: total protected area (and
     * percentage) and non protected area (and percentage)
     */
    getAreaByPA: async (subzoneId) => {
      let subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
      if (subzoneArea[0].area === null) {
        throw new Error('basin subzone doesn\'t exists');
      }
      subzoneArea = subzoneArea[0].area;
      const areas = await basinSubzonePersistence.findAreaByPA(subzoneId);
      let totalProtected = 0;
      const result = areas.map((pa) => {
        if (pa.bp !== '000000000000000') {
          totalProtected += parseFloat(pa.area);
        }
        return {
          area: pa.area,
          type: pa.type,
          percentage: pa.area / subzoneArea,
        };
      });
      result.unshift({
        area: totalProtected,
        percentage: totalProtected / subzoneArea,
        type: 'Total',
      });
      return result;
    },

    /**
     * Get subzone total area divided by protected area type
     *
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object[]} list of protected areas + 1 element: total area in the basin subzone
     */
    getAreaByCoverage: async (subzoneId) => {
      let subzoneArea = await basinSubzone.getTotalArea(subzoneId);
      subzoneArea = subzoneArea.total_area;
      const areas = await basinSubzonePersistence.findAreaByCoverage(subzoneId);
      const result = areas.map(cover => ({
        ...cover,
        percentage: cover.area / subzoneArea,
      }));
      return result;
    },

    /**
     * Get the total area for the given subzone
     *
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} One attribute object with the total area for the subzone
     */
    getTotalArea: async (subzoneId) => {
      const subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
      if (subzoneArea[0].area === null) {
        throw new Error('basin subzone doesn\'t exists');
      }
      return { total_area: subzoneArea[0].area };
    },

    /**
     * Get the information the current area distribution for each human footprint category in the
     * given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object[]} Array of areas by human footprint category with their respective
     * percentage
     */
    getAreaByHFCategory: async (subzoneId) => {
      let subzoneArea = await basinSubzone.getTotalArea(subzoneId);
      subzoneArea = subzoneArea.total_area;
      const values = await basinSubzonePersistence.findAreaByHFCategory(subzoneId);
      return values.map(value => ({
        area: Number(value.area),
        key: HFCategoriesKeys(value.key),
        percentage: value.area / subzoneArea,
      }));
    },

    /**
     * Get the current value of human footprint for the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} One attribute object with the current human footprint value.
     */
    getCurrentHFValue: async (subzoneId) => {
      const value = await basinSubzonePersistence.findCurrentHFValue(subzoneId);
      if (value[0].CurrentHFValue === null) {
        throw new Error('basin subzone doesn\'t exists');
      }
      return { value: value[0].CurrentHFValue };
    },

    /**
     * Get the information about the persistence of human footprint in the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object[]} Array of persistence values with their respective percentage.
     */
    getAreaByHFPersistence: async (subzoneId) => {
      let subzoneArea = await basinSubzone.getTotalArea(subzoneId);
      subzoneArea = subzoneArea.total_area;
      const values = await basinSubzonePersistence.findHFPersistenceAreas(subzoneId);
      return values.map(value => ({
        area: Number(value.area),
        key: persistenceKeys(value.key),
        percentage: value.area / subzoneArea,
      }));
    },

    /**
     * Get the national layer divided by basin subzones
     */
    getNationalLayer: async () => basinSubzonePersistence.findNationalLayer(),

    /**
     * Get the geometry for a given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Geojson object with the geometry
     */
    getLayer: async (subzoneId) => {
      const geom = await basinSubzonePersistence.findLayerById(subzoneId);
      if (geom && geom.features) return geom;
      return {};
    },

    /**
     * Request a given strategic ecosystem layer inside a basin subzone.
     * @param {Number} subzoneId basin subzone id
     * @param {String} seType strategic ecosystem type.
     *
     * @return {Object} Geojson object with the geometry
     */
    getSELayer: async (subzoneId, seType) => seService.getSELayerInGeofence(
      'subzones', subzoneId, seType,
    ),
  };

  return basinSubzone;
};
