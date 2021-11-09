const { areaTypeKeys } = require('../util/appropriate_keys');

module.exports = (db, logger) => ({
  /**
   * Find richness species gaps values in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Gaps values.
   */
  findGaps: async (areaType, areaId) => {
    try {
      const regionIdQuery = db('richness_gaps')
        .select('id_region')
        .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId });

      const thresholds = await db('richness_gaps as rg')
        .min({ min_threshold: 'gaps_min' })
        .max({ max_threshold: 'gaps_max' })
        .where({ geofence_type: areaTypeKeys(areaType), id_region: regionIdQuery });

      const values = await db('richness_gaps as rg')
        .select(
          db.raw(`'gaps' as id`),
          'rg.gaps_min as min',
          'rg.gaps_mean as avg',
          'rg.gaps_max as max',
          'rgr.gaps_min as min_region',
          'rgr.gaps_max as max_region',
          'rgr.region_name',
        )
        .innerJoin('richness_gaps_regions as rgr', 'rg.id_region', 'rgr.id_region')
        .where({ 'rg.geofence_type': areaTypeKeys(areaType), 'rg.geofence_id': areaId });
      return [{ ...thresholds[0], ...values[0] }];
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Find the layer for gaps section in the given area
   *
   * @param {json} geometry geometry of the selected area
   * @param {String} filename filename which corrensponds to the proper layer, options are:
   * 'GAPS_INDICE_GSI_2020.tif'.
   *
   * @returns {Binary} Image with the geometry
   */
  findGapsLayer: (geometry, filename) =>
    db
      .raw(
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
          '100% 236 94 65 180
          50% 235 166 42 180
          0% 32 128 162 180
          nv 32 128 162 180
          '
        )
      ) as image;
      `,
        [filename, geometry, geometry],
      )
      .then((rast) => rast.rows[0].image)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

  /**
   * Find the min and max value of the layer for gaps section in the given area
   *
   * @param {json} geometry geometry of the selected area
   * @param {String} filename filename which corrensponds to the proper layer, options are:
   * 'GAPS_INDICE_GSI_2020.tif'.
   *
   * @returns {Object} Object with min and max value
   */
  findGapsLayerThresholds: (geometry, filename) =>
    db
      .raw(
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
      .then((rast) => rast.rows[0])
      .catch(),
});
