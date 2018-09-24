const topojson = require('topojson');

module.exports = biomePersistence => ({
  getBiomeByEA: envAuthority => (
    biomePersistence.findBiomeByEA(envAuthority)
      .then(biomes => (
        biomes.map(({ geomGeoJSON, ...others }) => ({
          ...others,
          geomTopoJSON: topojson.topology({ geomTopoJSON: JSON.parse(geomGeoJSON) }),
        }))
      ))
  ),
});
