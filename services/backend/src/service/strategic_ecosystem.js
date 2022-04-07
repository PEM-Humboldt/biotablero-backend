module.exports = (
  sePersistence,
  paramoPersistence,
  tropicalDryForestPersistence,
  wetlandPersistence,
) => ({
  /**
   * Get all strategic ecosystems
   */
  getAll: async () => sePersistence.findAll(),

  /**
   * Get all distinct primary ecosystems
   */
  getPrimary: async () => sePersistence.findAllPrimary(),

  /**
   * Get different strategic ecosystems areas inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   */
  /* getAreasByEA: async (eaId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByEA(eaId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByEA(eaId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByEA(eaId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  }, */

  /**
   * Calculates the area for the given strategic ecosystem type inside the environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {seType} seType strategic ecosystem type
   */
  getSEAreaInEA: async (eaId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const area = await paramoPersistence.findAreaByEA(eaId);
        return area[0];
      }
      case 'Bosque Seco Tropical': {
        const area = await tropicalDryForestPersistence.findAreaByEA(eaId);
        return area[0];
      }
      case 'Humedal': {
        const area = await wetlandPersistence.findAreaByEA(eaId);
        return area[0];
      }
      default:
        return {};
    }
  },

  /**
   * Calculates the area for every coverage type in the given strategic ecosystem type inside the
   * environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {seType} seType strategic ecosystem type
   */
  /* getSECoverageInEA: async (eaId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const areas = await paramoPersistence.findCoverAreasInEA(eaId);
        return areas;
      }
      case 'Bosque Seco Tropical': {
        const areas = await tropicalDryForestPersistence.findCoverAreasInEA(eaId);
        return areas;
      }
      case 'Humedal': {
        const areas = await wetlandPersistence.findCoverAreasInEA(eaId);
        return areas;
      }
      default:
        return [];
    }
  }, */

  /**
   * Get different strategic ecosystems areas inside the given basin subzone
   *
   * @param {String} subzoneId subzone id
   */
  /* getAreasBySubzone: async (subzoneId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaBySubzone(subzoneId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  }, */

  /**
   * Calculates the area for the given strategic ecosystem type inside the given basin subzone
   *
   * @param {String} subzoneId subzone id
   * @param {seType} seType strategic ecosystem type
   */
  getSEAreaInSubzone: async (subzoneId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const area = await paramoPersistence.findAreaBySubzone(subzoneId);
        return area[0];
      }
      case 'Bosque Seco Tropical': {
        const area = await tropicalDryForestPersistence.findAreaBySubzone(subzoneId);
        return area[0];
      }
      case 'Humedal': {
        const area = await wetlandPersistence.findAreaBySubzone(subzoneId);
        return area[0];
      }
      default:
        return {};
    }
  },

  /**
   * Calculates the area for every coverage type in the given strategic ecosystem type inside the
   * given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {seType} seType strategic ecosystem type
   */
  /* getSECoverageInSubzone: async (subzoneId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const areas = await paramoPersistence.findCoverAreasInSubzone(subzoneId);
        return areas;
      }
      case 'Bosque Seco Tropical': {
        const areas = await tropicalDryForestPersistence.findCoverAreasInSubzone(subzoneId);
        return areas;
      }
      case 'Humedal': {
        const areas = await wetlandPersistence.findCoverAreasInSubzone(subzoneId);
        return areas;
      }
      default:
        return {};
    }
  }, */

  /**
   * Calculates the area for every protected area category in the given strategic ecosystem type
   * inside the basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {seType} seType strategic ecosystem type
   */
  getSEPAInSubzone: async (subzoneId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const areas = await paramoPersistence.findPAInSubzone(subzoneId);
        return areas;
      }
      case 'Bosque Seco Tropical': {
        const areas = await tropicalDryForestPersistence.findPAInSubzone(subzoneId);
        return areas;
      }
      case 'Humedal': {
        const areas = await wetlandPersistence.findPAInSubzone(subzoneId);
        return areas;
      }
      default:
        return [];
    }
  },

  /**
   * Get different strategic ecosystems areas inside the given state
   *
   * @param {String} stateId state id
   */
  /* getAreasByState: async (stateId) => {
    const result = [];
    const paramoArea = await paramoPersistence.findAreaByState(stateId);
    result.push({
      ...paramoArea[0],
      type: 'Páramo',
    });
    const dryForestArea = await tropicalDryForestPersistence.findAreaByState(stateId);
    result.push({
      ...dryForestArea[0],
      type: 'Bosque Seco Tropical',
    });
    const wetlandArea = await wetlandPersistence.findAreaByState(stateId);
    result.push({
      ...wetlandArea[0],
      type: 'Humedal',
    });
    return result;
  }, */

  /**
   * Calculates the area for the given strategic ecosystem type inside the given state
   *
   * @param {String} stateId state id
   * @param {seType} seType strategic ecosystem type
   */
  getSEAreaInState: async (stateId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const area = await paramoPersistence.findAreaByState(stateId);
        return area[0];
      }
      case 'Bosque Seco Tropical': {
        const area = await tropicalDryForestPersistence.findAreaByState(stateId);
        return area[0];
      }
      case 'Humedal': {
        const area = await wetlandPersistence.findAreaByState(stateId);
        return area[0];
      }
      default:
        return {};
    }
  },

  /**
   * Calculates the area for every coverage type in the given strategic ecosystem type inside the
   * given state
   *
   * @param {String} stateId state id
   * @param {seType} seType strategic ecosystem type
   */
  /* getSECoverageInState: async (stateId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const areas = await paramoPersistence.findCoverAreasInState(stateId);
        return areas;
      }
      case 'Bosque Seco Tropical': {
        const areas = await tropicalDryForestPersistence.findCoverAreasInState(stateId);
        return areas;
      }
      case 'Humedal': {
        const areas = await wetlandPersistence.findCoverAreasInState(stateId);
        return areas;
      }
      default:
        return {};
    }
  }, */

  /**
   * Calculates the area for every protected area category in the given strategic ecosystem type
   * inside the State
   *
   * @param {String} stateId state id
   * @param {seType} seType strategic ecosystem type
   */
  getSEPAInState: async (stateId, seType) => {
    switch (seType) {
      case 'Páramo': {
        const areas = await paramoPersistence.findPAInState(stateId);
        return areas;
      }
      case 'Bosque Seco Tropical': {
        const areas = await tropicalDryForestPersistence.findPAInState(stateId);
        return areas;
      }
      case 'Humedal': {
        const areas = await wetlandPersistence.findPAInState(stateId);
        return areas;
      }
      default:
        return [];
    }
  },

  /**
   * Get national information for the given ecosystem
   *
   * @param {String} ecosystem ecosystem type to get information
   */
  getEcosystemNatInfo: async (ecosystem) => {
    const countryArea = await paramoPersistence.findCountryTotalArea();
    let national = {};
    switch (ecosystem) {
      case 'Páramo': {
        national = await paramoPersistence.findTotalArea();
        break;
      }
      case 'Humedal': {
        national = await wetlandPersistence.findTotalArea();
        break;
      }
      case 'Bosque Seco Tropical': {
        national = await tropicalDryForestPersistence.findTotalArea();
        break;
      }
      default:
        return {};
    }
    return {
      ...national[0],
      percentage: national[0].area / countryArea[0].area,
      type: ecosystem,
    };
  },

  /**
   * Get coverage information for the given ecosystem
   *
   * @param {String} ecosystem ecosystem type to get information
   */
  getSEByCoverage: async (ecosystem) => {
    let national = {};
    let coverageAreas = [];
    switch (ecosystem) {
      case 'Páramo': {
        national = await paramoPersistence.findTotalArea();
        coverageAreas = await paramoPersistence.findCoverAreas();
        break;
      }
      case 'Humedal': {
        national = await wetlandPersistence.findTotalArea();
        coverageAreas = await wetlandPersistence.findCoverAreas();
        break;
      }
      case 'Bosque Seco Tropical': {
        national = await tropicalDryForestPersistence.findTotalArea();
        coverageAreas = await tropicalDryForestPersistence.findCoverAreas();
        break;
      }
      default:
        return {};
    }
    return coverageAreas.map((area) => ({
      ...area,
      percentage: area.area / national[0].area,
    }));
  },

  /**
   * Get protected areas information for the given ecosystem
   *
   * @param {String} ecosystem ecosystem type to get information
   */
  getSEByPA: async (ecosystem) => {
    let national;
    let protectedAreas;
    switch (ecosystem) {
      case 'Páramo': {
        national = await paramoPersistence.findTotalArea();
        protectedAreas = await paramoPersistence.findProtectedAreas();
        break;
      }
      case 'Humedal': {
        national = await wetlandPersistence.findTotalArea();
        protectedAreas = await wetlandPersistence.findProtectedAreas();
        break;
      }
      case 'Bosque Seco Tropical': {
        national = await tropicalDryForestPersistence.findTotalArea();
        protectedAreas = await tropicalDryForestPersistence.findProtectedAreas();
        break;
      }
      default:
        return {};
    }
    return protectedAreas.map((area) => ({
      ...area,
      percentage: area.area / national[0].area,
    }));
  },

  /**
   * Get an strategic ecosystem HF timeline data inside an environmental authority, state or
   * basin subzone
   * @param {String} geofence identifier for the geofence type: ea, states, subzones
   * @param {String | Number} geofenceId geofence id
   * @param {String} ecosystem ecosystem to get the layer for
   *
   * @return {Object} Object with the desired data
   */
  getSEHFTimelineInGeofence: async (geofence, geofenceId, ecosystem) => {
    switch (ecosystem) {
      case 'Páramo': {
        return paramoPersistence.findSEHFTimeLineInGeofence(geofence, geofenceId);
      }
      case 'Humedal': {
        return wetlandPersistence.findSEHFTimeLineInGeofence(geofence, geofenceId);
      }
      case 'Bosque Seco Tropical': {
        return tropicalDryForestPersistence.findSEHFTimeLineInGeofence(geofence, geofenceId);
      }
      default:
        return {};
    }
  },

  /**
   * Get an strategic ecosystem layer inside an environmental authority, state or basin subzone
   * @param {String} geofence identifier for the geofence type: ea, states, subzones
   * @param {String | Number} geofenceId geofence id
   * @param {String} ecosystem ecosystem to get the layer for
   *
   * @return {Object} Geojson object with the geometry
   */
  getSELayerInGeofence: async (geofence, geofenceId, ecosystem) => {
    switch (ecosystem) {
      case 'Páramo': {
        return paramoPersistence.findLayerInGeofence(geofence, geofenceId);
      }
      case 'Humedal': {
        return wetlandPersistence.findLayerInGeofence(geofence, geofenceId);
      }
      case 'Bosque Seco Tropical': {
        return tropicalDryForestPersistence.findLayerInGeofence(geofence, geofenceId);
      }
      default:
        return {};
    }
  },

  /**
   * Get the national layer divided by strategic ecosystem
   */
  getNationalLayer: async () => ({
    type: 'FeatureCollection',
    totalFeatures: 1,
    features: [
      {
        type: 'Feature',
        id: 'jurisdicciones_low.1',
        geometry: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [-79.2778, 16.1152],
                [-79.2778, 16.0708],
                [-79.1453, 16.0708],
                [-78.7959, 16.0708],
                [-78.4306, 16.0708],
                [-78.4306, 15.8955],
                [-78.4306, 15.8004],
                [-78.4306, 15.6],
                [-78.6333, 15.6],
                [-78.6333, 15.157],
                [-78.6333, 15.0745],
                [-78.6333, 14.4936],
                [-78.5079, 14.3945],
                [-78.3917, 14.3027],
                [-78.325, 14.25],
                [-78.1835, 14.2142],
                [-78.0993, 14.1929],
                [-78.0029, 14.1766],
                [-77.9995, 13.3204],
                [-77.9995, 12.505],
                [-78.4612, 12.5],
                [-78.5845, 12.5],
                [-78.7648, 12.5],
                [-79, 12.5],
                [-79, 11.8333],
                [-79.147, 11.8333],
                [-80, 11.8333],
                [-80, 11.6654],
                [-80, 11],
                [-81.25, 11],
                [-81.495, 10.8127],
                [-82.2333, 10.8167],
                [-82.2282, 10.9958],
                [-82, 11],
                [-82, 11.7839],
                [-82, 11.8623],
                [-82, 12.0079],
                [-82, 12.0848],
                [-82, 12.2916],
                [-82, 13.0684],
                [-82, 13.3869],
                [-82, 13.7062],
                [-82, 14.0296],
                [-82, 14.7551],
                [-82, 14.9856],
                [-81.5817, 14.9856],
                [-81.5424, 14.9856],
                [-81.2188, 14.9856],
                [-80.985, 14.9856],
                [-80.4713, 14.9856],
                [-79.9471, 14.9856],
                [-79.9333, 14.9856],
                [-79.9333, 15.1837],
                [-79.9333, 15.5028],
                [-79.9615, 15.5591],
                [-80.0336, 15.7034],
                [-80.0653, 15.7667],
                [-80.0674, 15.7877],
                [-80.0668, 15.8094],
                [-80.0654, 15.8219],
                [-80.061, 15.8436],
                [-80.0507, 15.8733],
                [-80.0419, 15.891],
                [-80.026, 15.9151],
                [-80.0089, 15.9346],
                [-79.9906, 15.9508],
                [-79.9637, 15.9685],
                [-79.9444, 15.9778],
                [-79.8422, 16.0708],
                [-79.596, 16.0708],
                [-79.4889, 16.0708],
                [-79.4889, 16.1694],
                [-79.2778, 16.1694],
                [-79.2778, 16.1152],
              ],
            ],
          ],
        },
        geometry_name: 'the_geom',
        properties: {
          AREA: 180336000000,
          IDCAR: 'CORALINA',
          NOMCAR:
            'Corporacion para el Desarrollo Sostenible del Archipielago de San Andres, Providencia y Santa Catalina',
        },
      },
    ],
    crs: {
      type: 'name',
      properties: {
        name: 'urn:ogc:def:crs:EPSG::4326',
      },
    },
  }),
});
