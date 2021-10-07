const { rasterNOSKeys } = require('../util/appropriate_keys');

module.exports = (RichnessNOSPersistence, RichnessGapsPersistence, restAPI) => {
  const Richness = {
    /**
     * Get values for the number of species in the given area of the given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Number of inferred and observed species for the desired group.
     */
    getNumberOfSpecies: async (areaType, areaId, group = 'all') => {
      const promises = [];
      switch (group) {
        case 'total':
        case 'endemic':
        case 'invasive':
        case 'threatened':
          promises.unshift(RichnessNOSPersistence.findNumberOfSpecies(areaType, areaId, group));
          break;
        case 'all':
          promises.unshift(
            RichnessNOSPersistence.findNumberOfSpecies(areaType, areaId, 'total'),
            RichnessNOSPersistence.findNumberOfSpecies(areaType, areaId, 'endemic'),
            RichnessNOSPersistence.findNumberOfSpecies(areaType, areaId, 'invasive'),
            RichnessNOSPersistence.findNumberOfSpecies(areaType, areaId, 'threatened'),
          );
          break;
        default:
          throw new Error("Data doesn't exist for the given group");
      }
      return Promise.all(promises)
        .then((response) => {
          const ids = ['total', 'endemic', 'invasive', 'threatened'];
          const result = response.map((item, i) => {
            let id = group;
            if (group === 'all') {
              id = ids[i];
            }
            if (item.length === 0) return [];
            return { id, ...item[0] };
          });
          return result.some((elem) => Array.isArray(elem) && elem.length === 0) ? [] : result;
        })
        .catch((e) => {
          throw new Error({
            code: 500,
            stack: e.stack,
            message: 'Error retrieving NOS thresholds data',
          });
        });
    },

    /**
     * Get thresholds for the number of species in the same biotic unit as the given area id for the
     * given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Max an min number of inferred and observed species in the biotic unit for
     * the desired group.
     */
    getNOSThresholds: async (areaType, areaId, group = 'all') => {
      const promises = [];
      switch (group) {
        case 'total':
        case 'endemic':
        case 'invasive':
        case 'threatened':
          promises.unshift(RichnessNOSPersistence.findThresholds(areaType, areaId, group));
          break;
        case 'all':
          promises.unshift(
            RichnessNOSPersistence.findThresholds(areaType, areaId, 'total'),
            RichnessNOSPersistence.findThresholds(areaType, areaId, 'endemic'),
            RichnessNOSPersistence.findThresholds(areaType, areaId, 'invasive'),
            RichnessNOSPersistence.findThresholds(areaType, areaId, 'threatened'),
          );
          break;
        default:
          throw new Error("Data doesn't exist for the given group");
      }
      return Promise.all(promises)
        .then((response) => {
          const ids = ['total', 'endemic', 'invasive', 'threatened'];
          const result = response.map((item, i) => {
            let id = group;
            if (group === 'all') {
              id = ids[i];
            }
            if (Object.values(item[0]).some((element) => element === null)) return [];
            return { id, ...item[0] };
          });
          return result.some((elem) => Array.isArray(elem) && elem.length === 0) ? [] : result;
        })
        .catch((e) => {
          throw new Error({
            code: 500,
            stack: e.stack,
            message: 'Error retrieving NOS thresholds data',
          });
        });
    },

    /**
     * Get national max values for the number of species in the given area type for the given group
     *
     * @param {String} areaType area type
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Max number of inferred and observed species at a national level for the
     * desired group.
     */
    getNOSNationalMax: async (areaType, group = 'all') => {
      const promises = [];
      switch (group) {
        case 'total':
        case 'endemic':
        case 'invasive':
        case 'threatened':
          promises.unshift(RichnessNOSPersistence.findNationalMax(areaType, group));
          break;
        case 'all':
          promises.unshift(
            RichnessNOSPersistence.findNationalMax(areaType, 'total'),
            RichnessNOSPersistence.findNationalMax(areaType, 'endemic'),
            RichnessNOSPersistence.findNationalMax(areaType, 'invasive'),
            RichnessNOSPersistence.findNationalMax(areaType, 'threatened'),
          );
          break;
        default:
          throw new Error("Data doesn't exist for the given group");
      }
      return Promise.all(promises)
        .then((response) => {
          const ids = ['total', 'endemic', 'invasive', 'threatened'];
          const result = response.map((item, i) => {
            let id = group;
            if (group === 'all') {
              id = ids[i];
            }
            if (Object.values(item[0]).some((element) => element === null)) return [];
            return { id, ...item[0] };
          });
          return result.some((elem) => Array.isArray(elem) && elem.length === 0) ? [] : result;
        })
        .catch((e) => {
          throw new Error({
            code: 500,
            stack: e.stack,
            message: 'Error retrieving NOS thresholds data',
          });
        });
    },

    /**
     * Get values for richness species gaps in the given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object} Values of richness species gaps
     */
    getGaps: async () => {
      const data = {
        id: 'gaps',
        avg: 0.34,
        min: 0.4,
        max: 0.8,
        min_threshold: 0.15,
        max_threshold: 0.95,
      };
      return data;
    },

    /**
     * Get values for richness species concentration in the given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object} Values of richness species concentration
     */
    getConcentration: async () => {
      const data = {
        id: 'concentration',
        avg: 0.3,
        min: 0.2,
        max: 0.6,
        min_threshold: 0.1,
        max_threshold: 1,
      };
      return data;
    },

    /**
     * Get the layer for the number of species in the given area of the given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
     * 'invasive', 'threatened'.
     *
     * @returns {Binary} Image with the geometry
     */
    getNOSLayer: async (areaType, areaId, group) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessNOSPersistence.findNOSLayer(
          areaGeom.features[0].geometry,
          rasterNOSKeys(group),
        );
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving layer',
        };
        throw error;
      }
    },

    /**
     * Get the min and max value of the layer for the number of species in the given area
     * of the given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
     * 'invasive', 'threatened'.
     *
     * @returns {Object} Object with min and max value
     */
     getNOSLayerThresholds: async (areaType, areaId, group) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessNOSPersistence.findNOSLayerThresholds(
          areaGeom.features[0].geometry,
          rasterNOSKeys(group),
        );
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving layer',
        };
        throw error;
      }
    },

    /**
     * Get the layer for the gaps section in the given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Binary} Image with the geometry
     */
     getGapsLayer: async (areaType, areaId) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessGapsPersistence.findGapsLayer(
          areaGeom.features[0].geometry,
          'GAPS_INDICE_GSI_2020.tif',
        );
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving layer',
        };
        throw error;
      }
    },

    /**
     * Get the min and max value of the layer for the gaps section in the given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object} Object with min and max value
     */
     getGapsLayerThresholds: async (areaType, areaId) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessGapsPersistence.findGapsLayerThresholds(
          areaGeom.features[0].geometry,
          'GAPS_INDICE_GSI_2020.tif',
        );
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving layer',
        };
        throw error;
      }
    },
  };

  return Richness;
};
