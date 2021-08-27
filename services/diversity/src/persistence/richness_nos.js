const { areaTypeKeys, observedGroupKey, inferredGroupKey } = require('../util/appropriate_keys');

module.exports = (db, { richnessNos }, logger) => ({
  /**
   * Find the values for the total number of species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of total inferred and observed species.
   */
  findTotalNumberOfSpecies: (areaType, areaId) =>
    db('richness_nos as rn')
      .select(
        db.raw('coalesce(rn.total_inf, 0) as inferred'),
        db.raw('coalesce(rn.total_obs, 0) as observed'),
        db.raw('coalesce(rnr.total_obs, 0) as region_observed'),
        db.raw('coalesce(rnr.total_inf, 0) as region_inferred'),
      )
      .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
      .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

  /**
   * Find the values for the number of endemic species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed endemic species.
   */
  findEndemicNumberOfSpecies: (areaType, areaId) =>
    db('richness_nos as rn')
      .select(
        db.raw('coalesce(rn.end_inf, 0) as inferred'),
        db.raw('coalesce(rn.end_obs, 0) as observed'),
        db.raw('coalesce(rnr.end_obs, 0) as region_observed'),
        db.raw('coalesce(rnr.end_inf, 0) as region_inferred'),
      )
      .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
      .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

  /**
   * Find the values for the number of invasive species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed invasive species.
   */
  findInvasiveNumberOfSpecies: (areaType, areaId) =>
    db('richness_nos as rn')
      .select(
        db.raw('coalesce(rn.inv_inf, 0) as inferred'),
        db.raw('coalesce(rn.inv_obs, 0) as observed'),
        db.raw('coalesce(rnr.inv_obs, 0) as region_observed'),
        db.raw('coalesce(rnr.inv_inf, 0) as region_inferred'),
      )
      .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
      .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

  /**
   * Find the values for the number of threatened species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed threatened species.
   */
  findThreatenedNumberOfSpecies: (areaType, areaId) =>
    db('richness_nos as rn')
      .select(
        db.raw('coalesce(rn.thr_inf, 0) as inferred'),
        db.raw('coalesce(rn.thr_obs, 0) as observed'),
        db.raw('coalesce(rnr.thr_obs, 0) as region_observed'),
        db.raw('coalesce(rnr.thr_inf, 0) as region_inferred'),
      )
      .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
      .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new Error('Error getting data');
      }),

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
      throw new Error('Error getting data');
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
        throw new Error('Error getting data');
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
      throw new Error('Error getting data');
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
        throw new Error('Error getting data');
      });
  },

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
  getAreaLayer: (geometry, filename) =>
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
          '100% 0 125 143 180
          0% 255 181 108 180
          nv 0 0 0 0
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
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
   * 'invasive', 'threatened'.
   *
   * @returns {Object} Object with min and max value
   */
  getAreaLayerThresholds: (geometry, filename) =>
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
