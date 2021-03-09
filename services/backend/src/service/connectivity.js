const connectivityPACurrent = require('../tmp/connectivity_pa_current.json');
const connectivityDPC = require('../tmp/connectivity_pa_dpc.json');
const connectivityPALayers = require('../tmp/connectivity_pa_layers.json');

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
  };

  return connectivity;
};
