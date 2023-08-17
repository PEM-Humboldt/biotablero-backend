const RestifyErrors = require('restify-errors');
const { areaTypeKeys, rasterForestLPKeys } = require('../util/appropriate_keys');
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
      const promises = [];
      const periods = ['2000-2005', '2006-2010', '2011-2015', '2016-2021'];

      periods.forEach((period) => {
        promises.push(ForestLPPersistence.findForestLP(areaTypeKeys(areaType), areaId, period));
      });

      return Promise.all(promises)
        .then((response) => {
          response.forEach((item, i) => {
            const totalArea = item.map((o) => o.area).reduce((prev, next) => prev + next);
            const periodData = item.map((period) => ({
              ...period,
              percentage: period.area / totalArea,
            }));
            data.push({
              id: periods[i],
              data: periodData,
            });
          });
          return data.every((elem) => Array.isArray(elem) && elem.data.length === 0) ? [] : data;
        })
        .catch((e) => {
          throw new Error({
            code: 500,
            stack: e.stack,
            message: 'Error retrieving forest lp data',
          });
        });
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
          rasterForestLPKeys(category, period),
          forestLPColorSet(category),
        );
      } catch (e) {
        throw new RestifyErrors.InternalError('Error retrieving layer');
      }
    },
  };

  return forestLP;
};
