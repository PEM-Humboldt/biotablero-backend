const {
  areaTypeKeys,
  paConnCategoriesKeys,
} = require('../util/appropriate_keys');

module.exports = (connectivityPersistence) => {
  const connectivity = {
    /**
     * Get the area distribution for each category of protected area connectivity in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     *
     * @returns {Object[]} Values of area distribution for each category of protected area
     * connectivity
     */
    getCurrentPAConnectivity: async (areaType, areaId) => {
      const rawData = await connectivityPersistence.findCurrentPAConnectivity(
        areaTypeKeys(areaType), areaId,
      );

      const paConnDataInArea = rawData[0] ? rawData[0] : null;
      if (!paConnDataInArea) {
        throw new Error(
          'Data for Current PA Connectivity doesn\'t exists in the selected area id and area type',
        );
      }

      const totalArea = Number(paConnDataInArea.area_ha);
      delete paConnDataInArea.area_ha;
      return Object.keys(paConnDataInArea).map(key => (
        {
          key: paConnCategoriesKeys(key),
          area: Number(totalArea) * Number(paConnDataInArea[key]) / 100,
          percentage: Number(paConnDataInArea[key]),
        }
      ));
    },

    /**
     * Get the values of connectivity for the protected areas with higher dPC value in a
     * given area. If paNumber is not provided, all protected areas are returned
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {Number} paNumber number of protected areas to return
     *
     * @returns {Object[]} Values of connectivity for the protected areas with higher dPC value
     * in a given area
     */
    getPADPC: (areaType, areaId, paNumber) => (
      connectivityPersistence.findPADPC(areaType, areaId, paNumber)
    ),

    /**
     * Get the layers of the protected areas with higher dPC value in a given area. If paNumber
     * is not provided, all layers are returned
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {Number} paNumber number of protected area layers to return
     *
     * @returns {Object} Geojson object with the geometry
     */
    getPAConnectivityLayers: (areaType, areaId, paNumber) => (
      connectivityPersistence.findPAConnectivityLayers(areaType, areaId, paNumber)
    ),

    /**
     * Get the values through time of a protected area connectivity category in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} category category of the connectivity index
     *
     * @returns {Object} Values through time of a protected area connectivity category
     *
     */
    getTimelinePAConnectivity: async (areaType, areaId, category) => {
      let values;
      switch (category) {
        case 'prot':
          values = await connectivityPersistence.findTimelinePAConnectivityProt(
            areaTypeKeys(areaType), areaId,
          );
          return {
            key: 'prot',
            data: values.map(value => ({
              x: String(value.prot_year),
              y: Number(value.prot),
            })),
          };
        case 'prot_conn':
          values = await connectivityPersistence.findTimelinePAConnectivityProtConn(
            areaTypeKeys(areaType), areaId,
          );
          return {
            key: 'prot_conn',
            data: values.map(value => ({
              x: String(value.prot_year),
              y: Number(value.protconn),
            })),
          };
        default:
          return null;
      }
    },

    /**
     * Get the area distribution for each category of protected area connectivity for an specific
     * strategic ecosystem in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} seType seType strategic ecosystem type
     *
     * @returns {Object[]} Values of the area distribution for each category of protected area
     * connectivity
     */
    getCurrentPAConnectivityBySE: async (areaType, areaId, seType) => {
      let rawData;
      let paConnDataInSE;
      let totalArea;
      switch (seType) {
        case 'Páramo':
          rawData = await connectivityPersistence.findCurrentPAConnectivityInParamo(
            areaTypeKeys(areaType), areaId,
          );
          paConnDataInSE = rawData[0] ? rawData[0] : null;
          if (!paConnDataInSE) {
            throw new Error(
              'Data for Current PA Connectivity In Paramo doesn\'t exists in the selected area id and area type',
            );
          }
          totalArea = Number(paConnDataInSE.area_ha);
          delete paConnDataInSE.area_ha;
          return Object.keys(paConnDataInSE).map(key => (
            {
              key: paConnCategoriesKeys(key),
              area: Number(totalArea) * Number(paConnDataInSE[key]) / 100,
              percentage: Number(paConnDataInSE[key]),
            }
          ));
        case 'Bosque Seco Tropical':
          rawData = await connectivityPersistence.findCurrentPAConnectivityInDryForest(
            areaTypeKeys(areaType), areaId,
          );
          paConnDataInSE = rawData[0] ? rawData[0] : null;
          if (!paConnDataInSE) {
            throw new Error(
              'Data for Current PA Connectivity In Tropical Dry Forest doesn\'t exists in the selected area id and area type',
            );
          }
          totalArea = Number(paConnDataInSE.area_ha);
          delete paConnDataInSE.area_ha;
          return Object.keys(paConnDataInSE).map(key => (
            {
              key: paConnCategoriesKeys(key),
              area: Number(totalArea) * Number(paConnDataInSE[key]) / 100,
              percentage: Number(paConnDataInSE[key]),
            }
          ));
        case 'Humedal':
          rawData = await connectivityPersistence.findCurrentPAConnectivityInWetland(
            areaTypeKeys(areaType), areaId,
          );
          paConnDataInSE = rawData[0] ? rawData[0] : null;
          if (!paConnDataInSE) {
            throw new Error(
              'Data for Current PA Connectivity In Wetland doesn\'t exists in the selected area id and area type',
            );
          }
          totalArea = Number(paConnDataInSE.area_ha);
          delete paConnDataInSE.area_ha;
          return Object.keys(paConnDataInSE).map(key => (
            {
              key: paConnCategoriesKeys(key),
              area: Number(totalArea) * Number(paConnDataInSE[key]) / 100,
              percentage: Number(paConnDataInSE[key]),
            }
          ));
        default:
          throw new Error(
            'Data for PA Connectivity By SE doesn\'t exists in the selected area id, area type and seType',
          );
      }
    },

    /**
     * Get the layer of a strategic ecosystem in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} seType seType strategic ecosystem type
     *
     * @returns {Object} Geojson object with the geometry
     */
    getSELayer: async (areaType, areaId, seType) => {
      switch (seType) {
        case 'Páramo':
          return connectivityPersistence.findSELayerInParamo(
            areaTypeKeys(areaType), areaId,
          );
        case 'Bosque Seco Tropical':
          return connectivityPersistence.findSELayerInDryForest(
            areaTypeKeys(areaType), areaId,
          );
        case 'Humedal':
          return connectivityPersistence.findSELayerInWetland(
            areaTypeKeys(areaType), areaId,
          );
        default:
          throw new Error(
            'Data for SE Layer doesn\'t exists in the selected area id, area type and seType',
          );
      }
    },
  };

  return connectivity;
};
