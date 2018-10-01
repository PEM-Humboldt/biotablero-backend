const { Router } = require('restify-router');

/**
 * @apiDefine getBiomeByEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "gid": 252,
 *      "name_biome": "Hidrobioma Magdalena medio y depresión momposina",
 *      "id_ea":"CORPOBOYACA",
 *      "geomTopoJSON": {...}
 *    }
 *  ]
 */

module.exports = (errorHandler, biome) => {
  const router = new Router();

  /**
   * @apiGroup geofences
   * @api {get} /geofences/ea/:ea_name getBiomeByEA
   * @apiName getBiomeByEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all biomes that belong to the given environmental authority
   *
   * @apiParam {String} ea_name environmental authority to filter biomes
   *
   * @apiSuccess {Object[]} biome biome information
   * @apiSuccess {Number} biome.gid biome id
   * @apiSuccess {String} biome.name_biome biome name
   * @apiSuccess {String} biome.id_ea env authority id
   * @apiSuccess {Object} biome.geomTopoJSON biome geometry in topoJson
   *
   * @apiExample {curl} Example usage:
   *  /geofences/ea/CORPOBOYACA
   * @apiUse getBiomeByEAExample
   */
  router.get('/geofences/ea/:ea_name', errorHandler((req, res, next) => (
    biome.getBiomeByEA(req.params.ea_name)
      .then((biomes) => {
        res.send(biomes);
        next();
      })
  )));

  return router;
};
