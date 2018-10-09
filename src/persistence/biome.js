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
      return knex.raw(
        `SELECT jsonb_build_object(
          'type', 'Feature',
          'gid', gid,
          'geometry', ST_AsGeoJSON(ST_Simplify(geom, 0.0015, true))::jsonb,
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
    },
  };
};
