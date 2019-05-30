const config = require('config');

module.exports = (db, { geoStates, colombiaCoverages }) => {
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
      colombiaCoverages.query()
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
      db('colombia_coverages')
        .innerJoin('geo_protected_areas', 'colombia_coverages.id_protected_area', 'geo_protected_areas.gid')
        .where({ 'colombia_coverages.id_state': stateId, 'colombia_coverages.year_cover': year })
        .groupBy('geo_protected_areas.category')
        .select(db.raw('coalesce(SUM(colombia_coverages.area_ha), 0) as area'), 'geo_protected_areas.category as type')
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
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance}))::json as geometry
            FROM geo_states as s1
            INNER JOIN (
              SELECT gid, id_country, id_state, name, area_ha
              FROM geo_states
            ) as s2 ON s1.gid = s2.gid
          ) as f
        ) as fc`,
      )
        .then(layers => layers.rows[0].collection)
    ),
  };
};
