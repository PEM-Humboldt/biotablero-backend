module.exports = (FunctionalDryForestPersistence) => {
  const Functional = {
    /**
     * Get values of functional diversity in the dry forest in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object} Values of functional diversity in the dry forest
     */
    getDryForestValues: async (areaType, areaId) => {
      const rawData = await FunctionalDryForestPersistence.findDryForestValues(areaType, areaId);
      const values = rawData[0] ? rawData[0] : null;
      if (!values) {
        throw new Error(
          "Data for functional values in the dry forest doesn't exists in the selected area id and area type",
        );
      }
      return values;
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
    getDryForestFeatures: async (areaType, areaId) => {
      const rawData = await FunctionalDryForestPersistence.findDryForestFeatures(areaType, areaId);

      const features = rawData[0] ? rawData[0] : null;
      if (!features) {
        throw new Error(
          "Data for functional features in the dry forest doesn't exists in the selected area id and area type",
        );
      }

      const data = [
        {
          id: 'leaf_area',
          min: features.leaf_area_min,
          max: features.leaf_area_max,
          value: features.leaf_area_value,
        },
        {
          id: 'leaf_nitrogen',
          min: features.leaf_nitrogen_min,
          max: features.leaf_nitrogen_max,
          value: features.leaf_nitrogen_value,
        },
        {
          id: 'maximun_height',
          min: features.maximun_height_min,
          max: features.maximun_height_max,
          value: features.maximun_height_value,
        },
        {
          id: 'specific_leaf_area',
          min: features.specific_leaf_area_min,
          max: features.specific_leaf_area_max,
          value: features.specific_leaf_area_value,
        },
        {
          id: 'wood_density',
          min: features.wood_density_min,
          max: features.wood_density_max,
          value: features.wood_density_value,
        },
        {
          id: 'seed_mass',
          min: features.seed_mass_min,
          max: features.seed_mass_max,
          value: features.seed_mass_value,
        },
      ];
      return data;
    },
  };

  return Functional;
};
