module.exports = (SCIHFPersistence, restAPI) => {
  const SCIHF = {
    /**
     * Get values for the forest structural condition index crossed with human footprint
     * and protected area categories for a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @returns {Object[]} Values of Forest Structural Condition Index crossed with human footprint
     * and protected area categories
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
        case 'pa': {
          const binaryProtected = await restAPI.requestBinaryProtectedByCategory(areaId);
          data = await SCIHFPersistence.findSCIHFInPA(binaryProtected.binary_protected);
          break;
        }
        default:
          data = null;
          break;
      }

      if (!data) {
        throw new Error('Data for SCIHF doesn\'t exists in the selected area id and area type');
      }

      try {
        const binaryProtectedValues = [
          ...new Set(data.map(b => (b.binary_protected))),
        ].join(';');
        const categoriesPA = await restAPI.requestCategoriesByBinaryProtected(
          binaryProtectedValues,
        );

        return data.map((item) => {
          const { label } = categoriesPA.find(bp => bp.binary_protected === item.binary_protected);
          return {
            hf_pers: item.hf_pers,
            sci_cat: item.sci_cat,
            pa: label,
            area: item.area,
          };
        });
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving SCIHF data',
        };
        throw error;
      }
    },

    /**
     * Get the layer of the forest structural condition index crossed with human footprint
     * for a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @returns {Object} Geojson object with the geometry
     */
    getSCIHFLayer: async (areaType, areaId) => {
      let data;
      switch (areaType) {
        case 'ea':
          data = await SCIHFPersistence.findSCIHFLayerInEA(areaId);
          break;
        case 'states':
          data = await SCIHFPersistence.findSCIHFLayerInState(areaId);
          break;
        case 'basinSubzone':
          data = await SCIHFPersistence.findSCIHFLayerInBasinSubzone(areaId);
          break;
        case 'pa': {
          const binaryProtected = await restAPI.requestBinaryProtectedByCategory(areaId);
          data = await SCIHFPersistence.findSCIHFLayerInPA(binaryProtected.binary_protected);
          break;
        }
        default:
          data = null;
          break;
      }

      if (!data) {
        throw new Error('Data layer for SCIHF doesn\'t exists in the selected area id and area type');
      }

      return data;
    },

    /**
     * Get the layer of one combination of forest structural condition index category and a human
     * footprint persistence category, divided by protected areas for a given area
     *
     * @param {String} sciCat sci category
     * @param {String} hfPers human footprint persistence category
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @returns {Object} Geojson object with the geometry
     */
    getSCIHFPALayer: async (sciCat, hfPers, areaType, areaId) => {
      let data;
      switch (areaType) {
        case 'ea':
          data = await SCIHFPersistence.findSCIHFPALayerInEA(areaId, sciCat, hfPers);
          break;
        case 'states':
          data = await SCIHFPersistence.findSCIHFPALayerInState(areaId, sciCat, hfPers);
          break;
        case 'basinSubzone':
          data = await SCIHFPersistence.findSCIHFPALayerInBasinSubzone(areaId, sciCat, hfPers);
          break;
        case 'pa': {
          const binaryProtected = await restAPI.requestBinaryProtectedByCategory(areaId);
          data = await SCIHFPersistence.findSCIHFPALayerInPA(
            binaryProtected.binary_protected,
            sciCat,
            hfPers,
          );
          break;
        }
        default:
          data = null;
          break;
      }

      if (!data || !data.features) {
        throw new Error('Data layer for SCIHF PA doesn\'t exists in the selected area id and area type');
      }

      try {
        const binaryProtectedValues = [
          ...new Set(data.features.map(b => (b.properties.binary_protected))),
        ].join(';');
        const categoriesPA = await restAPI.requestCategoriesByBinaryProtected(
          binaryProtectedValues,
        );

        return data.features.map((item) => {
          const { label } = categoriesPA.find(
            bp => bp.binary_protected === item.properties.binary_protected,
          );
          return {
            ...item,
            properties: {
              pa_label: label,
            },
          };
        });
      } catch (e) {
        const error = {
          code: 500,
          stack: e.stack,
          message: 'Error retrieving SCIHFPA layer',
        };
        throw error;
      }
    },
  };

  return SCIHF;
};
