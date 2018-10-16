module.exports = strategyPersistence => ({
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
      const error = new Error('There are missing parameters or unacceptable values');
      error.code = 400;
      throw error;
    }
    const geometry = await strategyPersistence.findGeoByBiomeSubzoneEA(bId, sId, envAuthorityId);
    const strategies = await strategyPersistence.findByBiomeSubzoneEA(bId, sId, envAuthorityId);

    return { strategies, geometry };
  },
});
