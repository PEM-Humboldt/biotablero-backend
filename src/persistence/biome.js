const config = require('config');

module.exports = (
  db,
  { geoBiomes: geoBiomesMod },
  { projectImpactedBiomes: projectImpactedBiomesColl },
) => {
  const geometriesConfig = config.geometries;

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

      return db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(geo_biomes2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance}))::json as geometry
            FROM geo_ea_biomes as geo_biomes1
            INNER JOIN (SELECT gid, name_biome FROM geo_ea_biomes) as geo_biomes2 on geo_biomes2.gid = geo_biomes1.gid
            WHERE geo_biomes1.id_ea='${envAuthority}'
          ) as f
        ) as fc`,
      )
        .then(biomes => biomes.rows[0].collection);
    },

    /**
     * Bulk create a set of project impacted biomes
     *
     * @param {Object[]} biomes project impacted biomes to create
     *
     * @returns {Object[]} created objects with id
     */
    bulkCreateProjectImpacted: biomes => projectImpactedBiomesColl.forge(biomes).invokeThen('save'),

    /**
     * Find all biomes
     *
     * @returns {Object[]} biomes in the database
     */
    findAll: () => (
      geoBiomesMod.fetchAll()
        .then(biomes => biomes.toJSON())
    ),
  };
};
