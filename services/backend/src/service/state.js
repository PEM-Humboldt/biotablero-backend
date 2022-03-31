const {
  persistenceKeysOrder,
  HFCategoriesKeysOrder,
  SEKeys,
  HFCategoriesRangeKeys,
} = require('../util/appropriate_keys');
const forestLP = require('../tmp/forestLP.json');
const forestLPLayer20162019 = require('../tmp/forestLPLayer20162019.json');
const forestLPLayer20112015 = require('../tmp/forestLPLayer20112015.json');
const forestLPLayer20062010 = require('../tmp/forestLPLayer20062010.json');
const forestLPLayer20002005 = require('../tmp/forestLPLayer20002005.json');
const forestPersistenceArea = require('../tmp/forestPersistenceArea.json');

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
    getMunicipalities: async (stateId) => municipalityService.getByState(stateId),

    /**
     * Get state total area divided by strategic ecosystem type
     */
    getAreaBySE: async (stateId) => {
      let stateArea = await statePersistence.getTotalAreaByState(stateId);
      if (stateArea.length === 0) {
        throw new Error("state doesn't exists");
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
      return coverAreas.map((area) => ({
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
      const result = paAreas.map((area) => ({
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
        throw new Error("state doesn't exists");
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
     * Get the total area for the state
     *
     * @param {Number} stateId state id
     *
     * @returns {Object} One attribute object with the total area for the given state
     */
    getTotalArea: async (stateId) => {
      const stateArea = await statePersistence.getTotalAreaByState(stateId);
      if (stateArea[0].area === null) {
        throw new Error("state doesn't exists");
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
        .sort((a, b) => HFCategoriesKeysOrder(a.key) - HFCategoriesKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
          percentage: value.area / stateArea,
        }));
    },

    /**
     * Get the current value and category of human footprint for the given state
     * @param {Number} stateId state id
     *
     * @returns {Object} Object with the current human footprint value.
     */
    getCurrentHFValue: async (stateId) => {
      const value = await statePersistence.findCurrentHFValue(stateId);
      if (value[0].CurrentHFValue === null) {
        throw new Error("state doesn't exists");
      }
      return {
        value: value[0].CurrentHFValue,
        category: HFCategoriesRangeKeys(value[0].CurrentHFValue),
      };
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
        .sort((a, b) => persistenceKeysOrder(a.key) - persistenceKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
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
        data: values.map((value) => ({
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
        data: values.map((value) => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Get the forest loss and persistence data inside an state
     * @param {Number} stateId state id
     *
     * @return {Object[]} Object of forest loss and persistence values
     */
    getEcoChangeLP: async () => forestLP,

    /**
     * Get the forest loss and persistence layer divided by categories in a given period and
     * an state
     * @param {Number} stateId state id
     * @param {String} period period
     *
     * @return {Object} Geojson object with the geometry
     */
    getEcoChangeLPLayer: async (stateId, period) => {
      switch (period) {
        case '2016-2019':
          return forestLPLayer20162019;
        case '2011-2015':
          return forestLPLayer20112015;
        case '2006-2010':
          return forestLPLayer20062010;
        case '2000-2005':
          return forestLPLayer20002005;
        default:
          return {};
      }
    },

    /**
     * Get the forest persistence area inside an state
     * @param {Number} stateId state id
     *
     * @return {Object} Object of forest persistence value
     */
    getEcoChangePersistenceValue: async () => forestPersistenceArea,

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
    getSELayer: async (stateId, seType) =>
      seService.getSELayerInGeofence('states', stateId, seType),

    /**
     * Get the current human footprint layer divided by categories in a given state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFCategoriesLayerById: async (stateId) => {
      const geom = await statePersistence.findHFCategoriesLayerById(stateId);
      if (geom && geom.features) {
        geom.features = geom.features.map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: feature.properties.key,
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
        geom.features = geom.features.map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: feature.properties.key,
          },
        }));
        return geom;
      }
      return {};
    },
  };

  return state;
};
