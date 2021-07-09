const { areaTypeKeys } = require('../util/appropriate_keys');

module.exports = (
  db,
  {
    richnessNos,
    richnessNosRegions,
  },
  logger,
) => ({
  /**
   * Find the layer for the number of species in the given area of the given group
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
   * 'invasive', 'threatened'.
   *
   * @returns {Binary} Image with the geometry
   */
  getAreaLayer: (geometry, filename) => (
    db.raw(
      `
      SELECT ST_AsPNG(
        ST_ColorMap(
          ST_Clip(
            (SELECT ST_union(rast)
              FROM geo_raster
              WHERE filename = ?
              AND ST_Intersects(rast, ST_GeomFromGeoJSON(?))
            ),
            ST_GeomFromGeoJSON(?),
            TRUE
          ),
          '100% 251 38 0 200
          0% 255 246 0 200
          nv 0 0 0 0
          '
        )
      ) as image;
      `,
      [filename, geometry, geometry],
    )
      .then(rast => rast.rows[0].image)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      })
  ),

  /**
   * Find the min and max value of the layer for the number of species in the given area
   * of the given group
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
   * 'invasive', 'threatened'.
   *
   * @returns {Object} Object with min and max value
   */
  getAreaLayerThresholds: (geometry, filename) => (
    db.raw(
      `
      SELECT (stats).min as min, (stats).max as max
      FROM (
        SELECT
          ST_SummaryStats(
            ST_Clip(
              (
                SELECT ST_union(rast)
                FROM geo_raster
                WHERE filename = ?
                AND ST_Intersects(rast, ST_GeomFromGeoJSON(?))
              ),
              ST_GeomFromGeoJSON(?),
              TRUE
            )
          ) as stats
        ) as thresholds;
      `,
      [filename, geometry, geometry],
    )
      .then(rast => rast.rows[0])
      .catch()
  ),

  /**
     * Get values for the number of species in the given area of the given group
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} group group to filter data (default to all), options are: 'all', 'total',
     * 'endemic', 'invasive', 'threatened'.
     *
     * @returns {Object[]} Number of inferred and observed species for the desired group.
     */
  findNumberOfSpecies: async (areaType, areaId) => {
    try {
      return db('richness_nos as rn')
      // .left join richness_nos_regions rnr on rn.id_region = rnr.id_region
        .select(
          'rn.total_inf as rn_total_inf',
          'rn.total_obs as rn_total_obs',
          'rnr.total_obs as rnr_total_obs',
          'rnr.total_inf as rnr_total_inf',
          'rn.end_inf as rn_end_inf',
          'rn.end_obs as rn_end_obs',
          'rnr.end_obs as rnr_end_obs',
          'rnr.end_inf as rnr_end_inf',
          'rn.inv_inf as rn_inv_inf',
          'rn.inv_obs as rn_inv_obs',
          'rnr.inv_obs as rnr_inv_obs',
          'rnr.inv_inf as rnr_inv_inf',
          'rn.thr_inf as rn_thr_inf',
          'rn.thr_obs as rn_thr_obs',
          'rnr.thr_obs as rnr_thr_obs',
          'rnr.thr_inf as rnr_thr_inf',
        )
        .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
        .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

});
