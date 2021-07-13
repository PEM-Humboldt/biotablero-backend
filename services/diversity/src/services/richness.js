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
      let values;
      let result = [];
      const lab = ['total', 'endemic', 'invasive', 'threatened'];
      switch (group) {
        case 'total':
          values = await RichnessPersistence.findTotalNumberOfSpecies(areaType, areaId);
          result.push({ id: group, ...values[0] });
          break;
        case 'endemic':
          values = await RichnessPersistence.findEndemicNumberOfSpecies(areaType, areaId);
          result.push({ id: group, ...values[0] });
          break;
        case 'invasive':
          values = await RichnessPersistence.findInvasiveNumberOfSpecies(areaType, areaId);
          result.push({ id: group, ...values[0] });
          break;
        case 'threatened':
          values = await RichnessPersistence.findThreatenedNumberOfSpecies(areaType, areaId);
          result.push({ id: group, ...values[0] });
          break;
        case 'all':
          values = await Promise.all([
            RichnessPersistence.findTotalNumberOfSpecies(areaType, areaId),
            RichnessPersistence.findEndemicNumberOfSpecies(areaType, areaId),
            RichnessPersistence.findInvasiveNumberOfSpecies(areaType, areaId),
            RichnessPersistence.findThreatenedNumberOfSpecies(areaType, areaId),
          ]);
          result = values.map((item, i) => ({ id: lab[i], ...item[0] }));
          break;
        default:
          return result;
      }

      if (!result) {
        throw new Error('There\'s not any values of number of species thresholds');
      }

      return result;
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
      let values;
      let result = [];
      const lab = ['total', 'endemic', 'invasive', 'threatened'];
      switch (group) {
        case 'total':
          values = await RichnessPersistence.findThresholdsTotalNumberOfSpecies(areaType);
          result.push({ id: group, ...values[0] });
          break;
        case 'endemic':
          values = await RichnessPersistence.findThresholdsEndemicNumberOfSpecies(areaType);
          result.push({ id: group, ...values[0] });
          break;
        case 'invasive':
          values = await RichnessPersistence.findThresholdsInvasiveNumberOfSpecies(areaType);
          result.push({ id: group, ...values[0] });
          break;
        case 'threatened':
          values = await RichnessPersistence.findThresholdsThreatenedNumberOfSpecies(areaType);
          result.push({ id: group, ...values[0] });
          break;
        case 'all':
          values = await Promise.all([
            RichnessPersistence.findThresholdsTotalNumberOfSpecies(areaType),
            RichnessPersistence.findThresholdsEndemicNumberOfSpecies(areaType),
            RichnessPersistence.findThresholdsInvasiveNumberOfSpecies(areaType),
            RichnessPersistence.findThresholdsThreatenedNumberOfSpecies(areaType),
          ]);
          result = values.map((item, i) => ({ id: lab[i], ...item[0] }));
          break;
        default:
          return result;
      }

      if (!result) {
        throw new Error('There\'s not any values of number of species');
      }

      return result;
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
