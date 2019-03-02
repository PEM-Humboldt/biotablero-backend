module.exports = sePersistence => ({
  /**
   * Get all paramos
   */
  getParamos: async () => sePersistence.findAllParamos(),

  /**
   * Get all tropical dry forests
   */
  getDryForests: async () => sePersistence.findAllDryForests(),

  /**
   * Get all wetlands
   */
  getWetlands: async () => sePersistence.findAllWetlands(),
});
