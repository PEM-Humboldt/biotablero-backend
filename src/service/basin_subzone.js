module.exports = (basinSubzonePersistence, seService) => ({
  /**
   * Get a list with states information
   */
  getAll: async () => basinSubzonePersistence.findAll(),

  /**
   * Get subzone total area divided by strategic ecosystem type
   */
  getAreaBySE: async (subzoneId) => {
    let subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
    if (subzoneArea.length === 0) {
      throw new Error('basin subzone doesn\'t exists');
    }
    subzoneArea = subzoneArea[0].area;
    const areas = await seService.getAreasBySubzone(subzoneId);
    let totalSE = 0;
    const result = areas.map((se) => {
      totalSE += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / subzoneArea,
      };
    });
    result.unshift({
      area: totalSE,
      percentage: totalSE / subzoneArea,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get information about an strategic ecosystem in a basin subzone. Includes:
   * - percentage of the given strategic ecosystem respect the national area
   *
   * @param {String} subzoneId basin subzone id
   * @param {String} seType strategic ecosystem type
   */
  getSEDetails: async (subzoneId, seType) => {
    // create another function if this one gets too much unnecessary information
    const seNationalArea = await seService.getEcosystemNatInfo(seType);
    const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
    return {
      national_percentage: seArea.area / seNationalArea.area,
    };
  },

  /**
   * Get coverage areas in an strategic ecosystem in a basin subzone
   *
   * @param {String} subzoneId subzone id
   * @param {String} seType strategic ecosystem type
   */
  getCoverageInSE: async (subzoneId, seType) => {
    const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
    const coverAreas = await seService.getSECoverageInSubzone(subzoneId, seType);
    return coverAreas.map(area => ({
      ...area,
      percentage: area.area / seArea.area,
    }));
  },

  /**
   * Get protected area distribution in an strategic ecosystem in a basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {String} seType strategic ecosystem type
   */
  getPAInSE: async (subzoneId, seType) => {
    const seArea = await seService.getSEAreaInSubzone(subzoneId, seType);
    const paAreas = await seService.getSEPAInSubzone(subzoneId, seType);
    let nonProtected = seArea.area;
    const result = paAreas.map((area) => {
      nonProtected -= parseFloat(area.area);
      return {
        ...area,
        percentage: area.area / seArea.area,
      };
    });
    if (result.length !== 0) {
      result.push({
        area: nonProtected,
        percentage: nonProtected / seArea.area,
        type: 'No Protegida',
      });
    }
    return result;
  },

  /**
   * Get subzone total area divided by protected area type
   *
   * @param {String} subzoneId basin subzone id
   *
   * @returns {Object[]} list of protected areas + 2 elements: total protected area (and percentage)
   * and non protected area (and percentage)
   */
  getAreaByPA: async (subzoneId) => {
    let subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
    if (subzoneArea[0].area === null) {
      throw new Error('basin subzone doesn\'t exists');
    }
    subzoneArea = subzoneArea[0].area;
    const areas = await basinSubzonePersistence.findAreaByPA(subzoneId);
    let nonProtected = subzoneArea;
    let totalProtected = 0;
    const result = areas.map((se) => {
      nonProtected -= parseFloat(se.area);
      totalProtected += parseFloat(se.area);
      return {
        ...se,
        percentage: se.area / subzoneArea,
      };
    });
    result.unshift({
      area: totalProtected,
      percentage: totalProtected / subzoneArea,
      type: 'Total',
    });
    result.push({
      area: nonProtected,
      percentage: nonProtected / subzoneArea,
      type: 'No Protegida',
    });
    return result;
  },

  /**
   * Get subzone total area divided by protected area type
   *
   * @param {String} subzoneId basin subzone id
   *
   * @returns {Object[]} list of protected areas + 1 element: total area in the basin subzone
   */
  getAreaByCoverage: async (subzoneId) => {
    let subzoneArea = await basinSubzonePersistence.getTotalAreaBySubzone(subzoneId);
    if (subzoneArea[0].area === null) {
      throw new Error('basin subzone doesn\'t exists');
    }
    subzoneArea = subzoneArea[0].area;
    const areas = await basinSubzonePersistence.findAreaByCoverage(subzoneId);
    const result = areas.map(cover => ({
      ...cover,
      percentage: cover.area / subzoneArea,
    }));
    result.unshift({
      area: subzoneArea,
      percentage: 1,
      type: 'Total',
    });
    return result;
  },

  /**
   * Get the national layer divided by basin subzones
   */
  getNationalLayer: async () => basinSubzonePersistence.findNationalLayer(),
});
