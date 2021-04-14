const { areaTypeDBKeys, dpcDBKeys, dpcCategoriesDBKeys } = require('../util/appropriate_keys');

module.exports = (
  db,
  { connectivity },
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
  findCurrentPAConnectivity: async (areaType, areaId, year = 2020) => {
    try {
      return connectivity.query()
        .where({ geofence_type: areaType, geofence_id: areaId, prot_year: year })
        .select('unprotected', 'protconn', 'protunconn', 'area_ha');
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

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
  findPADPC: async (areaType, areaId, paNumber) => {
    try {
      return db('connectivity_dpc as dpc')
        .select(
          'pa.name as id',
          `dpc.${dpcCategoriesDBKeys(areaType)} as key`,
          'pa.area_ha as area',
        )
        .avg(`dpc.${dpcDBKeys(areaType)} as value`)
        .where(areaTypeDBKeys(areaType), areaId)
        .leftJoin('geo_protected_areas as pa', 'dpc.id_pa', 'pa.pa_id')
        .groupBy('dpc.id_pa', `dpc.${dpcCategoriesDBKeys(areaType)}`, 'pa.name', 'pa.area_ha')
        .orderBy('value', 'desc')
        .modify((queryBuilder) => {
          if (paNumber) {
            queryBuilder.limit(paNumber);
          }
        });
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      throw new Error('Error getting data');
    }
  },

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
  findPAConnectivityLayers: (areaType, areaId, paNumber) => (
    db.raw(
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
              pa_id AS id_pa
            FROM geo_protected_areas
            GROUP BY id_pa
            ) AS geo
            INNER JOIN (
              SELECT
                dpc.id_pa AS id_pa,
                gpa.name AS key,
                dpc.${dpcCategoriesDBKeys(areaType)} AS dpc_cat,
                avg(dpc.${dpcDBKeys(areaType)}) AS value,
                gpa.area_ha AS area
              FROM connectivity_dpc dpc
              INNER JOIN geo_protected_areas gpa ON gpa.pa_id = dpc.id_pa
              WHERE ${areaTypeDBKeys(areaType)} = ?
              GROUP BY id_pa, dpc_cat, key, area
              ORDER BY value DESC
              LIMIT ?
            ) AS prop
            ON geo.id_pa = prop.id_pa
            ORDER BY value DESC
        ) as f
      ) as fc;
      `,
      [areaId, paNumber],
    )
      .then(layers => layers.rows[0].collection)
  ),
});
