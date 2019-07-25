module.exports = (db, { geoTropicalDryForestDetails, globalBinaryProtectedAreas }) => ({
  /**
   * Get the area inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByEA: (eaId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_ea: eaId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
  ),

  /**
   * Get the area inside the given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaBySubzone: (subzoneId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_subzone: subzoneId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
  ),

  /**
   * Get the area inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByState: (stateId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_state: stateId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
  ),

  /**
   * Get the area inside the protected areas with the given category
   *
   * @param {String} categoryName category
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByPACategory: async (categoryName, year = 2012) => {
    let bitMask = await globalBinaryProtectedAreas.query()
      .where({ label: categoryName })
      .select('binary_protected as mask');
    bitMask = bitMask[0].mask;
    return geoTropicalDryForestDetails.query()
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'))
      .where('year_cover', year)
      .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]));
  },

  /**
   * Find total area
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findTotalArea: async (year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where('year_cover', year)
      .sum('area_ha as area')
  ),

  /**
   * Find areas grouped by cover type
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreas: async (year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where('year_cover', year)
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
  ),

  /**
   * Find areas grouped by cover type inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInEA: async (eaId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_ea: eaId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
  ),

  /**
   * Find areas grouped by protected area category inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInEA: async (eaId, year = 2012) => (
    db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gtdfd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gtdfd.id_ea': eaId, 'gtdfd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gtdfd.area_ha), 0) as area'), 'gbpa.label as type')
  ),

  /**
   * Find areas grouped by cover type inside the given protected area category
   *
   * @param {String} categoryName protected area category
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInPACategory: async (categoryName, year = 2012) => {
    let bitMask = await globalBinaryProtectedAreas.query()
      .where({ label: categoryName })
      .select('binary_protected as mask');
    bitMask = bitMask[0].mask;
    return geoTropicalDryForestDetails.query()
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'), 'area_type as type')
      .where('year_cover', year)
      .andWhere(db.raw('(binary_protected & ?) = ?', [bitMask, bitMask]))
      .groupBy('area_type');
  },

  /**
   * Find areas grouped by protected area category inside the given protected area category
   *
   * @param {String} categoryName protected area category
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInPA: async (categoryName, year = 2012) => {
    let bitMask = await globalBinaryProtectedAreas.query()
      .where({ label: categoryName })
      .select('binary_protected as mask');
    bitMask = bitMask[0].mask;
    return db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gtdfd.binary_protected', 'gbpa.binary_protected')
      .where('gtdfd.year_cover', year)
      .andWhere(db.raw('(gbpa.binary_protected & ?) = ?', [bitMask, bitMask]))
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'), 'gbpa.label')
      .groupBy('gbpa.label', 'gbpa.binary_protected');
  },

  /**
   * Find areas grouped by cover type inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInState: async (stateId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_state: stateId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
  ),

  /**
   * Find areas grouped by protected area category inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInState: async (stateId, year = 2012) => (
    db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gtdfd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gtdfd.id_state': stateId, 'gtdfd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gtdfd.area_ha), 0) as area'), 'gbpa.label as type')
  ),

  /**
   * Find areas grouped by cover type inside the given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInSubzone: async (subzoneId, year = 2012) => (
    geoTropicalDryForestDetails.query()
      .where({ id_subzone: subzoneId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
  ),

  /**
   * Find areas grouped by protected area category inside the given subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInSubzone: async (subzoneId, year = 2012) => (
    db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gtdfd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gtdfd.id_subzone': subzoneId, 'gtdfd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gtdfd.area_ha), 0) as area'), 'gbpa.label as type')
  ),

  /**
   * Find areas grouped by protected area category
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findProtectedAreas: async (year = 2012) => (
    db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gtdfd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gtdfd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gtdfd.area_ha), 0) as area'), 'gbpa.label as type')
  ),
});
