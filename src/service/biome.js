const topojson = require('topojson');

module.exports = biomePersistence => ({
  /**
   * Get biomes by a given environmental authority.
   *
   * @param {String} envAuthority environmental authority name to filter by
   *
   * @return {Object} TopoJson Object with biomes as geometries from a GeometryCollection
   */
  getBiomeByEA: async (envAuthority) => {
    const biomes = await biomePersistence.findBiomeByEA(envAuthority);
    return topojson.topology({ ea: biomes });
  },

  /**
   * Bulk create a set of project impacted biomes
   *
   * @param {Object[]} biomes project impacted biomes to create
   *
   * @returns {Object[]} created objects with id
   */
  bulkAddImpacted: async biomes => biomePersistence.bulkCreateProjectImpacted(biomes),

  /**
   * Get all biomes
   *
   * @returns {Object[]} existing biomes
   */
  getAll: async () => biomePersistence.findAll(),
});
