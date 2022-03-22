const config = require('config');

module.exports = (db, { geoBasinSubzones, colombiaCoverageDetails, geoHFPersistence, geoHF }) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all basin zones
     */
    findAll: () =>
      geoBasinSubzones
        .query()
        .select('id_subzone as id', 'name_subzone as name', 'id_zone', 'id_basin')
        .orderBy('name'),

    /**
     * Get the total area for the given subzone
     *
     * @param {String} subzoneId subzone id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaBySubzone: (subzoneId, year = 2012) =>
      colombiaCoverageDetails
        .query()
        .where({ id_subzone: subzoneId, year_cover: year })
        .sum('area_ha as area'),

    /**
     * Get the protected area distribution inside the given basin subzone
     *
     * @param {String} subzoneId subzone id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByPA: async (subzoneId, year = 2012) =>
      db('colombia_coverage_details as cc')
        .innerJoin(
          'global_binary_protected_areas as gbpa',
          'cc.binary_protected',
          'gbpa.binary_protected',
        )
        .where({ 'cc.id_subzone': subzoneId, 'cc.year_cover': year })
        .groupBy('gbpa.label', 'gbpa.binary_protected')
        .orderBy('gbpa.binary_protected', 'desc')
        .select(
          db.raw('coalesce(SUM(cc.area_ha), 0) as area'),
          'gbpa.label as type',
          'gbpa.binary_protected as bp',
        ),

    /**
     * Find the current area distribution for each human footprint category in the
     * given basin subzone
     * @param {Number} subzoneId basin subzone id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Array of areas by human footprint category
     */
    findAreaByHFCategory: async (subzoneId, year = 2018) =>
      geoHF
        .query()
        .where({ id_subzone: subzoneId, hf_year: year })
        .groupBy('hf_cat')
        .sum('area_ha as area')
        .select('hf_cat as key')
        .orderBy('key'),

    /**
     * Find the current value of human footprint in the given basin subzone
     * @param {Number} subzoneId basin subzone id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object} Object of current human footprint value.
     */
    findCurrentHFValue: async (subzoneId, year = 2018) =>
      geoHF
        .query()
        .where({ id_subzone: subzoneId, hf_year: year })
        .whereNot({ hf_avg: -9999 })
        .avg('hf_avg as CurrentHFValue'),

    /**
     * Find the persistence of human footprint areas in the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object[]} Array of persistence values.
     */
    findHFPersistenceAreas: async (subzoneId) =>
      geoHFPersistence
        .query()
        .where({ id_subzone: subzoneId })
        .groupBy('hf_pers')
        .sum('area_ha as area')
        .select('hf_pers as key')
        .orderBy('key'),

    /**
     * Find the human footprint value through time in the given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @returns {Object} Object of HF values through time
     */
    findTotalHFTimeLine: async (subzoneId) =>
      geoHF
        .query()
        .select('hf_year as year')
        .avg('hf_avg as avg')
        .where({ id_subzone: subzoneId })
        .whereNot({ hf_avg: -9999 })
        .groupBy('year')
        .orderBy('year'),

    /**
     * Get GeoJson layer with basin subzones at national level
     */
    findNationalLayer: () =>
      db
        .raw(
          `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(sz2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_basin_subzones as sz1
            INNER JOIN (
              SELECT gid, id_basin, id_zone, id_subzone, name_subzone, area_ha
              FROM geo_basin_subzones
            ) as sz2 ON sz1.gid = sz2.gid
          ) as f
        ) as fc
        `,
          geometriesConfig.tolerance_heavy,
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the geometry for a given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerById: (subzoneId) =>
      db
        .raw(
          `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(sz2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?), 9, 2)::json as geometry
            FROM geo_basin_subzones as sz1
            INNER JOIN (
              SELECT gid as id, name_subzone as key
              FROM geo_basin_subzones
            ) as sz2 ON sz1.gid = sz2.id
            WHERE sz1.id_subzone = ?
          ) as f
        ) as fc
        `,
          [geometriesConfig.tolerance_heavy, subzoneId],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the current human footprint layer divided by categories in a given basin subzone
     * @param {Number} subzoneId basin subzone id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFCategoriesLayerById: (subzoneId, year = 2018) =>
      db
        .raw(
          `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                hf_cat AS key
              FROM geo_hf
              WHERE id_subzone = ?
                AND hf_year = ?
              GROUP BY key
              ) AS geo
              INNER JOIN (
                SELECT
                  hf_cat AS key,
                  sum(area_ha) AS area
                FROM geo_hf
                WHERE id_subzone = ?
                  AND hf_year = ?
                GROUP BY key
              ) AS prop
              ON geo.key = prop.key
          ) as f
        ) as fc;
        `,
          [subzoneId, year, subzoneId, year],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the persistence human footprint layer divided by categories in a given basin subzone
     * @param {Number} subzoneId basin subzone id
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFPersistenceLayerById: (subzoneId) =>
      db
        .raw(
          `
          SELECT row_to_json(fc) AS collection
          FROM (
            SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
            FROM (
              SELECT
                'Feature' AS TYPE,
                row_to_json(prop) AS properties,
                ST_AsGeoJSON(geom)::json AS geometry
              FROM (
                SELECT
                  ST_Collect(geom) AS geom,
                  hf_pers AS key
                FROM geo_hf_persistence
                WHERE id_subzone = ?
                GROUP BY key
                ) AS geo
                INNER JOIN (
                  SELECT
                    hf_pers AS key,
                    sum(area_ha) AS area
                  FROM geo_hf_persistence
                  WHERE id_subzone = ?
                  GROUP BY key
                ) AS prop
                ON geo.key = prop.key
            ) as f
          ) as fc;
        `,
          [subzoneId, subzoneId],
        )
        .then((layers) => layers.rows[0].collection),
  };
};
