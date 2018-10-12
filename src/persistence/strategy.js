const config = require('config');

module.exports = (
  db,
  { geoCompensationStrategies2018 },
) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Generate a GeoJson object with strategies as features. Filtered by biome,
     * sub-basin and environmental authority
     *
     * @param {Number} biomeId biome id
     * @param {Number} subzoneId sub-basin id
     * @param {Srting} envAuthorityId environmental authority id
     *
     * @returns {Object} GeoJson Object with strategies as geometries from a GeometryCollection
     */
    findGeoByBiomeSubzoneEA: (biomeId, subzoneId, envAuthorityId) => {
      // Rudimentary verification since we are using a raw query
      if (envAuthorityId.split(' ').join('') !== envAuthorityId) {
        const error = new Error(`'${envAuthorityId}' is an invalid environmental authority`);
        error.code = 400;
        throw error;
      }

      return db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(strategies2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance}))::json as geometry
            FROM geo_compensation_strategies_2018 as strategies1
            INNER JOIN (
              SELECT gid, area_ha, area_status, st.strategy
              FROM geo_compensation_strategies_2018 as geo_st
              INNER JOIN strategies as st ON st.id_strategy = geo_st.id_strategy
            ) as strategies2 on strategies2.gid = strategies1.gid
            WHERE strategies1.id_biome = ${biomeId}
            AND strategies1.id_subzone = ${subzoneId}
            AND strategies1.id_ea = '${envAuthorityId}'
          ) as f
        ) as fc`,
      )
        .then(strategies => strategies.rows[0].collection);
    },

    /**
     * Select strategies by biome, sub-basin and environmental authority
     *
     * @param {Number} biomeId biome id
     * @param {Number} subzoneId sub-basin id
     * @param {Srting} envAuthorityId environmental authority id
     *
     * @returns {Object} GeoJson Object with strategies as geometries from a GeometryCollection
     */
    findByBiomeSubzoneEA: (biomeId, subzoneId, envAuthorityId) => (
      geoCompensationStrategies2018
        .where({ id_biome: biomeId, id_subzone: subzoneId, id_ea: envAuthorityId })
        .fetchAll({
          columns: ['gid', 'area_ha', 'id_strategy'],
          withRelated: [{ strategy: qb => qb.column('id_strategy', 'strategy') }],
        })
        .then(results => results.toJSON())
    ),
  };
};
