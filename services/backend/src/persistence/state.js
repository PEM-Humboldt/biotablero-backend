const config = require('config');

module.exports = (db, { geoStates, colombiaCoverageDetails, geoHFPersistence, geoHF }) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all states id and name
     */
    findAll: () =>
      geoStates.query().select('geofence_id as id', 'geofence_name as name').orderBy('name'),

    /**
     * Get the total area for the given state
     *
     * @param {String} stateId state id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaByState: (stateId, year = 2012) =>
      colombiaCoverageDetails
        .query()
        .where({ id_state: stateId, year_cover: year })
        .sum('area_ha as area'),

    /**
     * Find the current area distribution for each human footprint category in the
     * given state
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Array of areas by human footprint category
     */
    findAreaByHFCategory: async (stateId, year = 2018) =>
      geoHF
        .query()
        .where({ id_state: stateId, hf_year: year })
        .groupBy('hf_cat')
        .sum('area_ha as area')
        .select('hf_cat as key')
        .orderBy('key'),

    /**
     * Find the the current value of human footprint in the given state
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object} Object of current human footprint value.
     */
    findCurrentHFValue: async (stateId, year = 2018) =>
      geoHF
        .query()
        .where({ id_state: stateId, hf_year: year })
        .whereNot({ hf_avg: -9999 })
        .avg('hf_avg as CurrentHFValue'),

    /**
     * Find the the persistence of human footprint areas in the given state
     * @param {Number} stateId state id
     *
     * @returns {Object[]} Array of persistence values.
     */
    findHFPersistenceAreas: async (stateId) =>
      geoHFPersistence
        .query()
        .where({ id_state: stateId })
        .groupBy('hf_pers')
        .sum('area_ha as area')
        .select('hf_pers as key')
        .orderBy('key'),

    /**
     * Find the human footprint value through time in the given state
     * @param {Number} stateId state id
     *
     * @returns {Object} Object of HF values through time
     */
    findTotalHFTimeLine: async (stateId) =>
      geoHF
        .query()
        .select('hf_year as year')
        .avg('hf_avg as avg')
        .where({ id_state: stateId })
        .whereNot({ hf_avg: -9999 })
        .groupBy('year')
        .orderBy('year'),

    /**
     * Get GeoJson layer with states at national level
     */
    findNationalLayer: () =>
      db
        .raw(
          `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(s2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_states as s1
            INNER JOIN (
              SELECT gid, geofence_id, geofence_name, area_ha
              FROM geo_states
            ) as s2 ON s1.gid = s2.gid
          ) as f
        ) as fc
        `,
          geometriesConfig.tolerance,
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the geometry for a given state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerById: (stateId) =>
      db
        .raw(
          `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(s2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?), 9, 2)::json as geometry
            FROM geo_states as s1
            INNER JOIN (
              SELECT gid as id, geofence_name as key
              FROM geo_states
            ) as s2 ON s1.gid = s2.id
            WHERE s1.geofence_id = ?
          ) as f
        ) as fc
        `,
          [geometriesConfig.tolerance_heavy, stateId],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the current human footprint layer divided by categories in a given state
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFCategoriesLayerById: (stateId, year = 2018) =>
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
                hf_cat AS key
              FROM geo_hf
              WHERE id_state = ?
                AND hf_year = ?
              GROUP BY key
              ) AS geo
              INNER JOIN (
                SELECT
                  hf_cat AS key,
                  sum(area_ha) AS area
                FROM geo_hf
                WHERE id_state = ?
                  AND hf_year = ?
                GROUP BY key
              ) AS prop
              ON geo.key = prop.key
          ) as f
        ) as fc;
        `,
          [stateId, year, stateId, year],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the persistence human footprint layer divided by categories in a given
     * state
     * @param {Number} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFPersistenceLayerById: (stateId) =>
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
                  hf_pers AS key
                FROM geo_hf_persistence
                WHERE id_state = ?
                GROUP BY key
                ) AS geo
                INNER JOIN (
                  SELECT
                    hf_pers AS key,
                    sum(area_ha) AS area
                  FROM geo_hf_persistence
                  WHERE id_state = ?
                  GROUP BY key
                ) AS prop
                ON geo.key = prop.key
            ) as f
          ) as fc;
        `,
          [stateId, stateId],
        )
        .then((layers) => layers.rows[0].collection),
  };
};
