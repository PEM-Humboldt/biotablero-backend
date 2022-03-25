module.exports = (db, { coverageDryForest }, logger) => ({
  /**
   * Find the area distribution for each coverage type in SE Dry Forest in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @returns {Object[]} Values of area distribution for each coverage type
   */
  findCoverageSEDryForest: (areaType, areaId, year = 2018) =>
    coverageDryForest
      .query()
      .select('area_type', 'area_ha')
      .where({ geofence_type: areaType, geofence_id: areaId, year })
      .orderBy('area_type')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),
});
