const { Router } = require('restify-router');

/**
 * @apiDefine comp_strategies Compensation > Strategies
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
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "strategies": [
 *      {
 *        "area_ha": 8546.040000000005,
 *        "id": "2",
 *        "strategy_name": "Preservación dentro de áreas declaradas"
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
 *            "id_strategy": 7
 *          },
 *          "geometry": {...}
 *        }...
 *      ]
 *    }
 *  }
 */
module.exports = (strategiesService) => {
  const router = new Router();

  /**
   * @apiGroup comp_strategies
   * @api {post} /strategies/biomeSubzoneEA listStrategiesByBiomeSubzoneEA
   * @apiName listStrategiesByBiomeSubzoneEA
   * @apiVersion 2.0.0
   * @apiDescription
   * List all strategies filtered by biome, sub-basin and environmental authority.
   *  They are grouped by strategy type (id)
   *
   * **Some of the response properties are GeoJson standard properties, so they are not
   * described here.**
   *
   * @apiParam (Body params) {Number} id_biome biome id
   * @apiParam (Body params) {Number} id_subzone sub-basin id
   * @apiParam (Body params) {String} id_ea environmental authority id
   *
   * @apiSuccess {Object} object response
   * @apiSuccess {Object[]} object.strategies array of strategies information
   * @apiSuccess {Number} object.strategies.id strategy id
   * @apiSuccess {Number} object.strategies.area_ha total area for this strategy
   * @apiSuccess {Number} object.strategies.strategy_name strategy name
   * @apiSuccess {Object} object.geometry geometry geoJson object
   * @apiSuccess {Object[]} object.geometry.features information and geometry for each strategy
   *
   * @apiExample {curl} Example usage:
   *  /strategies/biomeEASubzone
   * @apiUse listStrategiesByBiomeEASubzoneExampleUsage
   * @apiUse listStrategiesByBiomeEASubzoneExampleResponse
   */
  router.post('/strategies/biomeSubzoneEA', (req, res, next) =>
    strategiesService
      .getByBiomeSubzoneEA(req.body.id_biome, req.body.id_subzone, req.body.id_ea)
      .then((strategies) => {
        res.send(strategies);
        next();
      }),
  );

  return router;
};
