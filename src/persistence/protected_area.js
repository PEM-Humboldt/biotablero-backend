module.exports = (db, { globalBinaryProtectedAreas }) => ({
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
});
