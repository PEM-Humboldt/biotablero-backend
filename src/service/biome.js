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

  /**
   * Get all impacted biomes by a given project. Organize the result into groups by biome, sub-basin
   *  and environmental authority name.
   *
   * @param {Number} projectd project id to filter biomes by
   *
   * @returns {Object} grouped impacted biomes
   */
  getImpactedDecisionTree: async (projectId) => {
    const biomes = await biomePersistence.findProjectImpactedWithSzhEa(projectId);
    return groupObjects(['biome_name', 'nom_szh', 'ea_name'], biomes);
  },

  /**
   * Get impacted biomes by a given project. Results are separated into: biomes, list o objects with
   *  basic information about each biome, and, geometry, the geometry object with all impacted
   *  biomes as features
   *
   * @param {Number} projectId project id to filter by
   *
   * @returns {Object} Biomes information list and geometry.
   */
  getImpacted: async (projectId) => {
    const biomes = await biomePersistence.findProjectImpacted(projectId);
    const geometry = await biomePersistence.findGeoProjectImpacted(projectId);
    return { biomes, geometry };
  },
});
