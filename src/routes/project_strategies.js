const { Router } = require('restify-router');

/**
 * @apiDefine createStrategyExampleUsage
 * @apiParamExample {json} Request-Example:
 *  {
 *    "id_biome": 178,
 *    "id_ea": "CORPOBOYACA",
 *    "id_h_subzone": 2403,
 *    "id_strategy": 10,
 *    "area": 150,
 *    "id_project": 11,
 *    "id_user": 1
 *  }
 */

/**
 * @apiDefine createStrategyExampleResponse
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "id": 4,
 *    "id_biome": 178,
 *    "id_ea": "CORPOBOYACA",
 *    "id_h_subzone": 2403,
 *    "id_strategy": 10,
 *    "area": 150,
 *    "id_project": 11,
 *    "id_user": 1
 *  }
 */

module.exports = (errorHandler, strategy) => {
  const router = new Router();

  /**
   * @apiGroup projectStrategies
   * @api {post} /projectStrategies createStrategy
   * @apiName createStrategy
   * @apiVersion 0.1.0
   * @apiDescription
   * Create a new strategy
   *
   * @apiParam {Object} strategy strategy to be created
   * @apiParam {Number} strategy.id_biome biome to associate with the strategy
   * @apiParam {String} strategy.id_ea environmental authority to associate with the strategy
   * @apiParam {Number} strategy.id_h_subzone 'subzona hidrográfica' to associate with the strategy
   * @apiParam {Number} strategy.id_strategy strategy to associate with
   * @apiParam {Number} strategy.area area included with this strategy
   * @apiParam {Number} strategy.id_project project associated with this strategy
   * @apiParam {Number} strategy.id_user user that created the strategy
   * @apiParam {String} strategy.area_status ???
   *
   * @apiExample {curl} Example usage:
   *  /projectStrategies
   * @apiUse createStrategyExampleUsage
   * @apiUse createStrategyExampleResponse
   */
  router.post('/projectStrategies', errorHandler((req, res, next) => (
    strategy.createStrategy(req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  return router;
};
