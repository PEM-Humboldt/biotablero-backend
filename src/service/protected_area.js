module.exports = paPersistence => ({
  /**
   * Get the protected areas categories
   */
  getCategories: async () => paPersistence.findCategories(),

  /**
   * Get the protected areas in a given category
   */
  getByCategory: async categoryName => paPersistence.findByCategory(categoryName),
});
