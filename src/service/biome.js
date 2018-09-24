const topojson = require('topojson');

module.exports = biomePersistence => ({
  /**
     * Get biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @return {Array} JSON Objects
     */
  getBiomeByEA: async (envAuthority) => {
    const biomes = await biomePersistence.findBiomeByEA(envAuthority);
    return biomes.map(({ geomGeoJSON, ...others }) => ({
      ...others,
      geomTopoJSON: topojson.topology({ geomTopoJSON: JSON.parse(geomGeoJSON) }),
    }));
  },
});
