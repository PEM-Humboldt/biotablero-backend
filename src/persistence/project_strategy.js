module.exports = (db, { selectedStrategies }) => ({
  /**
   * Create a new project strategy
   *
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: strategy => selectedStrategies.forge(strategy).save(),

  /**
   * Find all selected strategies with the given user id and project id
   *
   * @param {Number} userId strategies owner id
   * @param {Number} projectId project associated with the stretegies
   *
   * @returns {Object[]} List of selected strategies
   */
  findByUserAndProject: (userId, projectId) => (
    selectedStrategies
      .where({ id_user: userId, id_project: projectId })
      .fetchAll({
        withRelated: [
          { biome: qb => qb.column('id_biome', 'name') },
          'ea',
          { szh: qb => qb.column('id_subzone', 'name_subzone') },
        ],
      })
      .then(results => results.toJSON())
  ),

  /**
   * Find all geometries belonging to selected strategies for a given project
   *
   * @param {Number} projectId associated project id
   *
   * @returns {Object} GeoJson object with all geometries
   */
  findSelectedStrategiesGeoJson: projectId => (
    db.raw(
      `SELECT row_to_json(fc) as collection
      FROM (
        SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM(
          SELECT 'Feature' as type,
            row_to_json(str2) as properties,
            ST_AsGeoJSON(geom)::json as geometry
          FROM geo_compensation_strategies_2018 as str1
          INNER JOIN (
            SELECT ss.id_project as project_id, ss.area as selected_area_ha,
              gb.id_biome as biome_id, gb.name as biome_name, gb.compensation_factor as biome_compensation_factor, gb.general_name as biome_general_name,
              ea.id_ea as ea_id, ea.name as ea_name, ha.id_subzone as subzone_id, ha.name_subzone as subzone_name, ha.id_zone as zone_id, ha.name_zone as zone_name, ha.id_area as area_id, ha.name_area as area_name,
              s.id_strategy as strategy_id, s.strategy as strategy_name, gcs.gid, gcs.area_ha as total_strategy_area, gcs.area_status as strategy_area_status
            FROM selected_strategies as ss
            INNER JOIN geo_biomes as gb ON ss.id_biome = gb.id_biome
            INNER JOIN environmental_authorities as ea ON ss.id_ea = ea.id_ea
            INNER JOIN hidro_areas as ha ON ss.id_subzone = ha.id_subzone
            INNER JOIN strategies as s ON ss.id_strategy = s.id_strategy
            INNER JOIN geo_compensation_strategies_2018 as gcs ON ss.id_biome = gcs.id_biome AND ss.id_ea = gcs.id_ea AND ss.id_subzone = gcs.id_subzone AND ss.id_strategy = gcs.id_strategy
          ) as str2 ON str1.gid = str2.gid
          where str2.project_id = ${projectId}
        ) as f
      ) as fc`,
    )
      .then(biomes => biomes.rows[0].collection)
  ),
});
