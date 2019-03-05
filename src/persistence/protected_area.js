module.exports = (db, { geoProtectedAreas }) => ({
  /**
   * Get all protected area categories
   */
  findCategories: () => (
    geoProtectedAreas.query()
      .distinct('category')
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
});
