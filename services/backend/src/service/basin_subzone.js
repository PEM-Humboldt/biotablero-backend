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

module.exports = (basinSubzonePersistence, seService) => {
  const basinSubzone = {
    /**
     * Get a list with states information
     */
    getAll: async () => basinSubzonePersistence.findAll(),

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
     * Get the total area for the given subzone
     *
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} One attribute object with the total area for the subzone
     */
    getTotalArea: async (subzoneId) => {
      const subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
      if (subzoneArea[0].area === null) {
        throw new Error("basin subzone doesn't exists");
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
      return values
        .sort((a, b) => HFCategoriesKeysOrder(a.key) - HFCategoriesKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
          percentage: value.area / subzoneArea,
        }));
    },

    /**
     * Get the current value and category of human footprint for the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} Object with the current human footprint value.
     */
    getCurrentHFValue: async (subzoneId) => {
      const value = await basinSubzonePersistence.findCurrentHFValue(subzoneId);
      if (value[0].CurrentHFValue === null) {
        throw new Error("basin subzone doesn't exists");
      }
      return {
        value: value[0].CurrentHFValue,
        category: HFCategoriesRangeKeys(value[0].CurrentHFValue),
      };
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
      return values
        .sort((a, b) => persistenceKeysOrder(a.key) - persistenceKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
          percentage: value.area / subzoneArea,
        }));
    },

    /**
     * Get the human footprint value through time in the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} Object of HF values through time
     */
    getTotalHFTimeLine: async (subzoneId) => {
      const values = await basinSubzonePersistence.findTotalHFTimeLine(subzoneId);
      return {
        key: 'aTotal',
        data: values.map((value) => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Request a given strategic ecosystem HF timeline data inside a basin subzone
     * @param {Number} subzoneId basin subzone id
     * @param {String} seType strategic ecosystem type
     *
     * @return {Object} Object of HF values through time
     */
    getSEHFTimeline: async (subzoneId, seType) => {
      const values = await seService.getSEHFTimelineInGeofence('subzones', subzoneId, seType);
      return {
        key: SEKeys(seType),
        data: values.map((value) => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Get the forest loss and persistence data inside a basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object[]} Object of forest loss and persistence values
     */
    getEcoChangeLP: async () => forestLP,

    /**
     * Get the forest loss and persistence layer divided by categories in a given period and
     * a basin subzone
     * @param {Number} subzoneId basin subzone id
     * @param {String} period period
     *
     * @return {Object} Geojson object with the geometry
     */
    getEcoChangeLPLayer: async (subzoneId, period) => {
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
     * Get the forest persistence area inside a basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Object of forest persistence value
     */
    getEcoChangePersistenceValue: async () => forestPersistenceArea,

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
    getSELayer: async (subzoneId, seType) =>
      seService.getSELayerInGeofence('subzones', subzoneId, seType),

    /**
     * Get the current human footprint layer divided by categories in a given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFCategoriesLayerById: async (subzoneId) => {
      const geom = await basinSubzonePersistence.findHFCategoriesLayerById(subzoneId);
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
     * Get the persistence human footprint layer divided by categories in a given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFPersistenceLayerById: async (subzoneId) => {
      const geom = await basinSubzonePersistence.findHFPersistenceLayerById(subzoneId);
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

  return basinSubzone;
};
