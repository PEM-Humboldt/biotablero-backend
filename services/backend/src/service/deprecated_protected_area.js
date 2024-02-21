const RestifyErrors = require('restify-errors');

module.exports = (paPersistence) => {
  const protectedArea = {
    /**
     * Get protected areas categories by binary protected values
     *
     * @param {String[]} binaryProtected binary protected values to filter by
     */
    getCategoriesByBinaryProtected: async (binaryProtected) =>
      paPersistence.findCategoriesByBinaryProtected(binaryProtected),

    /**
     * Get the binary protected value for the given category name
     *
     * @param {String} categoryName protected area category name
     *
     * @returns {Object} binary protected value
     *
     */
    getBinaryProtectedByCategory: async (categoryName) => {
      const binaryProtected = await paPersistence.findBinaryProtectedByCategory(categoryName);
      if (binaryProtected.length === 0) {
        throw new RestifyErrors.NotFoundError("protected area category doesn't exists");
      }
      return binaryProtected[0];
    },
  };

  return protectedArea;
};
