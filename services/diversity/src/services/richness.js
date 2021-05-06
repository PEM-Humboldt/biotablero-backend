module.exports = () => {
  const Richness = {
    /**
     * Get values for the forest structural condition index crossed with human footprint
     * and protected area categories for a given area
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
          inferred: 30,
          observed: 40,
        },
        {
          id: 'endemic',
          inferred: 20,
          observed: 25,
        },
        {
          id: 'invasive',
          inferred: 10,
          observed: 20,
        },
        {
          id: 'threatened',
          inferred: 15,
          observed: 20,
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
