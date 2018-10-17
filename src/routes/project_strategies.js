const { Router } = require('restify-router');

/**
 * @apiDefine companiesProjectsStrategies Companies/Projects/Strategies
 * Queries and actions directly related with projects strategies selected inside a project
 */

/**
 * @apiDefine createStrategyExampleUsage
 * @apiParamExample {json} Request-Example:
 *  {
 *    "id_biome": 178,
 *    "id_ea": "CORPOBOYACA",
 *    "id_subzone": 2403,
 *    "id_strategy": 10,
 *    "area": 150,
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
 *    "id_subzone": 2403,
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
 *      "id_subzone": 2403,
 *      "id_strategy": 10,
 *      "area": 150,
 *      "id_project": 11,
 *      "id_user": 1
 *    }...
 *  ]
 */

module.exports = (errorHandler, projectStrategyService) => {
  const router = new Router();

  /**
   * @apiGroup companiesProjectsStrategies
   * @api {post} /companies/:id_company/projects/:id_project/strategies createProjectStrategy
   * @apiName createProjectStrategy
   * @apiVersion 0.1.0
   * @apiDescription
   * Create a new strategy as part of the selected strategies of the given project
   *
   * @apiParam (query) {Number} id_company project's owner id
   * @apiParam (query) {Number} id_project project associated with this strategy
   *
   * @apiParam (body) {Object} strategy strategy to be created
   * @apiParam (body) {Number} strategy.id_biome biome to associate with the strategy
   * @apiParam (body) {String} strategy.id_ea environmental authority to associate with the strategy
   * @apiParam (body) {Number} strategy.id_subzone 'subzona hidrográfica' to associate with the
   *  strategy
   * @apiParam (body) {Number} strategy.id_strategy strategy to associate with
   * @apiParam (body) {Number} strategy.area area (in ha) included with this strategy
   * @apiParam (body) {Number} strategy.id_user user that created the strategy
   * @apiParam (body) {String} [strategy.area_status] ???
   *
   * @apiSuccess {Object} strategy new strategy
   * @apiSuccess {Number} strategy.id newly created strategy id
   * @apiSuccess {Number} strategy.id_biome biome to associate with the strategy
   * @apiSuccess {String} strategy.id_ea environmental authority to associate with the strategy
   * @apiSuccess {Number} strategy.id_subzone 'subzona hidrográfica' to associate with the
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
    projectStrategyService.createStrategy(req.params.id_project, req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup companiesProjectsStrategies
   * @api {get} /companies/:id_company/projects/:id_project/strategies listProjectStrategies
   * @apiName listProjectStrategies
   * @apiVersion 0.1.0
   * @apiDescription
   * List all saved (selected) strategies associated with the given project
   *
   * @apiParam {Number} id_company project's owner id
   * @apiParam {Number} id_project project id
   *
   * @apiSuccess {Object[]} strategies list of strategies
   * @apiSuccess {Number} strategies.id strategy id
   * @apiSuccess {Number} strategies.id_biome biome associated with the strategy
   * @apiSuccess {String} strategies.id_ea environmental authority associated with the strategy
   * @apiSuccess {Number} strategies.id_subzone 'subzona hidrográfica' associated with the
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
    projectStrategyService.listStrategies(1, req.params.id_project)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup companiesProjectsStrategies
   * @api {get} /companies/:id_company/projects/:id_project/strategies/download
   *  downloadSelectedStrategies
   * @apiName downloadSelectedStrategies
   * @apiVersion 0.1.0
   * @apiDescription
   * Generate a GeoJson file that includes all selected strategies information for a given project
   *
   * @apiParam {Number} id_company project's owner id
   * @apiParam {Number} id_project project id
   *
   * @apiSuccess {File} strategies.geojson GeoJson file with selected strategies as features
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/strategies/download
   */
  router.get('/companies/:id_company/projects/:id_project/strategies/download', errorHandler((req, res, next) => (
    projectStrategyService.getSelectedStrategiesGeoJson(req.params.id_project)
      .then((result) => {
        res.header('Content-Disposition', 'attachment; filename=strategies.geojson');
        res.send(result);
        next();
      })
  )));

  return router;
};
