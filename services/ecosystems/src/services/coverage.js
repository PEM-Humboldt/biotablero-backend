const { rasterCoverageKeys, areaTypeKeys } = require('../util/appropriate_keys');
const { colorSet } = require('../util/colorSet');

module.exports = (CoveragePersistence, restAPI) => {
  const Coverage = {
    /**
     * Area distribution for each coverage type and its percentage within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object[]} Values of area distribution and percentage by coverage type
     * connectivity
     */
    getCoverage: async (areaType, areaId) => {
      const rawData = await CoveragePersistence.findCoverage(areaTypeKeys(areaType), areaId);

      const noCoverageData = rawData.every((item) => Object.values(item).length === 0);
      if (noCoverageData) {
        throw new Error("Data for coverage doesn't exists in the selected area id and area type");
      }
      const totalArea = rawData.map((i) => i.area_ha).reduce((prev, next) => prev + next);
      const data = Object.keys(rawData).map((key) => ({
        area: rawData[key].area_ha,
        type: rawData[key].area_type,
        percentage: Number(rawData[key].area_ha) / totalArea,
      }));
      const invalidValues = data.filter((obj) => !obj.area || obj.area === 0);
      return invalidValues.length === data.length ? [] : data;
    },

    /**
     * Get the coverage layer according to its type in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} type type to select the proper layer, options are: 'N', 'S' and 'T'
     *
     * @returns {Binary} Image with the geometry
     */
    getCoverageLayer: async (areaType, areaId, type) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return CoveragePersistence.findCoverageLayer(
          areaGeom.features[0].geometry,
          rasterCoverageKeys(type),
          colorSet(type),
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
  return Coverage;
};
