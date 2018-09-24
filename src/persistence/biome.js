module.exports = (bookshelfConn, { BiomeByEA }) => {
  const { knex } = bookshelfConn;

  return {
    findBiomeByEA: envAuthority => (
      BiomeByEA
        .where('id_ea', envAuthority)
        .fetchAll({ columns: ['gid', 'name_biome', 'id_ea', knex.raw('ST_AsGeoJSON(geom) as "geomGeoJSON"')] })
        .then(results => results.toJSON())
        .catch(e => console.log('error:', e)) // TODO Replace console.log for a real logger
    ),
  };
};
