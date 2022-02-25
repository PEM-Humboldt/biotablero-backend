module.exports = (db, { coverages }, logger) => ({
  /**
   * Find the area distribution for each coverage type in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @returns {Object[]} Values of area distribution for each coverage type
   * connectivity
   */
  findCoverage: (areaType, areaId, year = 2018) =>
    coverages
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId, year_cover: year })
      .select('area_type', 'area_ha')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

  /**
   * Find the coverage layer according to its type in a given area
   *
   * @param {json} geometry geometry of the selected area
   * @param {String} filename filename which corresponds to the proper layer according to type,
   * options are: 'coverage_2018_N.tif, coverage_2018_S.tif, coverage_2018_T.tif'.
   * @param {Object[]} color color is an array with RGB numbers for color assignment according to
   * the coverage type, options are: N (Natural), S(Secundaria), T(Transformada).
   *
   * @returns {Binary} Image with the geometry
   */
  findCoverageLayer: (geometry, filename, color) =>
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
          '1 '|| ? || ' '|| ? || ' '|| ? || ' 255
          nv 255 255 255 0
          '
        )
      ) as image;
      `,
        [filename, geometry, geometry, ...color],
      )
      .then((rast) => rast.rows[0].image)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),
});
