const RestifyErrors = require('restify-errors');

const groupObjects = require('../util/groupObjects');

module.exports = (strategyPersistence, logger) => ({
  /**
   * Get strategies by biome, sub-basin and environmental authority
   *
   * @param {Number} biomeId biome id
   * @param {Number} subzoneId sub-basin id
   * @param {Srting} envAuthorityId environmental authority id
   *
   * @return {Object} Object with two properties: strategies, an array with strategies information,
   *  and geometry, a geoJson object with strategies as features
   */
  getByBiomeSubzoneEA: async (biomeId, subzoneId, envAuthorityId) => {
    const bId = parseInt(biomeId, 10);
    const sId = parseInt(subzoneId, 10);
    if (!bId || !sId || !envAuthorityId) {
      throw new RestifyErrors.BadRequestError(
        'There are missing parameters or unacceptable values',
      );
    }
    let geometry = await strategyPersistence.findGeoByBiomeSubzoneEA(bId, sId, envAuthorityId);
    const listStrategies = await strategyPersistence.findByBiomeSubzoneEA(bId, sId, envAuthorityId);
    const groupedStrategies = groupObjects(['id_strategy'], listStrategies);

    const strategies = Object.keys(groupedStrategies).map((key) => {
      const totalArea = groupedStrategies[key].reduce((acc, current) => current.area_ha + acc, 0);
      return {
        area_ha: totalArea,
        id: key,
        strategy_name: groupedStrategies[key][0].strategy.strategy,
      };
    });

    if (geometry.features === null) {
      logger.error(`Combination of biome: ${biomeId},
      sub-basin: ${subzoneId} and ea: ${envAuthorityId} without strategies`);
      geometry = null;
    }

    return { strategies, geometry };
  },
});
