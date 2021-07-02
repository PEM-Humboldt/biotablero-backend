const { rasterNOSKeys } = require('../util/appropriate_keys');

module.exports = (RichnessPersistence, restAPI) => {
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
    getNumberSpecies: async (areaType, areaId, group = 'all') => {
      const data = [
        {
          id: 'total',
          inferred: 40,
          observed: 4,
          region_observed: 110,
          region_inferred: 130,
        },
        {
          id: 'endemic',
          inferred: 20,
          observed: 25,
          region_observed: 120,
          region_inferred: 100,
        },
        {
          id: 'invasive',
          inferred: 20,
          observed: 10,
          region_observed: 90,
          region_inferred: 80,
        },
        {
          id: 'threatened',
          inferred: 15,
          observed: 20,
          region_observed: 90,
          region_inferred: 100,
        },
      ];
      switch (group) {
        case 'total':
          return [data[0]];
        case 'endemic':
          return [data[1]];
        case 'invasive':
          return [data[2]];
        case 'threatened':
          return [data[3]];
        case 'all':
        default:
          return data;
      }
    },

    /**
     * Get thresholds for the number of species for the given area type in the given group
     *
     * @param {String} areaType area type
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Number of inferred and observed species for the desired group.
     */
    getNSThresholds: async (areaType, group = 'all') => {
      const data = [
        {
          id: 'total',
          min_inferred: 10,
          min_observed: 4,
          max_inferred: 90,
          max_observed: 85,
        },
        {
          id: 'endemic',
          min_inferred: 2,
          min_observed: 4,
          max_inferred: 75,
          max_observed: 80,
        },
        {
          id: 'invasive',
          min_inferred: 3,
          min_observed: 1,
          max_inferred: 60,
          max_observed: 65,
        },
        {
          id: 'threatened',
          min_inferred: 3,
          min_observed: 5,
          max_inferred: 50,
          max_observed: 60,
        },
      ];
      switch (group) {
        case 'total':
          return [data[0]];
        case 'endemic':
          return [data[1]];
        case 'invasive':
          return [data[2]];
        case 'threatened':
          return [data[3]];
        case 'all':
        default:
          return data;
      }
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
     * Get layer for the number of species in the given area of the given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
     * 'invasive', 'threatened'.
     *
     * @returns {Binary} Image with the geometry
     */
    NOSLayer: async (areaType, areaId, group) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessPersistence.getAreaLayer(
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
  };

  return Richness;
};
