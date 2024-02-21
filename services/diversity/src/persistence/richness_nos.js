const RestifyErrors = require('restify-errors');

const { areaTypeKeys, observedGroupKey, inferredGroupKey } = require('../util/appropriate_keys');

module.exports = (db, { richnessNos }, logger) => ({
  /**
   * Find number of species values in the given area and group
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {String} group group to filter data (default to all), options are: 'all', 'total',
   * 'endemic', 'invasive', 'threatened'.
   *
   * @returns {Object[]} Number of total inferred and observed species.
   */
  findNumberOfSpecies: (areaType, areaId, group) => {
    const obsColumn = observedGroupKey(group);
    const infColumn = inferredGroupKey(group);

    if (obsColumn === null || infColumn === null) {
      logger.error(`Undefined group ${group} in database`);
      throw new RestifyErrors.InternalServerError('Error getting data');
    }

    return db('richness_nos as rn')
      .select(
        db.raw(`coalesce(rn.${infColumn}, 0) as inferred`),
        db.raw(`coalesce(rn.${obsColumn}, 0) as observed`),
        db.raw(`coalesce(rnr.${obsColumn}, 0) as region_observed`),
        db.raw(`coalesce(rnr.${infColumn}, 0) as region_inferred`),
        'rnr.region_name',
      )
      .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
      .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      });
  },

  /**
   * Get the thresholds for the number of species in a given area and group
   *
   * @param {String} areaType area type.
   * @param {String | Number} areaId area id
   * @param {String} group group to filter data (default to all), options are: 'all', 'total',
   * 'endemic', 'invasive', 'threatened'.
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findThresholds: (areaType, areaId, group) => {
    const obsColumn = observedGroupKey(group);
    const infColumn = inferredGroupKey(group);

    if (obsColumn === null || infColumn === null) {
      logger.error(`Undefined group ${group} in database`);
      throw new RestifyErrors.InternalServerError('Error getting data');
    }

    const regionIdQuery = db('richness_nos as rn')
      .select('id_region')
      .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId });

    return richnessNos
      .query()
      .whereIn('id_region', regionIdQuery)
      .andWhere({ geofence_type: areaTypeKeys(areaType) })
      .min({
        min_inferred: infColumn,
        min_observed: obsColumn,
      })
      .max({
        max_inferred: infColumn,
        max_observed: obsColumn,
      })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      });
  },

  /**
   * Get the national max value for the number of species in a given area and group
   *
   * @param {String} areaType area type.
   * @param {String} group group to filter data (default to all), options are: 'all', 'total',
   * 'endemic', 'invasive', 'threatened'.
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findNationalMax: (areaType, group) => {
    const obsColumn = observedGroupKey(group);
    const infColumn = inferredGroupKey(group);

    if (obsColumn === null || infColumn === null) {
      logger.error(`Undefined group ${group} in database`);
      throw new RestifyErrors.InternalServerError('Error getting data');
    }

    return richnessNos
      .query()
      .where({ geofence_type: areaTypeKeys(areaType) })
      .max({
        max_inferred: infColumn,
        max_observed: obsColumn,
      })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      });
  },

  /**
   * Find the layer for the number of species in the given area of the given group
   *
   * @param {json} geometry geometry of the selected area
   * @param {String} filename filename which corresponds to the proper layer according to group,
   * options are: 'total_inf.tif', 'end_inf.tif', 'inv_inf.tif', 'thr_inf.tif'.
   *
   * @returns {Binary} Image with the geometry
   */
  findNOSLayer: (geometry, filename) =>
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
          '100% 0 125 143 255
          0% 255 181 108 255
          nv 255 181 108 255
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
   * Find the min and max value of the layer for the number of species in the given area
   * of the given group
   *
   * @param {json} geometry geometry of the selected area
   * @param {String} filename filename which corrensponds to the proper layer according to group,
   * options are: 'total_inf.tif', 'end_inf.tif', 'inv_inf.tif', 'thr_inf.tif'.
   *
   * @returns {Object} Object with min and max value
   */
  findNOSLayerThresholds: (geometry, filename) =>
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
