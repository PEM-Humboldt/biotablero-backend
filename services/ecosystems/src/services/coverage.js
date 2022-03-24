const { 
  areaTypeKeys,
  rasterCoverageKeys,
  rasterCoverageSEKeys,
} = require('../util/appropriate_keys');
const { coveragesColorSet } = require('../util/colorSet');

module.exports = (CoveragePersistence, restAPI) => {
  const Coverage = {
    /**
     * Area distribution for each coverage type and its percentage within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object[]} Values of area distribution and percentage by coverage type
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
     * @param {String} type type to select the proper layer, options are: 'N', 'S', 'T' and 'X'
     *
     * @returns {Binary} Image with the geometry
     */
    getCoverageLayer: async (areaType, areaId, type) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return CoveragePersistence.findCoverageLayer(
          areaGeom.features[0].geometry,
          rasterCoverageKeys(type),
          coveragesColorSet(type),
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
     * Get area distribution for each SE type and total SE area within a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object[]} Values of area distribution for each SE type and total SE area
     */

    getSEAreas: async (areaType, areaId) => {
      const data = [];

      const rawDataP = await CoveragePersistence.findCoverageSEParamo(
        areaTypeKeys(areaType),
        areaId
      );
      data.push({
        area: rawDataP.map((i) => i.area_ha).reduce((prev, next) => prev + next),
        type: 'Páramo',
      });

      const rawDataDF = await CoveragePersistence.findCoverageSEDryForest(
        areaTypeKeys(areaType),
        areaId
      );
      data.push({
        area: rawDataDF.map((i) => i.area_ha).reduce((prev, next) => prev + next),
        type: 'Bosque Seco Tropical',
      });

      const rawDataW = await CoveragePersistence.findCoverageSEWetland(
        areaTypeKeys(areaType),
        areaId
      );
      data.push({
        area: rawDataW.map((i) => i.area_ha).reduce((prev, next) => prev + next),
        type: 'Humedal',
      });

      const noSEData = data.every((item) => Object.values(item).length === 0);
      if (noSEData) {
        throw new Error("Data for SE Areas doesn't exists in the selected area id and area type");
      }

      data.unshift({
        area: data.map((i) => i.area).reduce((prev, next) => prev + next),
        type: 'Total',
      });

      return data;
    },

    /**
     * Get area distribution for each coverage type within a SE type and a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} seType strategic ecosystem type, options are: 'Páramo','Bosque Seco Tropical'
     *  and 'Humedal'
     *
     * @returns {Object[]} Values of area distribution by coverage type
     */
    getCoverageSE: async (areaType, areaId, seType) => {
      let rawData = null;
      switch (seType) {
        case 'Bosque Seco Tropical':
          rawData = await CoveragePersistence.findCoverageSEDryForest(
            areaTypeKeys(areaType),
            areaId
          );
        break;
        case 'Páramo':
          rawData = await CoveragePersistence.findCoverageSEParamo(
            areaTypeKeys(areaType),
            areaId
          );
        break;
        case 'Humedal':
          rawData = await CoveragePersistence.findCoverageSEWetland(
            areaTypeKeys(areaType),
            areaId
          );
        break;
        default:
          throw new Error("Data doesn't exist for the given se type");
      }

      const noCoverageData = rawData.every((item) => Object.values(item).length === 0);
      if (noCoverageData) {
        throw new Error("Data for coverage doesn't exists in the selected area id, area type and se type");
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
     * @param {String} coverageType coverage type, options are: 'N', 'S', 'T' and 'X'
     * @param {String} seType strategic ecosystem type, options are: 'Páramo','Bosque Seco Tropical'
     *  and 'Humedal'
     *
     * @returns {Binary} Image with the geometry
     */
    getCoverageSELayer: async (areaType, areaId, coverageType, seType) => {
      try {
        const areaGeom = await restAPI.requestAreaGeometry(areaType, areaId);
        return CoveragePersistence.findCoverageLayer(
          areaGeom.features[0].geometry,
          rasterCoverageSEKeys(seType, coverageType),
          coveragesColorSet(coverageType),
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
