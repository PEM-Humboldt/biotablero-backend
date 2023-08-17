const RestifyErrors = require('restify-errors');
const { areaTypeDBKeys, dpcDBKeys, dpcCategoriesDBKeys } = require('../util/appropriate_keys');

module.exports = (
  db,
  { connectivity, geoConnParamo, geoConnTropicalDryForest, geoConnWetland },
  logger,
) => ({
  /**
   * Find the area distribution for each category of protected area connectivity in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object[]} Values of area distribution for each category of protected area
   * connectivity
   */
  findCurrentPAConnectivity: (areaType, areaId, year = 2020) =>
    connectivity
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId, prot_year: year })
      .select('protconn', 'protunconn', 'unprotected', 'area_ha')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the values of connectivity for the protected areas with higher dPC value in a
   * given area. If paNumber is not provided, all protected areas are returned
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} paNumber number of protected areas to return
   *
   * @returns {Object[]} Values of connectivity for the protected areas with higher dPC value
   * in a given area
   */
  findPADPC: (areaType, areaId, paNumber) =>
    db('connectivity_dpc as dpc')
      .select(
        'pa.pa_id as id',
        'pa.name as name',
        `dpc.${dpcCategoriesDBKeys(areaType)} as key`,
        'pa.area_ha as area',
      )
      .avg(`dpc.${dpcDBKeys(areaType)} as value`)
      .where(areaTypeDBKeys(areaType), areaId)
      .leftJoin('geo_protected_areas as pa', 'dpc.id_pa', 'pa.pa_id')
      .groupBy(
        'dpc.id_pa',
        `dpc.${dpcCategoriesDBKeys(areaType)}`,
        'pa.name',
        'pa.area_ha',
        'pa.pa_id',
      )
      .orderBy('value', 'desc')
      .modify((queryBuilder) => {
        if (paNumber) {
          queryBuilder.limit(paNumber);
        }
      })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the values through time of protected area connectivity index in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Values through time of protected area connectivity index in a given area
   *
   */
  findTimelinePAConnectivityProt: (areaType, areaId) =>
    connectivity
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId })
      .select('prot', 'prot_year')
      .orderBy('prot_year', 'asc')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the values through time of protected connected area connectivity index in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Values through time of protected connected area connectivity index in
   * a given area
   *
   */
  findTimelinePAConnectivityProtConn: (areaType, areaId) =>
    connectivity
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId })
      .select('protconn', 'prot_year')
      .orderBy('prot_year', 'asc')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area distribution for each category of protected area connectivity in Paramo
   * strategic ecosystem
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object[]} Values of the area distribution for each category of protected area
   * connectivity
   */
  findCurrentPAConnectivityInParamo: (areaType, areaId, year = 2020) =>
    geoConnParamo
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId, prot_year: year })
      .select('protconn', 'protunconn', 'unprotected', 'area_ha')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area distribution for each category of protected area connectivity in
   * Tropical Dry Forest strategic ecosystem
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object[]} Values of the area distribution for each category of protected area
   * connectivity
   */
  findCurrentPAConnectivityInDryForest: (areaType, areaId, year = 2020) =>
    geoConnTropicalDryForest
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId, prot_year: year })
      .select('protconn', 'protunconn', 'unprotected', 'area_ha')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area distribution for each category of protected area connectivity in Wetland
   * strategic ecosystem
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} Values of the area distribution for each category of protected area
   * connectivity
   */
  findCurrentPAConnectivityInWetland: (areaType, areaId, year = 2020) =>
    geoConnWetland
      .query()
      .where({ geofence_type: areaType, geofence_id: areaId, prot_year: year })
      .select('protconn', 'protunconn', 'unprotected', 'area_ha')
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layers of the protected areas with higher dPC value in a given area. If paNumber
   * is not provided, all layers are returned
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} paNumber number of protected area layers to return
   *
   * @returns {Object} Geojson object with the geometry
   */
  findPAConnectivityLayers: (areaType, areaId, paNumber) =>
    db
      .raw(
        `
      SELECT row_to_json(fc) AS collection
      FROM (
        SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
        FROM (
          SELECT
            'Feature' AS TYPE,
            row_to_json(prop) AS properties,
            ST_AsGeoJSON(geom)::json AS geometry
          FROM (
            SELECT
              ST_Collect(geom) AS geom,
              pa_id AS id
            FROM geo_protected_areas
            GROUP BY id
            ) AS geo
            INNER JOIN (
              SELECT
                dpc.id_pa AS id,
                gpa.name AS name,
                dpc.${dpcCategoriesDBKeys(areaType)} AS dpc_cat,
                avg(dpc.${dpcDBKeys(areaType)}) AS value,
                gpa.area_ha AS area
              FROM connectivity_dpc dpc
              INNER JOIN geo_protected_areas gpa ON gpa.pa_id = dpc.id_pa
              WHERE ${areaTypeDBKeys(areaType)} = ?
              GROUP BY id_pa, dpc_cat, gpa.name, area
              ORDER BY value DESC
              LIMIT ?
            ) AS prop
            ON geo.id = prop.id
            ORDER BY value DESC
        ) as f
      ) as fc;
      `,
        [areaId, paNumber],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of Paramo strategic ecosystem in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object} Geojson object with the geometry
   */
  findSELayerInParamo: (areaType, areaId, year = 2020) =>
    db
      .raw(
        `
      SELECT row_to_json(fc) AS collection
      FROM (
        SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
        FROM (
          SELECT
          'Feature' AS TYPE,
          ST_AsGeoJSON(geom)::json AS geometry
        FROM (
          SELECT
            ST_Collect(geom) AS geom,
            gid AS key
          FROM geo_conn_paramo
          WHERE geofence_type = ?
            AND geofence_id = ?
            AND prot_year = ?
          GROUP BY key
          ) AS geo
        ) as f
      ) as fc;
    `,
        [areaType, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of Tropical Dry Forest strategic ecosystem in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object} Geojson object with the geometry
   */
  findSELayerInDryForest: (areaType, areaId, year = 2020) =>
    db
      .raw(
        `
      SELECT row_to_json(fc) AS collection
      FROM (
        SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
        FROM (
          SELECT
          'Feature' AS TYPE,
          ST_AsGeoJSON(geom)::json AS geometry
        FROM (
          SELECT
            ST_Collect(geom) AS geom,
            gid AS key
          FROM geo_conn_tropical_dry_forest
          WHERE geofence_type = ?
            AND geofence_id = ?
            AND prot_year = ?
          GROUP BY key
          ) AS geo
        ) as f
      ) as fc;
    `,
        [areaType, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of Wetland strategic ecosystem in a given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {Number} year optional year to filter data, 2020 by default
   *
   * @returns {Object} Geojson object with the geometry
   */
  findSELayerInWetland: (areaType, areaId, year = 2020) =>
    db
      .raw(
        `
      SELECT row_to_json(fc) AS collection
      FROM (
        SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
        FROM (
          SELECT
          'Feature' AS TYPE,
          ST_AsGeoJSON(geom)::json AS geometry
        FROM (
          SELECT
            ST_Collect(geom) AS geom,
            gid AS key
          FROM geo_conn_wetland
          WHERE geofence_type = ?
            AND geofence_id = ?
            AND prot_year = ?
          GROUP BY key
          ) AS geo
        ) as f
      ) as fc;
    `,
        [areaType, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),
});
