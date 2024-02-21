const RestifyErrors = require('restify-errors');

module.exports = (db, { coverages }, logger) => {
  const coveragePersistence = {
    /**
     * Find the area distribution for each coverage type in a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Values of area distribution for each coverage type
     */
    findCoverage: (areaType, areaId, year = 2018) =>
      coverages
        .query()
        .select('area_type', 'area_ha')
        .where({ geofence_type: areaType, geofence_id: areaId, year_cover: year })
        .orderBy('area_type')
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),

    /**
     * Get the raster corresponding to the desired area
     *
     * @param {json} geometry geometry of the selected area
     * @param {String} filename filename which corresponds to the proper layer according to type,
     * options are: 'coverage_2018_N.tif, coverage_2018_S.tif, coverage_2018_T.tif'.
     *
     * @returns {Promise<String>} raster data
     */
    clipRaster: (geometry, filename) =>
      db
        .raw(
          `SELECT ST_Clip(
            (SELECT ST_union(rast)
              FROM geo_raster
              WHERE filename = ?
              AND ST_Intersects(rast, ST_GeomFromGeoJSON(?))
            ),
            ST_GeomFromGeoJSON(?),
            TRUE
          ) as clip
          `,
          [filename, geometry, geometry],
        )
        .then((res) => res.rows[0].clip)
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),

    /**
     * Check if a raster is full of nodata values
     *
     * @param {Strin} clip raster to check
     *
     * @returns {Promise<Boolean>} Whether the raster is empty or not
     */
    isRasterEmpty: (clip) =>
      db
        .raw(`SELECT ST_BandIsNoData(?) as isempty`, [clip])
        .then((res) => res.rows[0].isempty)
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
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
    findCoverageLayer: async (geometry, filename, color) => {
      const clip = await coveragePersistence.clipRaster(geometry, filename);
      const isEmpty = await coveragePersistence.isRasterEmpty(clip);
      if (isEmpty) {
        throw new RestifyErrors.NotFoundError('No layer for this area');
      }

      return db
        .raw(
          `SELECT ST_AsPNG(
            ST_ColorMap(
              ?,
              '1 '|| ? || ' '|| ? || ' '|| ? || ' 255
              0 255 255 255 0'
            )
          ) as image
          `,
          [clip, ...color],
        )
        .then((rast) => rast.rows[0].image)
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        });
    },
  };
  return coveragePersistence;
};
