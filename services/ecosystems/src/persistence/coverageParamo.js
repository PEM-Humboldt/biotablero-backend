module.exports = (db, { coverageParamo }, logger) => ({
  /**
   * Find the area distribution for each coverage type in SE Paramo in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @returns {Object[]} Values of area distribution for each coverage type
   */
  findCoverageSEParamo: (areaType, areaId, year = 2018) =>
    coverageParamo
      .query()
      .select('area_type', 'area_ha')
      .where({ geofence_type: areaType, geofence_id: areaId, year })
      .orderBy('area_type')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),
  
  /**
   * Find the area of paramo in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @returns {Object[]} Value of area of paramo
   */
   findCoverageSEParamoAreas: (areaType, areaId, year = 2018) =>
   coverageParamo
     .query()
     .sum('area_ha as area')
     .where({ geofence_type: areaType, geofence_id: areaId, year })
     .catch((e) => {
       logger.error(e.stack || e.Error || e.message || e);
       throw new Error('Error getting data');
     }),
});
