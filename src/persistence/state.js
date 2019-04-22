const config = require('config');

module.exports = (db, { geoStates }) => {
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
     */
    getTotalAreaByState: stateId => (
      geoStates.query()
        .where('id_state', stateId)
        .select('area_ha as area')
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
