const config = require('config');

module.exports = (db, { globalBinaryProtectedAreas }) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all protected area categories
     */
    findCategories: () => (
      globalBinaryProtectedAreas.query()
        .where(db.raw("trim(both '0' from binary_protected::varchar) = '1'"))
        .orderBy('binary_protected')
        .select('label as name')
    ),

    /**
     * Get the total area for the given category
     *
     * @param {String} categoryName protected area category name
     * @param {Number} year optional year to filter data, 2012 by default
     */
    getTotalAreaByCategory: async (categoryName, year = 2012) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      if (!bitMask || bitMask.length < 1) return null;
      bitMask = bitMask[0].mask;
      return db('colombia_coverage_details')
        .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
        .where('year_cover', year)
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]));
    },

    /**
     * Get the coverage area distribution inside the given protected area category
     *
     * @param {String} categoryName protected area category name
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByCoverage: async (categoryName, year = 2012) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('colombia_coverage_details')
        .select(db.raw('coalesce(SUM(area_ha), 0) as area'), 'area_type as type')
        .where('year_cover', year)
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
        .groupBy('area_type')
        .orderBy('type');
    },

    /**
     * Find areas grouped by protected area category inside the given protected area category
     *
     * @param {String} categoryName protected area category
     * @param {Number} year optional year to filter data, 2012 by default
     */
    findAreaByPA: async (categoryName, year = 2012) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('colombia_coverage_details as ccd')
        .innerJoin('global_binary_protected_areas as gbpa', 'ccd.binary_protected', 'gbpa.binary_protected')
        .select(db.raw('coalesce(SUM(ccd.area_ha), 0) as area'), 'gbpa.label')
        .where('year_cover', year)
        .andWhere(db.raw('(gbpa.binary_protected & ?) = ?', [bitMask, bitMask]))
        .groupBy('gbpa.label', 'gbpa.binary_protected');
    },

    /**
     * Get the geometry for a protected area category
     * @param {String} stateId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerByCategory: categoryName => (
      db.raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_protected_areas as sz1
            WHERE category = ?
          ) as f
        ) as fc`,
        [geometriesConfig.tolerance_heavy, categoryName],
      )
        .then(layers => layers.rows[0].collection)

    ),
  };
};
