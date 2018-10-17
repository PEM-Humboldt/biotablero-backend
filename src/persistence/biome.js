const config = require('config');

module.exports = (
  db,
  { geoBiomes: geoBiomesMod, projectImpactedBiomes: projectImpactedBiomesMod },
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
            INNER JOIN (SELECT gid, name_biome FROM geo_ea_biomes) as geo_biomes2 ON geo_biomes2.gid = geo_biomes1.gid
            WHERE geo_biomes1.id_ea = '${envAuthority}'
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

    /**
     * Find impacted biomes related with a given project, including sub-basin and environmental
     *  authority information
     *
     * @param {Number} projectId project id to filter by
     *
     * @returns {Object[]} Array of impacted biomes info related with the project
     */
    findProjectImpactedWithSzhEa: projectId => (
      db.raw(
        `SELECT DISTINCT(c.nom_szh, c.id_car) as remove, gb.id_biome, gb.name as biome_name, ea.name as ea_name, ha.id_subzone, c.nom_szh, c.id_car as id_ea
        FROM project_impacted_biomes as pib
        INNER JOIN geo_biomes as gb ON pib.id_biome = gb.id_biome
        INNER JOIN compensaciones2017carszhmun as c ON c.bioma_iavh = gb.name
        LEFT JOIN hidro_areas AS ha ON ha.name_subzone = c.nom_szh
        LEFT JOIN environmental_authorities as ea ON c.id_car = ea.id_ea
        WHERE pib.id_project = ${projectId}`,
      )
        .then(({ rows }) => rows.map(({ remove, ...rest }) => rest))
    ),

    /**
     * Find impacted biomes related with a given project (no relations, only biomes)
     *
     * @param {Number} projectId project id to filter by
     *
     * @returns {Object[]} Array of impacted biomes info related with the project
     */
    findProjectImpacted: projectId => (
      projectImpactedBiomesMod
        .where('id_project', projectId)
        .fetchAll({
          columns: ['id', 'id_project', 'natural_area_ha', 'secondary_area_ha', 'transformed_area_ha',
            'area_impacted_ha', 'area_to_compensate_ha', 'id_biome'],
          withRelated: [{ biome: qb => qb.column('id_biome', 'name', 'compensation_factor') }],
        })
        .then(results => results.toJSON())
    ),

    /**
     * Select impacted biomes with their geometry, filtered by a list of ids.
     *
     * @param {Number[]} biomeIds array of ids to select biomes
     *
     * @returns {Object} GeoJson Object with impacted biomes as features from a FeatureCollection
     */
    findGeoProjectImpacted: biomeIds => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(geo_biomes2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance_heavy}))::json as geometry
            FROM geo_biomes as geo_biomes1
            INNER JOIN (SELECT gid, name, compensation_factor, id_biome FROM geo_biomes) as geo_biomes2 ON geo_biomes2.gid = geo_biomes1.gid
            WHERE geo_biomes1.id_biome IN (${biomeIds})
          ) as f
        ) as fc`,
      )
        .then(biomes => biomes.rows[0].collection)
    ),
  };
};
