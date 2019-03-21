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
            INNER JOIN (
              SELECT geb.gid, geb.name_biome, geb.id_biome, gb.compensation_factor
              FROM geo_ea_biomes as geb
              INNER JOIN geo_biomes as gb ON gb.id_biome = geb.id_biome
            ) as geo_biomes2 ON geo_biomes2.gid = geo_biomes1.gid
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
      geoBiomesMod
        .fetchAll({ columns: ['id_biome', 'name', 'compensation_factor'] })
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
        `SELECT DISTINCT(st.id_subzone, st.id_ea) as remove, st.id_subzone, st.id_ea, st.id_biome, gb.name as biome_name, ea.name as ea_name, gbs.name_subzone as nom_szh
        FROM project_impacted_biomes as pib
        INNER JOIN geo_biomes as gb ON pib.id_biome = gb.id_biome
        INNER JOIN geo_compensation_strategies_2018 as st ON gb.id_main_biome = st.id_biome
        INNER JOIN geo_basin_subzones AS gbs ON st.id_subzone = gbs.id_subzone
        INNER JOIN environmental_authorities as ea ON st.id_ea = ea.id_ea
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
            'area_impacted_ha', 'area_to_compensate_ha', 'id_biome', 'area_impacted_pct'],
          withRelated: [{ biome: qb => qb.column('id_biome', 'name', 'compensation_factor') }],
        })
        .then(results => results.toJSON())
    ),

    /**
     * Select a project impacted biomes with their geometry.
     *
     * @param {Number} projectId project id
     *
     * @returns {Object} GeoJson Object with impacted biomes as features from a FeatureCollection
     */
    findGeoProjectImpacted: projectId => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(geo_biomes2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance_heavy}))::json as geometry
            FROM (
              SELECT gb.gid, gb.name, gb.compensation_factor, gb.id_biome, pib.area_impacted_pct
              FROM geo_biomes as gb
              INNER JOIN project_impacted_biomes as pib ON gb.id_biome = pib.id_biome
              WHERE pib.id_project=${projectId}
            ) as geo_biomes2
            INNER JOIN geo_biomes as geo_biomes1 ON geo_biomes2.gid = geo_biomes1.gid
          ) as f
        ) as fc`,
      )
        .then(biomes => biomes.rows[0].collection)
    ),
  };
};
