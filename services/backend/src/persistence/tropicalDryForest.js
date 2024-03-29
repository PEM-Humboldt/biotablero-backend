module.exports = (db, { geoTropicalDryForestDetails, geoHFTropicalDryForest }) => ({
  /**
   * Get the area inside the given environmental authority
   *
   * @param {String} eaId environmental authority id
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findAreaByEA: (eaId, year = 2012) =>
    geoTropicalDryForestDetails
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
    geoTropicalDryForestDetails
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
    geoTropicalDryForestDetails
      .query()
      .where({ id_state: stateId, year_cover: year })
      .select(db.raw('coalesce(SUM(area_ha), 0) as area')),

  /**
   * Find total area
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findTotalArea: async (year = 2012) =>
    geoTropicalDryForestDetails.query().where('year_cover', year).sum('area_ha as area'),

  /**
   * Find areas grouped by protected area category
   *
   * @param {Number} year optional year to filter data, 2012 by default
   */
  findProtectedAreas: async (year = 2012) =>
    db('geo_tropical_dry_forest_details as gtdfd')
      .innerJoin(
        'global_binary_protected_areas as gbpa',
        'gtdfd.binary_protected',
        'gbpa.binary_protected',
      )
      .where({ 'gtdfd.year_cover': year })
      .groupBy('gbpa.label', 'gbpa.binary_protected')
      .select(db.raw('coalesce(SUM(gtdfd.area_ha), 0) as area'), 'gbpa.label as type')
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
    return geoHFTropicalDryForest
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
   * @param {Number} year cover  year to bring geometry
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
            FROM geo_hf_tropical_dry_forest as ghtdf
            WHERE ?? = ? AND hf_year = ?
          ) as f
        ) as fc`,
        [columnName[geofence], geofenceId, year],
      )
      .then((layers) => layers.rows[0].collection);
  },
});
