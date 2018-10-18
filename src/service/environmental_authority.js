module.exports = eaPersistence => ({
  /**
   * Get total area grouped by compensation factor for a given environmental authority
   *
   * @param {String} envAuthorityId environmental authority id
   *
   * @returns {Object[]} total area for each compensation factor
   */
  getAreaByCF: async (envAuthorityId) => {
    const areas = await eaPersistence.findAreaByCF(envAuthorityId);
    const groupedAreas = {};
    areas.forEach((area) => {
      const fc = parseFloat(area.fc_valor);
      const fcDiff = fc - parseInt(fc, 10);
      let key = fc;
      if (fcDiff !== 0 && fcDiff !== 0.5) key = fc + 0.25;
      if (!groupedAreas[key]) groupedAreas[key] = 0;
      groupedAreas[key] += parseFloat(area.sum);
    });

    return Object.keys(groupedAreas).sort().map(fc => ({ key: fc, area: groupedAreas[fc] }));
  },
});
