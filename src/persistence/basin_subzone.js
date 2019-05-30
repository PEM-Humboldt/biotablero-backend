const config = require('config');

module.exports = (db, { geoBasinSubzones, colombiaCoverages }) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all basin zones
     */
    findAll: () => (
      geoBasinSubzones.query()
        .select('id_subzone as id', 'name_subzone as name', 'id_zone', 'id_basin')
    ),

    /**
     * Get the total area for the given subzone
     *
     * @param {String} subzoneId subzone id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaBySubzone: (subzoneId, year = 2012) => (
      colombiaCoverages.query()
        .where({ id_subzone: subzoneId, year_cover: year })
        .sum('area_ha as area')
    ),

    /**
     * Get the protected area distribution inside the given basin subzone
     *
     * @param {String} subzoneId subzone id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByPA: async (subzoneId, year = 2012) => (
      db('colombia_coverages')
        .innerJoin('geo_protected_areas', 'colombia_coverages.id_protected_area', 'geo_protected_areas.gid')
        .where({ 'colombia_coverages.id_subzone': subzoneId, 'colombia_coverages.year_cover': year })
        .groupBy('geo_protected_areas.category')
        .select(db.raw('coalesce(SUM(colombia_coverages.area_ha), 0) as area'), 'geo_protected_areas.category as type')
    ),

    /**
     * Get GeoJson layer with basin subzones at national level
     */
    findNationalLayer: () => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(sz2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ${geometriesConfig.tolerance_heavy}))::json as geometry
            FROM geo_basin_subzones as sz1
            INNER JOIN (
              SELECT gid, id_basin, id_zone, id_subzone, name_subzone, area_ha
              FROM geo_basin_subzones
            ) as sz2 ON sz1.gid = sz2.gid
          ) as f
        ) as fc`,
      )
        .then(layers => layers.rows[0].collection)
    ),
  };
};
