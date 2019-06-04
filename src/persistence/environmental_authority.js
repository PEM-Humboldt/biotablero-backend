const config = require('config');

module.exports = (
  db,
  {
    colombiaDetails, eaBioticUnits, geoEnvironmentalAuthorities,
    colombiaCoverages,
  },
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
    findAreaByCF: envAuthorityId => (
      colombiaDetails.query()
        .where('idcar', envAuthorityId)
        .sum('area_ha')
        .groupBy('fc_valor')
        .orderBy('fc_valor', 'asc')
        .select('fc_valor')
    ),

    /**
     * Find total area grouped by biotic unit in a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total areas by biotic unit
     */
    findAreaByBioticUnit: envAuthorityId => (
      eaBioticUnits.query()
        .where('id_ea', envAuthorityId)
        .sum('area_ha as area')
        .groupBy('name')
        .orderBy('name', 'asc')
        .select('name as key')
    ),

    /**
     * Find total area grouped by biome in a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total areas by biome
     */
    findAreaByBiome: envAuthorityId => (
      colombiaDetails.query()
        .where('idcar', envAuthorityId)
        .sum('area_ha as area')
        .groupBy('bioma_prel')
        .orderBy('bioma_prel', 'asc')
        .select('bioma_prel as key')
    ),

    /**
     * Find total area grouped by sub-basin in a given environmental authority filtered by biome
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {String} biomeName biome name
     *
     * @returns {Object[]} total areas by sub-basin
     */
    findBiomeAreaBySubzone: (envAuthorityId, biomeName) => (
      colombiaDetails.query()
        .where({ idcar: envAuthorityId, bioma_iavh: biomeName })
        .sum('area_ha as area')
        .groupBy('nomszh')
        .orderBy('nomszh', 'asc')
        .select('nomszh as key')
    ),

    /**
     * Get all environmental authorities id and name
     */
    findAll: () => (
      geoEnvironmentalAuthorities.query()
        .select('id_ea as id', 'name')
    ),

    /**
     * Get the total area for the given environmental authority
     *
     * @param {String} envAuthorityId EA id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaByEA: (envAuthorityId, year = 2012) => (
      colombiaCoverages.query()
        .where({ id_ea: envAuthorityId, year_cover: year })
        .sum('area_ha as area')
    ),

    /**
     * Get the protected area distribution inside the given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByPA: async (envAuthorityId, year = 2012) => (
      db('colombia_coverages')
        .innerJoin('geo_protected_areas', 'colombia_coverages.id_protected_area', 'geo_protected_areas.gid')
        .where({ 'colombia_coverages.id_ea': envAuthorityId, 'colombia_coverages.year_cover': year })
        .groupBy('geo_protected_areas.category')
        .select(db.raw('coalesce(SUM(colombia_coverages.area_ha), 0) as area'), 'geo_protected_areas.category as type')
    ),

    /**
     * Get the coverage area distribution inside the given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByCoverage: async (envAuthorityId, year = 2012) => (
      colombiaCoverages.query()
        .where({ id_ea: envAuthorityId, year_cover: year })
        .groupBy('area_type')
        .sum('area_ha as area')
        .select('area_type as type')
    ),

    /**
     * Get GeoJson layer with environmental authorities at national level
     */
    findNationalLayer: () => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              row_to_json(ea2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_environmental_authorities as ea1
            INNER JOIN (
              SELECT gid, id_ea, name, area_ha
              FROM geo_environmental_authorities
            ) as ea2 ON ea1.gid = ea2.gid
          ) as f
        ) as fc`,
        geometriesConfig.tolerance,
      )
        .then(layers => layers.rows[0].collection)
    ),
  };
};
