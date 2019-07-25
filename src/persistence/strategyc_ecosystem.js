/**
 * TODO: Delete this message when SE tables are unified in one.
 * There is only one persistence that merges results from different tables because these three
 * tables are temporal, the definitive model will be in just one table.
 */
module.exports = (db, { geoParamo, geoTropicalDryForest, geoWetland }) => ({
  /**
   * Find all strategic ecosystems
   */
  findAll: () => (
    geoParamo.query().select('id_ecosystem', 'name', 'second_class')
      .union(
        geoTropicalDryForest.query().select('id_ecosystem', 'name', 'second_class'),
        geoWetland.query().select('id_ecosystem', 'name', 'second_class'),
      )
  ),

  /**
   * Find all tropical dry forests
   */
  findAllPrimary: () => (
    geoParamo.query().distinct('name').select()
      .union(
        geoTropicalDryForest.query().distinct('name').select(),
        geoWetland.query().distinct('name').select(),
      )
  ),
});
