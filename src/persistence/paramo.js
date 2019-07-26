module.exports = (
  db,
  { geoParamoDetails, geoEnvironmentalAuthorities, globalBinaryProtectedAreas },
) => ({
  /**
   * Get the area inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByEA: (eaId, year = 2012) => (
    geoParamoDetails.query()
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
    geoParamoDetails.query()
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
    geoParamoDetails.query()
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
    return geoParamoDetails.query()
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
    geoParamoDetails.query()
      .where('year_cover', year)
      .sum('area_ha as area')
  ),

  /**
   * Find areas grouped by cover type
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreas: async (year = 2012) => (
    geoParamoDetails.query()
      .where('year_cover', year)
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
      .orderBy('type')
  ),

  /**
   * Find areas grouped by cover type inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInEA: async (eaId, year = 2012) => (
    geoParamoDetails.query()
      .where({ id_ea: eaId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
      .orderBy('type')
  ),

  /**
   * Find areas grouped by protected area category inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInEA: async (eaId, year = 2012) => (
    db('geo_paramo_details as gpd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gpd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gpd.id_ea': eaId, 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc')
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
    return geoParamoDetails.query()
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
  findPAInPA: async (categoryName, year = 2012) => {
    let bitMask = await globalBinaryProtectedAreas.query()
      .where({ label: categoryName })
      .select('binary_protected as mask');
    bitMask = bitMask[0].mask;
    return db('geo_paramo_details as gpd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gpd.binary_protected', 'gbpa.binary_protected')
      .where('gpd.year_cover', year)
      .andWhere(db.raw('(gbpa.binary_protected & ?) = ?', [bitMask, bitMask]))
      .select(db.raw('coalesce(SUM(area_ha), 0) as area'), 'gbpa.label')
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .orderBy('gbpa.binary_protected', 'desc');
  },

  /**
   * Find areas grouped by cover type inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInState: async (stateId, year = 2012) => (
    geoParamoDetails.query()
      .where({ id_state: stateId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
      .orderBy('type')
  ),

  /**
   * Find areas grouped by protected area category inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInState: async (stateId, year = 2012) => (
    db('geo_paramo_details as gpd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gpd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gpd.id_state': stateId, 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc')
  ),

  /**
   * Find areas grouped by cover type inside the given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreasInSubzone: async (subzoneId, year = 2012) => (
    geoParamoDetails.query()
      .where({ id_subzone: subzoneId, year_cover: year })
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
      .orderBy('type')
  ),

  /**
   * Find areas grouped by protected area category inside the given subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInSubzone: async (subzoneId, year = 2012) => (
    db('geo_paramo_details as gpd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gpd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gpd.id_subzone': subzoneId, 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc')
  ),

  /**
   * Find areas grouped by protected area category
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findProtectedAreas: async (year = 2012) => (
    db('geo_paramo_details as gpd')
      .innerJoin('global_binary_protected_areas as gbpa', 'gpd.binary_protected', 'gbpa.binary_protected')
      .where({ 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc')
  ),

  /**
   * Find the total area for the country
   */
  // TODO: Find an alternative to get this area (can't call eaService because of circle dependency)
  findCountryTotalArea: async () => (
    geoEnvironmentalAuthorities.query()
      .sum('area_ha as area')
  ),
});
