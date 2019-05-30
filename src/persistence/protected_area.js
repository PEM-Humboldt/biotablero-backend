module.exports = (db, { geoProtectedAreas, colombiaCoverages }) => ({
  /**
   * Get all protected area categories
   */
  findCategories: () => (
    geoProtectedAreas.query()
      .distinct('category as name')
      .select()
  ),

  /**
   * Get the protected areas in the given category
   */
  findByCategory: categoryName => (
    geoProtectedAreas.query()
      .where('category', categoryName)
      .select('gid', 'name', 'category', 'organization')
  ),

  /**
   * Get the total area for the given category
   *
   * @param {String} categoryName category
   * @param {Number} year optional year to filter data, 2012 by default
   */
  getTotalAreaByCategory: (categoryName, year = 2012) => (
    db('colombia_coverages')
      .innerJoin('geo_protected_areas', 'colombia_coverages.id_protected_area', 'geo_protected_areas.gid')
      .where({ 'geo_protected_areas.category': categoryName, 'colombia_coverages.year_cover': year })
      .select(db.raw('coalesce(SUM(colombia_coverages.area_ha), 0) as area'))
  ),
});
