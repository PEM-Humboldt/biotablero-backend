const { Router } = require('restify-router');

module.exports = (biome) => {
  const router = new Router();

  router.get('/geofences/ea/:ea_name', (req, res, next) => {
    biome.getBiomeByEA(req.params.ea_name)
      .then((biomes) => {
        res.send(biomes);
        next();
      });
  });

  return router;
};