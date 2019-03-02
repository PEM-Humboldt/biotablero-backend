module.exports = (db, { geoParamo, geoTropicalDryForest, geoWetland }) => ({
  /**
   * Find all paramos
   */
  findAllParamos: () => (
    geoParamo
      .fetchAll({ columns: ['id_ecosystem', 'name', 'second_class'] })
      .then(states => states.toJSON())
  ),

  /**
   * Find all tropical dry forests
   */
  findAllDryForests: () => (
    geoTropicalDryForest
      .fetchAll({ columns: ['id_ecosystem', 'name', 'second_class'] })
      .then(states => states.toJSON())
  ),

  /**
   * Find all wetlands
   */
  findAllWetlands: () => (
    geoWetland
      .fetchAll({ columns: ['id_ecosystem', 'name', 'second_class'] })
      .then(states => states.toJSON())
  ),
});
