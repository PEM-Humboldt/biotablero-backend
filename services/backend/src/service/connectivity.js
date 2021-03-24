const connectivityPACurrent = require('../tmp/connectivity_pa_current.json');
const connectivityDPC = require('../tmp/connectivity_pa_dpc.json');
const connectivityPALayers = require('../tmp/connectivity_pa_layers.json');
const connectivityPALayersAll = require('../tmp/connectivity_pa_layers_all.json');
const connectivityPATimelineProt = require('../tmp/connectivity_pa_timeline_prot.json');
const connectivityPATimelineProtConn = require('../tmp/connectivity_pa_timeline_prot_conn.json');
const connectivityPACurrentDryForest = require('../tmp/connectivity_pa_se_dry_forest.json');
const connectivityPACurrentParamo = require('../tmp/connectivity_pa_se_paramo.json');
const connectivityPACurrentWetland = require('../tmp/connectivity_pa_se_wetland.json');
const connectivityPALayerDryForest = require('../tmp/connectivity_pa_se_layer_dry_forest.json');
const connectivityPALayerParamo = require('../tmp/connectivity_pa_se_layer_paramo.json');
const connectivityPALayerWetland = require('../tmp/connectivity_pa_se_layer_wetland.json');

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
     * Get the layers of the protected areas with higher dPC value in a given area. If paNumber
     * is not provided, all layers are returned
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {Number} paNumber number of protected area layers to return
     *
     * @returns {Object} Geojson object with the geometry
     */
    getPAConnectivityLayers: async (areaType, areaId, paNumber) => {
      if (paNumber === 'undefined' || paNumber <= 0) {
        return connectivityPALayersAll;
      }
      return connectivityPALayers;
    },

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
      let data;
      switch (category) {
        case 'prot':
          data = connectivityPATimelineProt;
          break;
        case 'prot_conn':
          data = connectivityPATimelineProtConn;
          break;
        default:
          data = null;
          break;
      }

      if (!data) {
        throw new Error(
          'Data of timeline pa connectivity for selected area doesn\'t exists',
        );
      }

      return data;
    },

    /**
     * Get the area distribution for each category of protected area connectivity for an specific
     * strategic ecosystem in a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {String} seType seType strategic ecosystem type
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

    /**
     * Get the layer of a strategic ecosystem in a given area
     *
     * @param {String | Number} areaType area type
     * @param {String} areaId area id
     * @param {String} seType seType strategic ecosystem type
     *
     * @returns {Object} Geojson object with the geometry
     */
    getSELayer: async (areaType, areaId, seType) => {
      let data;
      switch (seType) {
        case 'Páramo':
          data = connectivityPALayerParamo;
          break;
        case 'Bosque Seco Tropical':
          data = connectivityPALayerDryForest;
          break;
        case 'Humedal':
          data = connectivityPALayerWetland;
          break;
        default:
          data = null;
          break;
      }

      if (!data) {
        throw new Error(
          'Data for SE Layer doesn\'t exists in the selected area id, area type and seType',
        );
      }

      return data;
    },
  };

  return connectivity;
};
