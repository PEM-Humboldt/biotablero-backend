module.exports = (
  sePersistence, paramoPersistence, tropicalDryForestPersistence, wetlandPersistence,
) => ({
  /**
   * Get all strategic ecosystems
   */
  getAll: async () => sePersistence.findAll(),

  /**
   * Get all distinct primary ecosystems
   */
  getPrimary: async () => sePersistence.findAllPrimary(),

  /**
   * Get different ecosystems areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  getAreasByEA: async (eaId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByEA(eaId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByEA(eaId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByEA(eaId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  },
});
