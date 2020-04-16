const { Router } = require('restify-router');

/**
 * @apiDefine biomes Biomes
 * Endpoints related with queries about biomes
 */

/**
 * @apiDefine getBiomesByEAExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "gid": 252,
 *          "name_biome": "Hidrobioma Magdalena medio y depresión momposina"
 *          "id_biome": 41,
 *          "compensation_factor": 6.5
 *        },
 *        "geometry": {
 *          "type": "MultiPolygon",
 *          "coordinates": [...]
 *        }
 *      },...
 *    ]
 *  }
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
   * @api {get} /biomes/ea/:ea_name getBiomesByEA
   * @apiName getBiomesByEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all biomes that belong to the given environmental authority.
   *
   * @apiParam {String} ea_id environmental authority id to filter biomes
   *
   * @apiSuccess (geojson) {Object} result GeoJSONJ object
   * @apiSuccess (geojson) {Object} result.features.properties Specific properties for each feature
   * @apiSuccess (geojson) {Number} result.features.properties.gid feature id
   * @apiSuccess (geojson) {String} result.features.properties.name_biome biome name
   * @apiSuccess (geojson) {Number} result.features.properties.id_biome biome id
   * @apiSuccess (geojson) {Number} result.features.properties.compensation_factor biome CF
   *
   * @apiExample {curl} Example usage:
   *  /biomes/ea/CORPOBOYACA
   * @apiUse getBiomesByEAExample
   */
  router.get('/biomes/ea/:ea_id', errorHandler((req, res, next) => (
    biomeService.getBiomeByEA(req.params.ea_id)
      .then((biomes) => {
        res.send(biomes);
        next();
      })
  )));

  /**
   * @apiGroup biomes
   * @api {get} /biomes getAllBiomes
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
  router.get('/biomes', errorHandler((req, res, next) => (
    biomeService.getAll()
      .then((biomes) => {
        res.send(biomes);
        next();
      })
  )));

  return router;
};
