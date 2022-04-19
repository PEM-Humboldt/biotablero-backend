module.exports = (db, { geoParamoDetails, geoEnvironmentalAuthorities, geoHFParamo }) => ({
  /**
   * Get the area inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByEA: (eaId, year = 2012) =>
    geoParamoDetails
      .query()
      .where({ id_ea: eaId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area')),

  /**
   * Get the area inside the given basin subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaBySubzone: (subzoneId, year = 2012) =>
    geoParamoDetails
      .query()
      .where({ id_subzone: subzoneId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area')),

  /**
   * Get the area inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByState: (stateId, year = 2012) =>
    geoParamoDetails
      .query()
      .where({ id_state: stateId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area')),

  /**
   * Find total area
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findTotalArea: async (year = 2012) =>
    geoParamoDetails.query().where('year_cover', year).sum('area_ha as area'),

  /**
   * Find areas grouped by cover type
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findCoverAreas: async (year = 2012) =>
    geoParamoDetails
      .query()
      .where('year_cover', year)
      .sum('area_ha as area')
      .groupBy('area_type')
      .select('area_type as type')
      .orderBy('type'),

  /**
   * Find areas grouped by protected area category inside the given state
   *
   * @param {String} stateId state id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInState: async (stateId, year = 2012) =>
    db('geo_paramo_details as gpd')
      .innerJoin(
        'global_binary_protected_areas as gbpa',
        'gpd.binary_protected',
        'gbpa.binary_protected',
      )
      .where({ 'gpd.id_state': stateId, 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc'),

  /**
   * Find areas grouped by protected area category inside the given subzone
   *
   * @param {String} subzoneId basin subzone id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findPAInSubzone: async (subzoneId, year = 2012) =>
    db('geo_paramo_details as gpd')
      .innerJoin(
        'global_binary_protected_areas as gbpa',
        'gpd.binary_protected',
        'gbpa.binary_protected',
      )
      .where({ 'gpd.id_subzone': subzoneId, 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc'),

  /**
   * Find areas grouped by protected area category
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findProtectedAreas: async (year = 2012) =>
    db('geo_paramo_details as gpd')
      .innerJoin(
        'global_binary_protected_areas as gbpa',
        'gpd.binary_protected',
        'gbpa.binary_protected',
      )
      .where({ 'gpd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gpd.area_ha), 0) as area'), 'gbpa.label as type')
      .orderBy('gbpa.binary_protected', 'desc'),

  /**
   * Find the HF timeline data inside an environmental authority,state or basin subzone
   * @param {String} geofence identifier for the geofence type: ea, states, subzones
   * @param {String | Number} geofenceId geofence id
   *
   * @result {Object} Object with the desired data
   */
  findSEHFTimeLineInGeofence: async (geofence, geofenceId) => {
    const columnName = {
      ea: 'id_ea',
      states: 'id_state',
      subzones: 'id_subzone',
    };
    return geoHFParamo
      .query()
      .select('hf_year as year')
      .avg('hf_avg as avg')
      .where(db.raw('?? = ?', [columnName[geofence], geofenceId]))
      .whereNot({ hf_avg: -9999 })
      .groupBy('year')
      .orderBy('year');
  },

  /**
   * Find the geometry associated inside an environmental authority, state or basin subzone
   * @param {String} geofence identifier for the geofence type: ea, states, subzones
   * @param {String | Number} geofenceId geofence id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @result {Object} GeoJSON object with the desired geometry
   */
  findLayerInGeofence: async (geofence, geofenceId, year = 2018) => {
    const columnName = {
      ea: 'id_ea',
      states: 'id_state',
      subzones: 'id_subzone',
    };
    return db
      .raw(
        `SELECT row_to_json(fc) as collection
        FROM (
          SELECT 'FeatureCollection' as type, array_to_json(array_agg(f)) as features
          FROM(
            SELECT 'Feature' as type,
              ST_AsGeoJSON(geom)::json as geometry
            FROM geo_hf_paramo as ghp
            WHERE ?? = ? AND hf_year = ?
          ) as f
        ) as fc`,
        [columnName[geofence], geofenceId, year],
      )
      .then((layers) => layers.rows[0].collection);
  },

  /**
   * Find the total area for the country
   */
  // TODO: Find alternative to get this area (can't call eaService because of cyclic dependency)
  findCountryTotalArea: async () => geoEnvironmentalAuthorities.query().sum('area_ha as area'),
});
