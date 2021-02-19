const binaryProtected = require('../tmp/binary_protected.json');

module.exports = (SCIHFPersistence) => {
  const SCIHF = {
    /**
     * Get the Forest Structural Condition Index for a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @returns {Object[]} Values of Forest Structural Condition Index
     */
    getSCIHF: async (areaType, areaId) => {
      let data;
      switch (areaType) {
        case 'ea':
          data = await SCIHFPersistence.findSCIHFInEA(areaId);
          break;
        case 'states':
          data = await SCIHFPersistence.findSCIHFInState(areaId);
          break;
        case 'basinSubzone':
          data = await SCIHFPersistence.findSCIHFInBasinSubzone(areaId);
          break;
        case 'pa':
          data = await SCIHFPersistence.findSCIHFInPA(areaId);
          break;
        default: data = [];
      }

      const binaryProtectedValues = [...new Set(data.map(b => (b.binary_protected)))].join('&');
      // TODO: Call endpoint in service Backend
      return data.map((item) => {
        const { label } = binaryProtected.find(
          bp => bp.binary_protected === item.binary_protected,
        );
        return {
          hf_pers: item.hf_pers,
          sci_cat: item.sci_cat,
          label,
          area: item.area,
        };
      });
    },
  };

  return SCIHF;
};
