module.exports = db => ({
  getAreaLayer: geometry => (
    db.raw(
      `
      SELECT ST_AsPNG(
        ST_ColorMap(
          ST_Clip(
            (Select rast FROM copy),
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
      [geometry],
    )
      .then(rast => rast.rows[0].image)
      .catch()
  ),
});
