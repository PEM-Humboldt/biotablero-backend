const config = require('config');

module.exports = (db, { globalBinaryProtectedAreas }) => {
  const geometriesConfig = config.geometries;

  return {
    /**
     * Get all protected area categories
     */
    findCategories: () => (
      globalBinaryProtectedAreas.query()
        .select('label as name')
        .where(db.raw("trim(both '0' from binary_protected::varchar) = '1'"))
        .orderBy('name')
    ),

    /**
     * Get the protected area categories for the given set of binary protected values
     *
     * @param {String[]} binaryProtected binary protected values to filter by
     */
    findCategoriesByBinaryProtected: binaryProtected => (
      globalBinaryProtectedAreas.query()
        .whereIn('binary_protected', binaryProtected)
        .orderBy('binary_protected')
        .select('binary_protected', 'label')
    ),

    /**
     * Get the binary protected value for the given category name
     *
     * @param {String} categoryName protected area category name
     *
     * @returns {Object} binary protected value
     *
     */
    findBinaryProtectedByCategory: categoryName => (
      globalBinaryProtectedAreas.query()
        .where('label', categoryName)
        .select('binary_protected')
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
     * Find the current area distribution for each human footprint category in the
     * given protected area category
     * @param {String} categoryName protected area category
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object[]} Array of areas by human footprint category
     */
    findAreaByHFCategory: async (categoryName, year = 2018) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('geo_hf')
        .select('hf_cat as key')
        .sum('area_ha as area')
        .where({ hf_year: year })
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
        .groupBy('hf_cat')
        .orderBy('key');
    },

    /**
     * Find the current value of human footprint in the given protected area category
     * @param {String} categoryName protected area category
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @returns {Object} Object of current human footprint value.
     */
    findCurrentHFValue: async (categoryName, year = 2018) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('geo_hf as ghf')
        .where({ hf_year: year })
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
        .whereNot({ hf_avg: -9999 })
        .avg('hf_avg as CurrentHFValue');
    },

    /**
     * Find the persistence of human footprint areas in the given protected area category
     * @param {String} categoryName protected area category
     *
     * @returns {Object[]} Array of persistence values.
     */
    findHFPersistenceAreas: async (categoryName) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('geo_hf_persistence')
        .select(db.raw('coalesce(SUM(area_ha), 0) as area'), 'hf_pers as key')
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
        .groupBy('hf_pers')
        .orderBy('key');
    },

    /**
     * Find the human footprint value through time in the given protected area category
     * @param {String} categoryName protected area category
     *
     * @returns {Object} Object of HF values through time
     */
    findTotalHFTimeLine: async (categoryName) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db('geo_hf')
        .select('hf_year as year')
        .avg('hf_avg as avg')
        .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
        .whereNot({ hf_avg: -9999 })
        .groupBy('year')
        .orderBy('year');
    },

    /**
     * Get the geometry for a protected area category
     * @param {String} stateId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    findLayerByCategory: categoryName => (
      db.raw(
        `
        SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM (
            SELECT 'Feature' as type,
              row_to_json(pa2) as properties,
              ST_AsGeoJSON(ST_SimplifyPreserveTopology(geom, ?))::json as geometry
            FROM geo_protected_areas as pa1
            INNER JOIN (
              SELECT gid as id, name as key
              FROM geo_protected_areas
            ) as pa2 on pa2.id = pa1.gid
            WHERE pa1.category = ?
          ) as f
        ) as fc
        `,
        [geometriesConfig.tolerance_heavy, categoryName],
      )
        .then(layers => layers.rows[0].collection)

    ),

    /**
     * Get the current human footprint layer divided by categories in a given
     * protected area
     * @param {String} categoryName protected area category
     * @param {Number} year optional year to filter data, 2018 by default
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFCategoriesLayerByPACategory: async (categoryName, year = 2018) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db.raw(
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
              WHERE (binary_protected & ?) = ?
                AND hf_year = ?
              GROUP BY key
              ) AS geo
              INNER JOIN (
                SELECT 
                  hf_cat AS key,
                  sum(area_ha) AS area
                FROM geo_hf
                WHERE (binary_protected & ?) = ?
                  AND hf_year = ?
                GROUP BY key
              ) AS prop
              ON geo.key = prop.key
          ) as f
        ) as fc;
        `,
        [
          bitMask,
          bitMask,
          year,
          bitMask,
          bitMask,
          year,
        ],
      )
        .then(layers => layers.rows[0].collection);
    },

    /**
     * Get the persistence human footprint layer divided by categories in a given
     * protected area
     * @param {String} categoryName protected area category
     *
     * @return {Object} Geojson object with the geometry
     */
    findHFPersistenceLayerById: async (categoryName) => {
      let bitMask = await globalBinaryProtectedAreas.query()
        .where({ label: categoryName })
        .select('binary_protected as mask');
      bitMask = bitMask[0].mask;
      return db.raw(
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
              WHERE (binary_protected & ?) = ?
              GROUP BY key
              ) AS geo
              INNER JOIN (
                SELECT 
                  hf_pers AS key,
                  sum(area_ha) AS area
                FROM geo_hf_persistence
                WHERE (binary_protected & ?) = ?
                GROUP BY key
              ) AS prop
              ON geo.key = prop.key
          ) as f
        ) as fc;
        `,
        [
          bitMask,
          bitMask,
          bitMask,
          bitMask,
        ],
      )
        .then(layers => layers.rows[0].collection);
    },
  };
};
