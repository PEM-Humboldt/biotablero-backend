const RestifyErrors = require('restify-errors');

module.exports = (db, { forestLP }, logger) => {
  const ForestLPPersistence = {
    /**
     * Find the forest loss and persistence data for a given period and a given area
     *
     * @param {String} areaType area type
     * @param {String | Number} areaId area id
     * @param {String} period period
     *
     * @returns {Object[]} Array with forest loss and persistence values
     */
    findForestLP: (areaType, areaId, period) =>
      forestLP
        .query()
        .select('area_ha as area', 'category as key')
        .where({ geofence_type: areaType, geofence_id: areaId, year: period })
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),

    /**
     * Find the forest loss and persistence layer according to the category and period
     * in a given area
     *
     * @param {json} geometry geometry of the selected area
     * @param {String} filename filename which corresponds to the proper layer according to the
     * forest lp category and period. options are: loss_2000-2005.tif, loss_2006-2010.tif,
     * loss_2010-2015.tif, loss_2016-2021.tif, no_forest_2000-2005.tif, no_forest_2006-2010.tif,
     * no_forest_2011-2015.tif, no_forest_2016-2021.tif, persistence_2000-2005.tif,
     * persistence_2006-2010.tif, persistence_2010-2015.tif, persistence_2016-2021.tif
     * @param {Object[]} color color is an array with RGB numbers for color assignment according to
     * the forest LP category, options are: persistencia, perdida and no_bosque
     * @returns {Binary} Image with the geometry
     */
    findForestLPLayer: async (geometry, filename, color) => {
      const clip = await ForestLPPersistence.clipRaster(geometry, filename);
      const isEmpty = await ForestLPPersistence.isRasterEmpty(clip);
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

    /**
     * Get the raster corresponding to the desired area
     *
     * @param {json} geometry geometry of the selected area
     * @param {String} filename filename which corresponds to the proper layer
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
  };
  return ForestLPPersistence;
};
