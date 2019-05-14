module.exports = (db, { geoProtectedAreas }) => ({
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
   */
  getTotalAreaByCategory: categoryName => (
    geoProtectedAreas.query()
      .where('category', categoryName)
      .sum('area_ha as area')
  ),
});
