module.exports = (db, logger) => ({
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
