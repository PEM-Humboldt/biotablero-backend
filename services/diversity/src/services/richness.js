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
    getNumberOfSpecies: async (areaType, areaId, group = 'all') => {
      const values = await RichnessPersistence.findNumberOfSpecies(areaType, areaId, group);
      if (values.length === 0) {
        throw new Error('There\'s not any values of number of species');
      }
      const data = [];
      const total = {
        id: 'total',
        inferred: values[0].rn_total_inf,
        observed: values[0].rn_total_obs,
        region_observed: values[0].rnr_total_obs,
        region_inferred: values[0].rnr_total_inf,
      };
      const endemic = {
        id: 'endemic',
        inferred: values[0].rn_end_inf,
        observed: values[0].rn_end_obs,
        region_observed: values[0].rnr_end_obs,
        region_inferred: values[0].rnr_end_inf,
      };
      const invasive = {
        id: 'invasive',
        inferred: values[0].rn_inv_inf,
        observed: values[0].rn_inv_obs,
        region_observed: values[0].rnr_inv_obs,
        region_inferred: values[0].rnr_inv_inf,
      };
      const threatened = {
        id: 'threatened',
        inferred: values[0].rn_thr_inf,
        observed: values[0].rn_thr_obs,
        region_observed: values[0].rnr_thr_obs,
        region_inferred: values[0].rnr_thr_inf,
      };
      data.push(total, endemic, invasive, threatened);
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
    getNOSThresholds: async (areaType, group = 'all') => {
      const values = await RichnessPersistence.getNOSThresholds(areaType);
      if (values.length === 0) {
        throw new Error('There\'s not any thresholds values of species');
      }
      const data = [];
      const total = {
        id: 'total',
        min_inferred: values[0].min_total_inf,
        min_observed: values[0].min_total_obs,
        max_inferred: values[0].max_total_inf,
        max_observed: values[0].max_total_obs,
      };
      const endemic = {
        id: 'endemic',
        min_inferred: values[0].min_end_inf,
        min_observed: values[0].min_end_obs,
        max_inferred: values[0].max_end_inf,
        max_observed: values[0].max_end_obs,
      };
      const invasive = {
        id: 'invasive',
        min_inferred: values[0].min_inv_inf,
        min_observed: values[0].min_inv_obs,
        max_inferred: values[0].max_inv_inf,
        max_observed: values[0].max_inv_obs,
      };
      const threatened = {
        id: 'threatened',
        min_inferred: values[0].min_thr_inf,
        min_observed: values[0].min_thr_obs,
        max_inferred: values[0].max_thr_inf,
        max_observed: values[0].max_thr_obs,
      };
      data.push(total, endemic, invasive, threatened);
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
    NOSLayerThresholds: async (areaType, areaId, group) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return RichnessPersistence.getAreaLayerThresholds(
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
