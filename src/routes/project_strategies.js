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

/**
 * @apiDefine listStrategiesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id": 4,
 *      "id_biome": 178,
 *      "id_ea": "CORPOBOYACA",
 *      "id_h_subzone": 2403,
 *      "id_strategy": 10,
 *      "area": 150,
 *      "id_project": 11,
 *      "id_user": 1
 *    }...
 *  ]
 */

module.exports = (errorHandler, strategy) => {
  const router = new Router();

  /**
   * @apiGroup companies/projects/strategies
   * @api {post} /companies/:id_company/projects/:id_project/strategies createStrategy
   * @apiName createStrategy
   * @apiVersion 0.1.0
   * @apiDescription
   * Create a new strategy associated to the given project
   *
   * @apiParam (query) {Number} id_company project's owner id
   * @apiParam (query) {Number} id_project project id
   *
   * @apiParam (body) {Object} strategy strategy to be created
   * @apiParam (body) {Number} strategy.id_biome biome to associate with the strategy
   * @apiParam (body) {String} strategy.id_ea environmental authority to associate with the strategy
   * @apiParam (body) {Number} strategy.id_h_subzone 'subzona hidrográfica' to associate with the
   *  strategy
   * @apiParam (body) {Number} strategy.id_strategy strategy to associate with
   * @apiParam (body) {Number} strategy.area area (in ha) included with this strategy
   * @apiParam (body) {Number} strategy.id_project project associated with this strategy
   * @apiParam (body) {Number} strategy.id_user user that created the strategy
   * @apiParam (body) {String} [strategy.area_status] ???
   *
   * @apiSuccess {Object} strategy new strategy
   * @apiSuccess {Number} strategy.id newly created strategy id
   * @apiSuccess {Number} strategy.id_biome biome to associate with the strategy
   * @apiSuccess {String} strategy.id_ea environmental authority to associate with the strategy
   * @apiSuccess {Number} strategy.id_h_subzone 'subzona hidrográfica' to associate with the
   *  strategy
   * @apiSuccess {Number} strategy.id_strategy strategy to associate with
   * @apiSuccess {Number} strategy.area area (in ha) included with this strategy
   * @apiSuccess {Number} strategy.id_project project associated with this strategy
   * @apiSuccess {Number} strategy.id_user user that created the strategy
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/strategies
   * @apiUse createStrategyExampleUsage
   * @apiUse createStrategyExampleResponse
   */
  router.post('/companies/:id_company/projects/:id_project/strategies', errorHandler((req, res, next) => (
    strategy.createStrategy(req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup companies/projects/strategies
   * @api {get} /companies/:id_company/projects/:id_project/strategies listStrategies
   * @apiName listStrategies
   * @apiVersion 0.1.0
   * @apiDescription
   * List all saved strategies (belonging to the user making the request).
   *
   * @apiParam {Number} id_company project's owner id
   * @apiParam {Number} id_project project id
   *
   * @apiSuccess {Object[]} strategies list of strategies
   * @apiSuccess {Number} strategies.id strategy id
   * @apiSuccess {Number} strategies.id_biome biome associated with the strategy
   * @apiSuccess {String} strategies.id_ea environmental authority associated with the strategy
   * @apiSuccess {Number} strategies.id_h_subzone 'subzona hidrográfica' associated with the
   *  strategy
   * @apiSuccess {Number} strategies.id_strategy strategy id
   * @apiSuccess {Number} strategies.area strategy area
   * @apiSuccess {Number} strategies.id_project project associated with this strategy
   * @apiSuccess {Number} strategies.id_user user that created the strategy
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/strategies
   * @apiUse listStrategiesExample
   */
  router.get('/companies/:id_company/projects/:id_project/strategies', errorHandler((req, res, next) => (
    // TODO: when authorization is available get user id from header
    // TODO: Authentication should verify user is from the given company
    strategy.listStrategies(1, req.params.id_project)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  return router;
};
