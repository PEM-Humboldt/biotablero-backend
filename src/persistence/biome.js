module.exports = (db, { geoEaBiomes }) => ({
  /**
   * Select biomes by a given environmental authority.
   *
   * @param {String} envAuthority environmental authority name to filter by
   *
   * @return {Array} JSON Objects
   */
  findBiomeByEA: envAuthority => (
    geoEaBiomes
      .where('id_ea', envAuthority)
      .fetchAll({
        columns: ['gid', 'name_biome', 'id_ea', db.raw('ST_AsGeoJSON(geom) as "geomGeoJSON"')],
      })
      .then(results => results.toJSON())
  ),
});
