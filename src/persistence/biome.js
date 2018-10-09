module.exports = (bookshelfConn) => {
  const { knex } = bookshelfConn;

  return {
    /**
     * Select biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @returns {Object} GeoJson Object with biomes as features from a FeatureCollection
     */
    findBiomeByEA: (envAuthority) => {
      // Rudimentary verification since we are using a raw query
      if (envAuthority.split(' ').join('') !== envAuthority) {
        const error = new Error(`'${envAuthority}' is an invalid environmental authority`);
        error.code = 400;
        throw error;
      }
      // 2.66
      return knex.raw(
        `SELECT jsonb_build_object(
          'type', 'Feature',
          'gid', gid,
          'geometry', ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, 0.001))::jsonb,
          'properties', to_jsonb(row) - 'gid' - 'geom'
        ) as json_object
        FROM (SELECT * FROM geo_ea_biomes) row
        WHERE id_ea = '${envAuthority}';`,
      )
        .then(biomes => ({
          type: 'FeatureCollection',
          totalFeatures: biomes.rowCount,
          features: biomes.rows.map(f => f.json_object),
        }));

      // 2.9
      // return knex.raw(
      //   `SELECT row_to_json(fc)
      //   FROM (
      //     SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
      //     FROM(
      //       SELECT 'Feature' as type,
      //         row_to_json(geo2) As properties,
      //         st_asgeojson(ST_SimplifyPreserveTopology(geom,0.001))::json as geometry
      //       FROM geo_ea_biomes as geo1
      //       inner join(select gid,name_biome  from geo_ea_biomes) as geo2 on geo2.gid=geo1.gid
      //       WHERE geo1.id_ea='${envAuthority}'
      //     ) as f
      //   ) as fc`,
      // )
      //   .then(biomes => biomes.rows[0].row_to_json);
    },
  };
};
