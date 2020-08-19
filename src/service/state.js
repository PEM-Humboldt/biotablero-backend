const { persistenceKeys, HFCategoriesKeys, SEKeys } = require('../util/appropriate_keys');

module.exports = (statePersistence, municipalityService, seService) => {
  const state = {
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
    getAreaBySE: async (stateId) => {
      let stateArea = await statePersistence.getTotalAreaByState(stateId);
      if (stateArea.length === 0) {
        throw new Error('state doesn\'t exists');
      }
      stateArea = stateArea[0].area;
      const areas = await seService.getAreasByState(stateId);
      let totalSE = 0;
      const result = areas.map((se) => {
        totalSE += parseFloat(se.area);
        return {
          ...se,
          percentage: se.area / stateArea,
        };
      });
      result.unshift({
        area: totalSE,
        percentage: totalSE / stateArea,
        type: 'Total',
      });
      return result;
    },

    /**
     * Get information about an strategic ecosystem in an state. Includes:
     * - percentage of the given strategic ecosystem respect the national area
     *
     * @param {Number} stateId state id
     * @param {String} seType strategic ecosystem type
     */
    getSEDetails: async (stateId, seType) => {
      // create another function if this one gets too much unnecessary information
      const seNationalArea = await seService.getEcosystemNatInfo(seType);
      const seArea = await seService.getSEAreaInState(stateId, seType);
      return {
        national_percentage: seArea.area / seNationalArea.area,
        total_area: seArea.area,
      };
    },

    /**
     * Get coverage areas in an strategic ecosystem in a state
     *
     * @param {String} stateId state id
     * @param {String} seType strategic ecosystem type
     */
    getCoverageInSE: async (stateId, seType) => {
      const seArea = await seService.getSEAreaInState(stateId, seType);
      const coverAreas = await seService.getSECoverageInState(stateId, seType);
      return coverAreas.map(area => ({
        ...area,
        percentage: area.area / seArea.area,
      }));
    },

    /**
     * Get protected area distribution in an strategic ecosystem in a state
     *
     * @param {String} stateId state id
     * @param {String} seType strategic ecosystem type
     */
    getPAInSE: async (stateId, seType) => {
      const seArea = await seService.getSEAreaInState(stateId, seType);
      const paAreas = await seService.getSEPAInState(stateId, seType);
      const result = paAreas.map(area => ({
        ...area,
        percentage: area.area / seArea.area,
      }));
      return result;
    },

    /**
     * Get state total area divided by protected area type
     *
     * @param {Number} stateId state id
     *
     * @returns {Object[]} list of protected areas + 2 elements: total protected area (and
     * percentage) and non protected area (and percentage)
     */
    getAreaByPA: async (stateId) => {
      let stateArea = await statePersistence.getTotalAreaByState(stateId);
      if (stateArea[0].area === null) {
        throw new Error('state doesn\'t exists');
      }
      stateArea = stateArea[0].area;
      const areas = await statePersistence.findAreaByPA(stateId);
      let totalProtected = 0;
      const result = areas.map((pa) => {
        if (pa.bp !== '000000000000000') {
          totalProtected += parseFloat(pa.area);
        }
        return {
          area: pa.area,
          type: pa.type,
          percentage: pa.area / stateArea,
        };
      });
      result.unshift({
        area: totalProtected,
        percentage: totalProtected / stateArea,
        type: 'Total',
      });
      return result;
    },

    /**
     * Get state total area divided by protected area type
     *
     * @param {String} stateId state id
     *
     * @returns {Object[]} list of protected areas + 1 element: total area in the state
     */
    getAreaByCoverage: async (stateId) => {
      let stateArea = await state.getTotalArea(stateId);
      stateArea = stateArea.total_area;
      const areas = await statePersistence.findAreaByCoverage(stateId);
      const result = areas.map(cover => ({
        ...cover,
        percentage: cover.area / stateArea,
      }));
      return result;
    },

    /**
     * Get the total area for the state
     *
     * @param {Number} stateId state id
     *
     * @returns {Object} One attribute object with the total area for the given state
     */
    getTotalArea: async (stateId) => {
      const stateArea = await statePersistence.getTotalAreaByState(stateId);
      if (stateArea[0].area === null) {
        throw new Error('state doesn\'t exists');
      }
      return { total_area: stateArea[0].area };
    },

    /**
     * Get the information the current area distribution for each human footprint category in the
     * given state
     * @param {Number} stateId state id
     *
     * @returns {Object[]} Array of areas by human footprint category with their respective
     * percentage
     */
    getAreaByHFCategory: async (stateId) => {
      let stateArea = await state.getTotalArea(stateId);
      stateArea = stateArea.total_area;
      const values = await statePersistence.findAreaByHFCategory(stateId);
      return values
        .sort((a, b) => HFCategoriesKeys(a.key).order - HFCategoriesKeys(b.key).order)
        .map(value => ({
          area: Number(value.area),
          key: HFCategoriesKeys(value.key).key,
          percentage: value.area / stateArea,
        }));
    },

    /**
     * Get the current value of human footprint for the given state
     * @param {Number} stateId state id
     *
     * @returns {Object} One attribute object with the current human footprint value.
     */
    getCurrentHFValue: async (stateId) => {
      const value = await statePersistence.findCurrentHFValue(stateId);
      if (value[0].CurrentHFValue === null) {
        throw new Error('state doesn\'t exists');
      }
      return { value: value[0].CurrentHFValue };
    },

    /**
     * Get the information about the persistence of human footprint in the given state
     * @param {Number} stateId state id
     *
     * @returns {Object[]} Array of persistence values with their respective percentage.
     */
    getAreaByHFPersistence: async (stateId) => {
      let stateArea = await state.getTotalArea(stateId);
      stateArea = stateArea.total_area;
      const values = await statePersistence.findHFPersistenceAreas(stateId);
      return values
        .sort((a, b) => persistenceKeys(a.key).order - persistenceKeys(b.key).order)
        .map(value => ({
          area: Number(value.area),
          key: persistenceKeys(value.key).key,
          percentage: value.area / stateArea,
        }));
    },

    /**
     * Get the human footprint value through time in the given state
     * @param {Number} stateId state id
     *
     * @returns {Object} Object of HF values through time
     */
    getTotalHFTimeLine: async (stateId) => {
      const values = await statePersistence.findTotalHFTimeLine(stateId);
      return {
        key: 'aTotal',
        data: values.map(value => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Request a given strategic ecosystem HF timeline data inside a state
     * @param {Number} stateId state id
     * @param {String} seType strategic ecosystem type
     *
     * @return {Object} Object of HF values through time
     */

    getSEHFTimeline: async (stateId, seType) => {
      const values = await seService.getSEHFTimelineInGeofence('states', stateId, seType);
      return {
        key: SEKeys(seType),
        data: values.map(value => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Get the national layer divided by states
     */
    getNationalLayer: async () => statePersistence.findNationalLayer(),

    /**
     * Get the geometry for a given state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    getLayer: async (stateId) => {
      const geom = await statePersistence.findLayerById(stateId);
      if (geom && geom.features) return geom;
      return {};
    },

    /**
     * Request a given strategic ecosystem layer inside an state.
     * @param {Number} stateId state id
     * @param {String} seType strategic ecosystem type.
     *
     * @return {Object} Geojson object with the geometry
     */
    getSELayer: async (stateId, seType) => seService.getSELayerInGeofence(
      'states', stateId, seType,
    ),

    /**
     * Get the current human footprint layer divided by categories in a given state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFCategoriesLayerById: async (stateId) => {
      const geom = await statePersistence.findHFCategoriesLayerById(stateId);
      if (geom && geom.features) {
        geom.features = geom.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: HFCategoriesKeys(feature.properties.key).key,
          },
        }));
        return geom;
      }
      return {};
    },

    /**
     * Get the persistence human footprint layer divided by categories in a given
     * state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFPersistenceLayerById: async (stateId) => {
      const geom = await statePersistence.findHFPersistenceLayerById(stateId);
      if (geom && geom.features) {
        geom.features = geom.features.map(feature => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: persistenceKeys(feature.properties.key).key,
          },
        }));
        return geom;
      }
      return {};
    },
  };

  return state;
};
