const { areaTypeKeys } = require('../util/appropriate_keys');

module.exports = (
  db,
  {
    richnessNos,
  },
  logger,
) => ({
  /**
   * Find the values for the total number of species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of total inferred and observed species.
   */
  findTotalNumberOfSpecies: async (areaType, areaId) => {
    try {
      return db('richness_nos as rn')
        .select(
          db.raw('coalesce(rn.total_inf, 0) as inferred'),
          db.raw('coalesce(rn.total_obs, 0) as observed'),
          db.raw('coalesce(rnr.total_obs, 0) as region_observed'),
          db.raw('coalesce(rnr.total_inf, 0) as region_inferred'),
        )
        .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
        .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Get the thresholds for the total number of species in a given area type
   *
   * @param {String} areaType area type.
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findThresholdsTotalNumberOfSpecies: async (areaType, areaId) => {
    try {
      return richnessNos.query()
        .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId })
        .min(
          {
            min_inferred: 'total_inf',
            min_observed: 'total_obs',
          },
        )
        .max(
          {
            max_inferred: 'total_inf',
            max_observed: 'total_obs',
          },
        );
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Find the values for the number of endemic species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed endemic species.
   */
  findEndemicNumberOfSpecies: async (areaType, areaId) => {
    try {
      return db('richness_nos as rn')
        .select(
          db.raw('coalesce(rn.end_inf, 0) as inferred'),
          db.raw('coalesce(rn.end_obs, 0) as observed'),
          db.raw('coalesce(rnr.end_obs, 0) as region_observed'),
          db.raw('coalesce(rnr.end_inf, 0) as region_inferred'),
        )
        .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
        .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Get the thresholds for the number of endemic species in a given area type
   *
   * @param {String} areaType area type.
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findThresholdsEndemicNumberOfSpecies: async (areaType, areaId) => {
    try {
      return richnessNos.query()
        .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId })
        .min(
          {
            min_inferred: 'end_inf',
            min_observed: 'end_obs',
          },
        )
        .max(
          {
            max_inferred: 'end_inf',
            max_observed: 'end_obs',
          },
        );
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Find the values for the number of invasive species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed invasive species.
   */
  findInvasiveNumberOfSpecies: async (areaType, areaId) => {
    try {
      return db('richness_nos as rn')
        .select(
          db.raw('coalesce(rn.inv_inf, 0) as inferred'),
          db.raw('coalesce(rn.inv_obs, 0) as observed'),
          db.raw('coalesce(rnr.inv_obs, 0) as region_observed'),
          db.raw('coalesce(rnr.inv_inf, 0) as region_inferred'),
        )
        .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
        .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Get the thresholds for the number of invasive species in a given area type
   *
   * @param {String} areaType area type.
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findThresholdsInvasiveNumberOfSpecies: async (areaType, areaId) => {
    try {
      return richnessNos.query()
        .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId })
        .min(
          {
            min_inferred: 'inv_inf',
            min_observed: 'inv_obs',
          },
        )
        .max(
          {
            max_inferred: 'inv_inf',
            max_observed: 'inv_obs',
          },
        );
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Find the values for the number of threatened species in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed threatened species.
   */
  findThreatenedNumberOfSpecies: async (areaType, areaId) => {
    try {
      return db('richness_nos as rn')
        .select(
          db.raw('coalesce(rn.thr_inf, 0) as inferred'),
          db.raw('coalesce(rn.thr_obs, 0) as observed'),
          db.raw('coalesce(rnr.thr_obs, 0) as region_observed'),
          db.raw('coalesce(rnr.thr_inf, 0) as region_inferred'),
        )
        .leftJoin('richness_nos_regions as rnr', 'rn.id_region', 'rnr.id_region')
        .where({ 'rn.geofence_type': areaTypeKeys(areaType), 'rn.geofence_id': areaId });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

  /**
   * Get the thresholds for the number of threatened species in a given area
   *
   * @param {String} areaType area type.
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Number of inferred and observed species for the desired group.
   */
  findThresholdsThreatenedNumberOfSpecies: async (areaType, areaId) => {
    try {
      return richnessNos.query()
        .where({ geofence_type: areaTypeKeys(areaType), geofence_id: areaId })
        .min(
          {
            min_inferred: 'thr_inf',
            min_observed: 'thr_obs',
          },
        )
        .max(
          {
            max_inferred: 'thr_inf',
            max_observed: 'thr_obs',
          },
        );
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
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
});
