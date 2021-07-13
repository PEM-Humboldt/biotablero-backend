module.exports = () => {
  const Functional = {
    /**
     * Get values of functional diversity in the dry forest in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object} Values of functional diversity in the dry forest
     */
    getDryForestValues: async () => {
      const data = {
        richness: 27.12,
        uniformity: 0.36,
        divergence: 0.47,
      };
      return data;
    },

    /**
     * Get values of functional features in the dry forest in a given area. The features are:
     * Leaf Area, Leaf Nitrogen, Maximun Height, Specific Leaf Area, Wood Density and Seed Mass.
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object[]} Get values of functional diversity features.
     */
    getDryForestFeatures: async () => {
      const data = [
        {
          id: 'leaf_area',
          min: 9.5,
          max: 163655.67,
          value: 157,
        },
        {
          id: 'leaf_nitrogen',
          min: 8.97,
          max: 67.09,
          value: 15,
        },
        {
          id: 'maximun_height',
          min: 0.74,
          max: 50.96,
          value: 25.85,
        },
        {
          id: 'specific_leaf_area',
          min: 2.01,
          max: 71.35,
          value: 25.4,
        },
        {
          id: 'wood_density',
          min: 0.14,
          max: 1.14,
          value: 0.77,
        },
        {
          id: 'seed_mass',
          min: 0.02,
          max: 51319.58,
          value: 41258,
        },
      ];
      return data;
    },
  };

  return Functional;
};
