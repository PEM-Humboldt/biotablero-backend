module.exports = (db, { compensaciones2017carszhmun }) => ({
  /**
   * Find total area grouped by fc_valor in a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total areas by fc_valor
   */
  findAreaByCF: envAuthorityId => (
    compensaciones2017carszhmun.query()
      .where('id_car', envAuthorityId)
      .sum('area_ha')
      .groupBy('fc_valor')
      .orderBy('fc_valor', 'asc')
      .select('fc_valor')
  ),
});
