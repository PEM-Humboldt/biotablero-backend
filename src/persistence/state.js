const config = require('config');

module.exports = (
  db,
  {
    geoStates,
    colombiaCoverageDetails,
    geoHFPersistence,
    geoHF,
  },
) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all states id and name
     */
    findAll: () => (
      geoStates.query()
        .select('id_state as id', 'name')
    ),

    /**
     * Get the total area for the given state
     *
     * @param {String} stateId state id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaByState: (stateId, year = 2012) => (
      colombiaCoverageDetails.query()
        .where({ id_state: stateId, year_cover: year })
        .sum('area_ha as area')
    ),

    /**
     * Get the protected area distribution inside the given state
     *
     * @param {String} stateId state id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByPA: async (stateId, year = 2012) => (
      db('colombia_coverage_details as ccd')
        .innerJoin('global_binary_protected_areas as gbpa', 'ccd.binary_protected', 'gbpa.binary_protected')
        .where({ 'ccd.id_state': stateId, 'ccd.year_cover': year })
        .groupBy('gbpa.label', 'gbpa.binary_protected')
        .orderBy('gbpa.binary_protected', 'desc')
        .select(db.raw('coalesce(SUM(ccd.area_ha), 0) as area'), 'gbpa.label as type', 'gbpa.binary_protected as bp')
    ),

    /**
     * Get the coverage area distribution inside the given state
     *
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByCoverage: async (stateId, year = 2012) => (
      colombiaCoverageDetails.query()
        .where({ id_state: stateId, year_cover: year })
        .groupBy('area_type')
        .sum('area_ha as area')
        .select('area_type as type')
        .orderBy('type')
    ),

    /**
     * Find the current area distribution for each human footprint category in the
     * given state
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Array of areas by human footprint category
     */
    findAreaByHFCategory: async (stateId, year = 2018) => (
      geoHF.query()
        .where({ id_state: stateId, hf_year: year })
        .groupBy('hf_cat')
        .sum('area_ha as area')
        .select('hf_cat as key')
        .orderBy('key')
    ),

    /**
     * Find the the current value of human footprint in the given state
     * @param {Number} stateId state id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object} Object of current human footprint value.
     */
    findCurrentHFValue: async (stateId, year = 2018) => (
      geoHF.query()
        .where({ id_state: stateId, hf_year: year })
        .whereNot({ hf_avg: -9999 })
        .avg('hf_avg as CurrentHFValue')
    ),

    /**
     * Find the the persistence of human footprint areas in the given state
     * @param {Number} stateId state id
     *
     * @returns {Object[]} Array of persistence values.
     */
    findHFPersistenceAreas: async stateId => (
      geoHFPersistence.query()
        .where({ id_state: stateId })
        .groupBy('hf_pers')
        .sum('area_ha as area')
        .select('hf_pers as key')
        .orderBy('key')
    ),

    /**
     * Get GeoJson layer with states at national level
     */
    findNationalLayer: () => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(s2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_states as s1
            INNER JOIN (
              SELECT gid, id_country, id_state, name, area_ha
              FROM geo_states
            ) as s2 ON s1.gid = s2.gid
          ) as f
        ) as fc`,
        geometriesConfig.tolerance,
      )
        .then(layers => layers.rows[0].collection)
    ),

    /**
     * Get the geometry for a given state
     * @param {String} stateId state id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerById: stateId => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(s2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_states as s1
            INNER JOIN (
              SELECT gid as id, name as key
              FROM geo_states
            ) as s2 ON s1.gid = s2.id
            WHERE s1.id_state = ?
          ) as f
        ) as fc`,
        [geometriesConfig.tolerance_heavy, stateId],
      )
        .then(layers => layers.rows[0].collection)
    ),
  };
};
