const config = require('config');

module.exports = (
  db,
  { colombiaDetails, eaBioticUnits, geoEnvironmentalAuthorities, geoHFPersistence, geoHF },
) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Find total area grouped by compensation factor in a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total areas by compensation factor
     */
    findAreaByCF: (envAuthorityId) =>
      colombiaDetails
        .query()
        .where('idcar', envAuthorityId)
        .sum('area_ha')
        .groupBy('fc_valor')
        .orderBy('fc_valor', 'asc')
        .select('fc_valor'),

    /**
     * Find total area grouped by biotic unit in a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total areas by biotic unit
     */
    findAreaByBioticUnit: (envAuthorityId) =>
      eaBioticUnits
        .query()
        .where('id_ea', envAuthorityId)
        .sum('area_ha as area')
        .groupBy('name')
        .orderBy('name', 'asc')
        .select('name as key'),

    /**
     * Find total area grouped by biome in a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total areas by biome
     */
    findAreaByBiome: (envAuthorityId) =>
      colombiaDetails
        .query()
        .where('idcar', envAuthorityId)
        .sum('area_ha as area')
        .groupBy('bioma_prel')
        .orderBy('bioma_prel', 'asc')
        .select('bioma_prel as key'),

    /**
     * Find total area grouped by sub-basin in a given environmental authority filtered by biome
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {String} biomeName biome name
     *
     * @returns {Object[]} total areas by sub-basin
     */
    findBiomeAreaBySubzone: (envAuthorityId, biomeName) =>
      colombiaDetails
        .query()
        .where({ idcar: envAuthorityId, bioma_iavh: biomeName })
        .sum('area_ha as area')
        .groupBy('nomszh')
        .orderBy('nomszh', 'asc')
        .select('nomszh as key'),

    /**
     * Get all environmental authorities id and name
     */
    findAll: () =>
      geoEnvironmentalAuthorities
        .query()
        .select('geofence_id as id', 'geofence_name as name')
        .orderBy('name'),

    /**
     * Get the total area for the given environmental authority
     *
     * @param {String} envAuthorityId EA id
     */
    getTotalAreaByEA: (envAuthorityId) =>
      geoEnvironmentalAuthorities
        .query()
        .select('area_ha as area')
        .where({ geofence_id: envAuthorityId }),

    /**
     * Find the current area distribution for each human footprint category in the
     * given environmental authority
     * @param {String} eaId environmental authority id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Array of areas by human footprint category
     */
    findAreaByHFCategory: async (eaId, year = 2018) =>
      geoHF
        .query()
        .where({ id_ea: eaId, hf_year: year })
        .groupBy('hf_cat')
        .sum('area_ha as area')
        .select('hf_cat as key')
        .orderBy('key'),

    /**
     * Find the current value of human footprint in the given environmental authority
     * @param {String} eaId environmental authority id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object} Object of current human footprint value.
     */
    findCurrentHFValue: async (eaId, year = 2018) =>
      geoHF
        .query()
        .where({ id_ea: eaId, hf_year: year })
        .whereNot({ hf_avg: -9999 })
        .avg('hf_avg as CurrentHFValue'),

    /**
     * Find the persistence of human footprint areas in the given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object[]} Array of persistence values.
     */
    findHFPersistenceAreas: async (eaId) =>
      geoHFPersistence
        .query()
        .where({ id_ea: eaId })
        .groupBy('hf_pers')
        .sum('area_ha as area')
        .select('hf_pers as key')
        .orderBy('key'),

    /**
     * Find the human footprint value through time in the given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object} Object of HF values through time
     */
    findTotalHFTimeLine: async (eaId) =>
      geoHF
        .query()
        .select('hf_year as year')
        .avg('hf_avg as avg')
        .where({ id_ea: eaId })
        .whereNot({ hf_avg: -9999 })
        .groupBy('year')
        .orderBy('year'),

    /**
     * Get GeoJson layer with environmental authorities at national level
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
              row_to_json(ea2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_environmental_authorities as ea1
            INNER JOIN (
              SELECT gid, geofence_id, geofence_name, area_ha
              FROM geo_environmental_authorities
            ) as ea2 ON ea1.gid = ea2.gid
          ) as f
        ) as fc
        `,
          geometriesConfig.tolerance,
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the geometry for a given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerById: (eaId) =>
      db
        .raw(
          `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(ea2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?), 9, 2)::json as geometry
            FROM geo_environmental_authorities as ea1
            INNER JOIN (
              SELECT gid as id, geofence_name as key
              FROM geo_environmental_authorities
            ) as ea2 ON ea1.gid = ea2.id
            WHERE ea1.geofence_id = ?
          ) as f
        ) as fc
        `,
          [geometriesConfig.tolerance_heavy, eaId],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the current human footprint layer divided by categories in a given
     * environmental authority
     * @param {String} eaId environmental authority id
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFCategoriesLayerById: (eaId, year = 2018) =>
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
              WHERE id_ea = ?
                AND hf_year = ?
              GROUP BY key
              ) AS geo
              INNER JOIN (
                SELECT
                  hf_cat AS key,
                  sum(area_ha) AS area
                FROM geo_hf
                WHERE id_ea = ?
                  AND hf_year = ?
                GROUP BY key
              ) AS prop
              ON geo.key = prop.key
          ) as f
        ) as fc;
        `,
          [eaId, year, eaId, year],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Get the persistence human footprint layer divided by categories in a given
     * environmental authority
     * @param {String} eaId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFPersistenceLayerById: (eaId) =>
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
                WHERE id_ea = ?
                GROUP BY key
                ) AS geo
                INNER JOIN (
                  SELECT
                    hf_pers AS key,
                    sum(area_ha) AS area
                  FROM geo_hf_persistence
                  WHERE id_ea = ?
                  GROUP BY key
                ) AS prop
                ON geo.key = prop.key
            ) as f
          ) as fc;
        `,
          [eaId, eaId],
        )
        .then((layers) => layers.rows[0].collection),

    /**
     * Select biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @returns {Object} GeoJson Object with biomes as features from a FeatureCollection
     */
    findBiomesLayerById: (envAuthority) =>
      db
        .raw(
          `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(geo_biomes2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_ea_biomes as geo_biomes1
            INNER JOIN (
              SELECT geb.gid, geb.name_biome, geb.id_biome, gb.compensation_factor
              FROM geo_ea_biomes as geb
              INNER JOIN geo_biomes as gb ON gb.id_biome = geb.id_biome
            ) as geo_biomes2 ON geo_biomes2.gid = geo_biomes1.gid
            WHERE geo_biomes1.id_ea = ?
          ) as f
        ) as fc`,
          [geometriesConfig.tolerance, envAuthority],
        )
        .then((biomes) => biomes.rows[0].collection),
  };
};
