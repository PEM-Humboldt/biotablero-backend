module.exports = (bookshelfConn, { BiomeByEA }) => {
  const { knex } = bookshelfConn;

  return {
    /**
     * Select biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @return {Array} JSON Objects
     */
    findBiomeByEA: envAuthority => (
      BiomeByEA
        .where('id_ea', envAuthority)
        .fetchAll({
          columns: ['gid', 'name_biome', 'id_ea', knex.raw('ST_AsGeoJSON(geom) as "geomGeoJSON"')],
        })
        .then(results => results.toJSON())
    ),
  };
};
