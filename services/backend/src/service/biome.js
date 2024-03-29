const groupObjects = require('../util/groupObjects');

module.exports = (biomePersistence) => ({
  /**
   * Bulk create a set of project impacted biomes
   *
   * @param {Object[]} biomes project impacted biomes to create
   *
   * @returns {Object[]} created objects with id
   */
  bulkAddImpacted: async (biomes) => biomePersistence.bulkCreateProjectImpacted(biomes),

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
    if (!biomes || biomes.length === 0) return {};
    const geometry = await biomePersistence.findGeoProjectImpacted(projectId);
    return { biomes, geometry };
  },
});
