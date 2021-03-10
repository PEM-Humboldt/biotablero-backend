const connectivityPACurrent = require('../tmp/connectivity_pa_current.json');
const connectivityDPC = require('../tmp/connectivity_pa_dpc.json');
const connectivityPALayers = require('../tmp/connectivity_pa_layers.json');
const connectivityPACurrentDryForest = require('../tmp/connectivity_pa_se_dry_forest.json');
const connectivityPACurrentParamo = require('../tmp/connectivity_pa_se_paramo.json');
const connectivityPACurrentWetland = require('../tmp/connectivity_pa_se_wetland.json');

module.exports = () => {
  const connectivity = {
    /**
     * Get the area distribution for each category of protected area connectivity in a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     *
     * @returns {Object[]} Values of area distribution for each category of protected area
     * connectivity
     */
    getCurrentPAConnectivity: async () => connectivityPACurrent,

    /**
     * Get the values of connectivity for the protected areas with higher dPC value in a
     * given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {Number} paNumber number of protected areas to return
     *
     * @returns {Object[]} Values of connectivity for the 5 protected areas with higher dPC value
     * in a given area
     */
    getPADPC: async () => connectivityDPC,

    /**
     * Get the layers of the protected areas with higher dPC value in a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {Number} paNumber number of protected area layers to return
     *
     * @returns {Object} Geojson object with the geometry
     */
    getPAConnectivityLayers: async () => connectivityPALayers,

    /**
     * Get the area distribution for each category of protected area connectivity for an specific
     * strategic ecosystem in a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {String} seType number of protected area layers to return
     *
     * @returns {Object[]} Values of the area distribution for each category of protected area
     * connectivity
     */
    getCurrentPAConnectivityBySE: async (areaType, areaId, seType) => {
      let data;
      switch (seType) {
        case 'Páramo':
          data = connectivityPACurrentParamo;
          break;
        case 'Bosque Seco Tropical':
          data = connectivityPACurrentDryForest;
          break;
        case 'Humedal':
          data = connectivityPACurrentWetland;
          break;
        default:
          data = null;
          break;
      }

      if (!data) {
        throw new Error(
          'Data for pa connectivity by SE doesn\'t exists in the selected area id, area type and seType',
        );
      }

      return data;
    },
  };

  return connectivity;
};
