const { areaTypeKeys, rasterForestLPSEKeys } = require('../util/appropriate_keys');
const { forestLPColorSet } = require('../util/colorSet');

module.exports = (ForestLPPersistence, restAPI) => {
  const forestLP = {
    /**
     * Get the forest loss and persistence data inside a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @return {Object[]} Array with forest loss and persistence values
     */
    getForestLP: async (areaType, areaId) => {
      const data = [];

      let periodData = await ForestLPPersistence.findForestLP(
        areaTypeKeys(areaType),
        areaId,
        '2000-2005',
      );

      const totalArea = periodData.map((i) => i.area).reduce((prev, next) => prev + next);
      periodData = periodData.map(obj => ({
          ...obj,
          percentage: obj.area / totalArea,
      }));

      data.push({
        id: '2000-2005',
        data: periodData,
      });
      return data;
    },

    getForestLP2: async (areaType, areaId) => {
      const data = [];

      const periods = ['2000-2005', '2006-2010', '2011-2015', '2016-2021'];

      periods.forEach((period) => {
        let periodData = ForestLPPersistence.findForestLP(
          areaTypeKeys(areaType),
          areaId,
          period,
        );
        const totalArea = periodData.map((i) => i.area).reduce((prev, next) => prev + next);
        periodData = periodData.map(obj => ({
            ...obj,
            percentage: obj.area / totalArea,
        }));

        data.push({
          id: period,
          data: periodData,
        });
      });

      return data;
    },

    /**
     * Get the forest loss and persistence layer according to its category and period
     * in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} category forest loss and persistence category, options are: 'persistencia',
     * 'perdida', and 'no_bosque'
     * @param {String} period period. Options are: '2000-2005', '2006-2010', '2011-2015'and
     * '2016-2021'
     *
     * @returns {Binary} Image with the geometry
     */
     getForestLPLayer: async (areaType, areaId, category, period) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return ForestLPPersistence.findForestLPLayer(
          areaGeom.features[0].geometry,
          rasterForestLPSEKeys(category, period),
          forestLPColorSet(category),
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

  return forestLP;
};
