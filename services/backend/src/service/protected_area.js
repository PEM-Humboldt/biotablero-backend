const RestifyErrors = require('restify-errors');

const { globalPAAreaTypes, globalPASEKeys } = require('../util/appropriate_keys');

module.exports = (globalProtectedAreaPersistence) => ({
  /**
   * Get the area distribution for each protected area category in a given area
   *  and if applies, in the given strategic ecosystem
   *
   * @param {String} areaType area type
   * @param {String} areaId area id
   * @param {String} se strategic ecosystem
   *
   * @return {Object[]} Values of protected areas categories
   */
  getPAAreas: async (areaType, areaId, se = null) => {
    const areaCol = globalPAAreaTypes(areaType);
    const seCol = globalPASEKeys(se);

    const areas = await globalProtectedAreaPersistence.findAreaByPA(
      areaCol,
      areaId.toString(),
      seCol,
    );
    if (areas.length === 0) {
      throw new RestifyErrors.NotFoundError(
        `Protected areas data not available in the selected ecosystem, area id and area type`,
      );
    }

    return areas.map(({ area, ...cats }) => ({
      area,
      type: Object.values(cats)
        .filter((c) => c !== null)
        .join(' y '),
    }));
  },
});
