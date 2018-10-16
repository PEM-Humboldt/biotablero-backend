const { Router } = require('restify-router');

/**
 * @apiDefine strategies Strategies
 * Endpoints related with queries about strategies
 */

/**
 * @apiDefine listStrategiesByBiomeEASubzoneExampleUsage
 * @apiParamExample {json} Request-Example:
 *  {
 *    "id_biome": 284,
 *    "id_subzone": 3730
 *    "id_ea": "CORPOBOYACA",
 *  }
 */

/**
 * @apiDefine listStrategiesByBiomeEASubzoneExampleResponse
 * @apiSuccessExample {json} Request-Example:
 *  {
 *    "strategies": [
 *      {
 *        "gid": 538112,
 *        "area_ha": 426.15,
 *        "id_strategy": 10,
 *        "strategy": {
 *          "id_strategy": 10,
 *          "strategy": "No sugerido para compensar pérdidas de biodiversidad"
 *        }
 *      }...
 *    ],
 *    "geometry": {
 *      "type": "FeatureCollection",
 *      "features": [
 *        {
 *          "type": "Feature",
 *          "properties": {
 *            "gid": 538112,
 *            "area_ha": 426.15,
 *            "area_status": "Transformado",
 *            "strategy": "No sugerido para compensar pérdidas de biodiversidad"
 *          },
 *          "geometry": {...}
 *        }...
 *      ]
 *    }
 *  }
 */
module.exports = (errorHandler, strategiesService) => {
  const router = new Router();

  /**
   * @apiGroup strategies
   * @api {post} /strategies/biomeSubzoneEA listStrategiesByBiomeSubzoneEA
   * @apiName listStrategiesByBiomeSubzoneEA
   * @apiVersion 0.1.0
   * @apiDescription
   * List all strategies filtered by biome, sub-basin and environmental authority
   *
   * **Some of the response properties are GeoJson standard properties, so they are not
   * described here.**
   *
   * @apiParam (body) {Number} id_biome biome id
   * @apiParam (body) {Number} id_subzone sub-basin id
   * @apiParam (body) {String} id_ea environmental authority id
   *
   * @apiSuccess {Object} object response
   * @apiSuccess {Object[]} object.strategies array of strategies information
   * @apiSuccess {Number} object.strategies.gid strategy id
   * @apiSuccess {Number} object.strategies.area_ha area strategy area
   * @apiSuccess {Number} object.strategies.id_strategy strategy definition id
   * @apiSuccess {Object} object.strategies.strategy strategy definition object
   * @apiSuccess {Number} object.strategies.strategy.id_strategy strategy definition id
   * @apiSuccess {String} object.strategies.strategy.strategy strategy definition name
   * @apiSuccess {Object} object.geometry geometry geoJson object
   * @apiSuccess {Object[]} object.geometry.features information and geometry for each strategy
   *
   * @apiExample {curl} Example usage:
   *  /strategies/biomeEASubzone
   * @apiUse listStrategiesByBiomeEASubzoneExampleUsage
   * @apiUse listStrategiesByBiomeEASubzoneExampleResponse
   */
  router.post('/strategies/biomeSubzoneEA', errorHandler((req, res, next) => (
    strategiesService.getByBiomeSubzoneEA(req.body.id_biome, req.body.id_subzone, req.body.id_ea)
      .then((strategies) => {
        res.send(strategies);
        next();
      })
  )));

  return router;
};
