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
    getDryForestValues: async (areaType, areaId) => 
      FunctionalDryForestPersistence.findDryForestValues(areaType, areaId),

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
      const rawData = await FunctionalDryForestPersistence.findDryForestFeatures(areaType,areaId);

      const featuresData = rawData[0] ? rawData[0] : null;
      if (!featuresData) {
        throw new Error(
          "Data for functional features in the dry forest doesn't exists in the selected area id and area type",
        );
      }

      const data = [
        {
          id: 'leaf_area',
          min: featuresData.leaf_area_min,
          max: featuresData.leaf_area_max,
          value: featuresData.leaf_area_value,
        },
        {
          id: 'leaf_nitrogen',
          min: featuresData.leaf_nitrogen_min,
          max: featuresData.leaf_nitrogen_max,
          value: featuresData.leaf_nitrogen_value,
        },
        {
          id: 'maximun_height',
          min: featuresData.maximun_height_min,
          max: featuresData.maximun_height_max,
          value: featuresData.maximun_height_value,
        },
        {
          id: 'specific_leaf_area',
          min: featuresData.specific_leaf_area_min,
          max: featuresData.specific_leaf_area_max,
          value: featuresData.specific_leaf_area_value,
        },
        {
          id: 'wood_density',
          min: featuresData.wood_density_min,
          max: featuresData.wood_density_max,
          value: featuresData.wood_density_value,
        },
        {
          id: 'seed_mass',
          min: featuresData.seed_mass_min,
          max: featuresData.seed_mass_max,
          value: featuresData.seed_mass_value,
        },
      ];
      return data;
    },
  };

  return Functional;
};
