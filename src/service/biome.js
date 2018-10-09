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
});
