module.exports = (db, { dglobalBinaryProtectedAreas }) => ({
  /**
   * Get the protected area categories for the given set of binary protected values
   *
   * @param {String[]} binaryProtected binary protected values to filter by
   */
  findCategoriesByBinaryProtected: (binaryProtected) =>
    dglobalBinaryProtectedAreas
      .query()
      .whereIn('binary_protected', binaryProtected)
      .orderBy('binary_protected')
      .select('binary_protected', 'label'),

  /**
   * Get the binary protected value for the given category name
   *
   * @param {String} categoryName protected area category name
   *
   * @returns {Object} binary protected value
   *
   */
  findBinaryProtectedByCategory: (categoryName) =>
    dglobalBinaryProtectedAreas.query().where('label', categoryName).select('binary_protected'),
});
