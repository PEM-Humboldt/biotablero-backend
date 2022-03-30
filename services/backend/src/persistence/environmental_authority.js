const config = require('config');

module.exports = (
  db,
  {
    colombiaDetails,
    eaBioticUnits,
    geoEnvironmentalAuthorities,
    colombiaCoverageDetails,
    geoHFPersistence,
    geoHF,
  },
  logger,
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
      geoEnvironmentalAuthorities.query().select('id_ea as id', 'name').orderBy('name'),

    /**
     * Get the total area for the given environmental authority
     *
     * @param {String} envAuthorityId EA id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaByEA: (envAuthorityId, year = 2012) =>
      colombiaCoverageDetails
        .query()
        .where({ id_ea: envAuthorityId, year_cover: year })
        .sum('area_ha as area'),

    /**
     * Get the protected area distribution inside the given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     */
    findAreaByPA: async (envAuthorityId) =>
      db('geo_global_protected_areas as gpa')
        .leftJoin('geo_protected_areas as pa1', 'gpa.anu', 'pa1.id_pa')
        .leftJoin('geo_protected_areas as pa2', 'gpa.dcs', 'pa2.id_pa')
        .leftJoin('geo_protected_areas as pa3', 'gpa.dnmi', 'pa3.id_pa')
        .leftJoin('geo_protected_areas as pa4', 'gpa.drmi', 'pa4.id_pa')
        .leftJoin('geo_protected_areas as pa5', 'gpa.pnn', 'pa5.id_pa')
        .leftJoin('geo_protected_areas as pa6', 'gpa.pnr', 'pa6.id_pa')
        .leftJoin('geo_protected_areas as pa7', 'gpa.rfpn', 'pa7.id_pa')
        .leftJoin('geo_protected_areas as pa8', 'gpa.rfpr', 'pa8.id_pa')
        .leftJoin('geo_protected_areas as pa9', 'gpa.rn', 'pa9.id_pa')
        .leftJoin('geo_protected_areas as pa10', 'gpa.rnsc', 'pa10.id_pa')
        .leftJoin('geo_protected_areas as pa11', 'gpa.sfa', 'pa11.id_pa')
        .leftJoin('geo_protected_areas as pa12', 'gpa.sff', 'pa12.id_pa')
        .leftJoin('geo_protected_areas as pa13', 'gpa.sfl', 'pa13.id_pa')
        .leftJoin('geo_protected_areas as pa14', 'gpa.vp', 'pa14.id_pa')
        .leftJoin('geo_protected_areas as pa15', 'gpa.ar', 'pa15.id_pa')
        .where({ 'gpa.id_ea': envAuthorityId })
        .groupBy(
          'category1',
          'category2',
          'category3',
          'category4',
          'category5',
          'category6',
          'category7',
          'category8',
          'category9',
          'category10',
          'category11',
          'category12',
          'category13',
          'category14',
          'category15',
        )
        .distinct(
          'pa1.category as category1',
          'pa2.category as category2',
          'pa3.category as category3',
          'pa4.category as category4',
          'pa5.category as category5',
          'pa6.category as category6',
          'pa7.category as category7',
          'pa8.category as category8',
          'pa9.category as category9',
          'pa10.category as category10',
          'pa11.category as category11',
          'pa12.category as category12',
          'pa13.category as category13',
          'pa14.category as category14',
          'pa15.category as category15',
        )
        .sum('gpa.area_ha as area')
        .orderBy('area', 'desc')
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new Error('Error getting data');
        }),

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
              SELECT gid, id_ea, name, area_ha
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
              SELECT gid as id, name as key
              FROM geo_environmental_authorities
            ) as ea2 ON ea1.gid = ea2.id
            WHERE ea1.id_ea = ?
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
