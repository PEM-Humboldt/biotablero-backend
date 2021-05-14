module.exports = () => {
  const Richness = {
    /**
     * Get values for the number of speceis in the given area of the given group
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Number of inferred and observed species for the desired group.
     */
    getNumberSpecies: async (areaType, areaId, group = 'all') => {
      const data = [
        {
          id: 'total',
          inferred: 40,
          observed: 4,
          region_observed: 110,
          region_inferred: 130,
        },
        {
          id: 'endemic',
          inferred: 20,
          observed: 25,
          region_observed: 120,
          region_inferred: 100,
        },
        {
          id: 'invasive',
          inferred: 20,
          observed: 10,
          region_observed: 90,
          region_inferred: 80,
        },
        {
          id: 'threatened',
          inferred: 15,
          observed: 20,
          region_observed: 90,
          region_inferred: 100,
        },
      ];
      switch (group) {
        case 'total':
          return [data[0]];
        case 'endemic':
          return [data[1]];
        case 'invasive':
          return [data[2]];
        case 'threatened':
          return [data[3]];
        case 'all':
        default:
          return data;
      }
    },

    /**
     * Get thresholds for the number of species for the given area type in the given group
     *
     * @param {String | Number} areaType area type
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Number of inferred and observed species for the desired group.
     */
    getNSThresholds: async (areaType, group = 'all') => {
      const data = [
        {
          id: 'total',
          min_inferred: 10,
          min_observed: 4,
          max_inferred: 90,
          max_observed: 85,
        },
        {
          id: 'endemic',
          min_inferred: 2,
          min_observed: 4,
          max_inferred: 75,
          max_observed: 80,
        },
        {
          id: 'invasive',
          min_inferred: 3,
          min_observed: 1,
          max_inferred: 60,
          max_observed: 65,
        },
        {
          id: 'threatened',
          min_inferred: 3,
          min_observed: 5,
          max_inferred: 50,
          max_observed: 60,
        },
      ];
      switch (group) {
        case 'total':
          return [data[0]];
        case 'endemic':
          return [data[1]];
        case 'invasive':
          return [data[2]];
        case 'threatened':
          return [data[3]];
        case 'all':
        default:
          return data;
      }
    },
  };

  return Richness;
};
