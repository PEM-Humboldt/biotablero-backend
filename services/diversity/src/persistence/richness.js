module.exports = db => ({
  /**
   * Find the layer for the number of species in the given area of the given group
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   * @param {String} group group to select the proper layer, options are: 'total', 'endemic',
   * 'invasive', 'threatened'.
   *
   * @returns {Binary} Image with the geometry
   */
  getAreaLayer: (geometry, filename) => (
    db.raw(
      `
      SELECT ST_AsPNG(
        ST_ColorMap(
          ST_Clip(
            (SELECT ST_union(rast)
              FROM geo_raster
              WHERE filename = ?
              AND ST_Intersects(rast, ST_GeomFromGeoJSON(?))
            ),
            ST_GeomFromGeoJSON(?),
            TRUE
          ),
          '100% 251 38 0 200
          0% 255 246 0 200
          nv 0 0 0 0
          '
        )
      ) as image;
      `,
      [filename, geometry, geometry],
    )
      .then(rast => rast.rows[0].image)
      .catch()
  ),
});
