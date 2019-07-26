const config = require('config');

module.exports = (db, { geoBasinSubzones, colombiaCoverageDetails }) => {
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
      colombiaCoverageDetails.query()
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
      db('colombia_coverage_details as cc')
        .innerJoin('global_binary_protected_areas as gbpa', 'cc.binary_protected', 'gbpa.binary_protected')
        .where({ 'cc.id_subzone': subzoneId, 'cc.year_cover': year })
        .groupBy('gbpa.label', 'gbpa.binary_protected')
        .orderBy('gbpa.binary_protected', 'desc')
        .select(db.raw('coalesce(SUM(cc.area_ha), 0) as area'), 'gbpa.label as type')
    ),

    /**
     * Get the coverage area distribution inside the given basin subzone
     *
     * @param {String} subzoneId basin subzone id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByCoverage: async (subzoneId, year = 2012) => (
      colombiaCoverageDetails.query()
        .where({ id_subzone: subzoneId, year_cover: year })
        .groupBy('area_type')
        .sum('area_ha as area')
        .select('area_type as type')
        .orderBy('type')
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
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_basin_subzones as sz1
            INNER JOIN (
              SELECT gid, id_basin, id_zone, id_subzone, name_subzone, area_ha
              FROM geo_basin_subzones
            ) as sz2 ON sz1.gid = sz2.gid
          ) as f
        ) as fc`,
        geometriesConfig.tolerance_heavy,
      )
        .then(layers => layers.rows[0].collection)
    ),
  };
};
