const topojson = require('topojson');
const groupObjects = require('../util/groupObjects');

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

  getImpactedDecisionTree: async (projectId) => {
    const biomes = await biomePersistence.findProjectImpactedWithSzhEa(projectId);
    return groupObjects(['biome_name', 'nom_szh', 'ea_name'], biomes);
  },

  getImpacted: async (projectId) => {
    const biomes = await biomePersistence.findProjectImpacted(projectId);
    const geometry = await biomePersistence.findGeoProjectImpacted(
      biomes.map(biome => biome.id_biome),
    );

    return { biomes, geometry };
  },
});
