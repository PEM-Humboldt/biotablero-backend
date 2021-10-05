const { Router } = require('restify-router');

/**
 * @apiDefine biomes Biomes
 * Endpoints related with queries about biomes
 */

/**
 * @apiDefine getAllBiomesByEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_biome": 1,
 *      "name": "Halobioma Alta Guajira",
 *      "compensation_factor": "6.00",
 *      "general_name": "Halobioma",
 *      "release_date": null
 *    }...
 *  ]
 */
module.exports = (errorHandler, biomeService) => {
  const router = new Router();

  /**
   * @apiGroup biomes
   * @api {get} /biomes getAll
   * @apiName getAllBiomes
   * @apiVersion 0.1.0
   * @apiDescription
   * Get all biomes information (without geometry)
   *
   * @apiSuccess {Object[]} biomes list of biomes
   * @apiSuccess {Number} biomes.id_biome biome id
   * @apiSuccess {String} biomes.name biome name
   * @apiSuccess {Number} biomes.compensation_factor biome compensation factor
   * @apiSuccess {String} biomes.general_name biome full name
   * @apiSuccess {String} biomes.release_date biome release date
   *
   * @apiExample {curl} Example usage:
   *  /biomes
   * @apiUse getAllBiomesByEAExample
   */
  router.get(
    '/biomes',
    errorHandler((req, res, next) =>
      biomeService.getAll().then((biomes) => {
        res.send(biomes);
        next();
      }),
    ),
  );

  return router;
};
