module.exports = (bookshelfConn, { GeoEABiome }) => {
  const { knex } = bookshelfConn;

  return {
    /**
     * Select biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @return {Array} JSON Objects
     */
    findBiomeByEA: envAuthority => (
      knex.raw(`SELECT jsonb_build_object(
        'type', 'Feature',
        'gid', gid,
        'geometry', ST_AsGeoJSON(ST_Simplify(geom, 0.01, true))::jsonb,
        'properties', to_jsonb(row) - 'gid' - 'geom'
      ) as json_object
      FROM (SELECT * FROM geo_ea_biomes) row
      WHERE id_ea = '${envAuthority}';`)
        .then(biomes => ({
          type: 'FeatureCollection',
          totalFeatures: biomes.rowCount,
          features: biomes.rows.map(f => f.json_object),
        }))
    ),
  };
};
