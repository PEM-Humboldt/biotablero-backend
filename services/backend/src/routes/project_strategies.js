const { Router } = require('restify-router');

/**
 * @apiDefine comp_companiesProjectsStrategies Compensation > Companies/Projects/Strategies
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
 *      "id": 54,
 *      "id_biome": 201,
 *      "id_ea": "CVC",
 *      "id_subzone": 5311,
 *      "id_strategy": 1,
 *      "area": "10.00",
 *      "id_project": 1,
 *      "id_user": "1",
 *      "biome": {
 *        "id_biome": 201,
 *        "name": "Orobioma Azonal Subandino Cauca medio"
 *      },
 *      "ea": {
 *        "id_ea": "CVC",
 *        "name": "Corporacion Autonoma Regional del Valle del Cauca"
 *      },
 *      "szh": {
 *        "id_subzone": 5311,
 *        "name_subzone": "Dagua - Buenaventura - Bahia Málaga"
 *      },
 *      "strategy": {
 *        "id_strategy": 1,
 *        "strategy": "Áreas de interes regional para la posible declaración de áreas protegidas"
 *      }
 *    }...
 *  ]
 */

module.exports = (errorHandler, projectStrategyService) => {
  const router = new Router();

  /**
   * @apiGroup comp_companiesProjectsStrategies
   * @api {post} /companies/:id_company/projects/:id_project/strategies createProjectStrategy
   * @apiName createProjectStrategy
   * @apiVersion 0.1.0
   * @apiDescription
   * Create a new strategy as part of the selected strategies of the given project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project associated with this strategy
   *
   * @apiParam (Body Params) {Object} strategy strategy to be created
   * @apiParam (Body Params) {Number} strategy.id_biome biome to associate with the strategy
   * @apiParam (Body Params) {String} strategy.id_ea environmental authority to associate with the
   * strategy
   * @apiParam (Body Params) {Number} strategy.id_subzone 'subzona hidrográfica' to associate with
   * the strategy
   * @apiParam (Body Params) {Number} strategy.id_strategy strategy to associate with
   * @apiParam (Body Params) {Number} strategy.area area (in ha) included with this strategy
   * @apiParam (Body Params) {Number} strategy.id_user user that created the strategy
   * @apiParam (Body Params) {String} [strategy.area_status] ???
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
  router.post('/companies/:id_company/projects/:id_project/strategies', errorHandler(
    (req, res, next) => (
      projectStrategyService.createStrategy(req.params.id_project, req.body)
        .then((result) => {
          res.send(result);
          next();
        })
    ),
  ));

  /**
   * @apiGroup comp_companiesProjectsStrategies
   * @api {get} /companies/:id_company/projects/:id_project/strategies listProjectStrategies
   * @apiName listProjectStrategies
   * @apiVersion 0.1.0
   * @apiDescription
   * List all saved (selected) strategies associated with the given project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
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
   * @apiSuccess {Number} strategy.biome associated biome object
   * @apiSuccess {Number} strategy.biome.id_biome biome id
   * @apiSuccess {Number} strategy.biome.name biome name
   * @apiSuccess {Number} strategy.ea associated ea object
   * @apiSuccess {Number} strategy.ea.id_ea ea id
   * @apiSuccess {Number} strategy.ea.name ea name
   * @apiSuccess {Number} strategy.szh associated sub-basin object
   * @apiSuccess {Number} strategy.szh.id_szh sub-basin id
   * @apiSuccess {Number} strategy.szh.name sub-basin name
   * @apiSuccess {Number} strategy.strategy associated strategy object
   * @apiSuccess {Number} strategy.strategy.id_strategy strategy id
   * @apiSuccess {Number} strategy.strategy.name strategy name
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/strategies
   * @apiUse listStrategiesExample
   */
  router.get('/companies/:id_company/projects/:id_project/strategies', errorHandler(
    (req, res, next) => (
    // TODO: when authorization is available get user id from header
    // TODO: Authentication should verify user is from the given company
      projectStrategyService.listStrategies(1, req.params.id_project)
        .then((result) => {
          res.send(result);
          next();
        })
    ),
  ));

  /**
   * @apiGroup comp_companiesProjectsStrategies
   * @api {get} /companies/:id_company/projects/:id_project/strategies/download
   *  downloadSelectedStrategies
   * @apiName downloadSelectedStrategies
   * @apiVersion 0.1.0
   * @apiDescription
   * Generate a GeoJson file that includes all selected strategies information for a given project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
   *
   * @apiSuccess (geojson) {File} strategies.geojson GeoJson file with selected strategies as
   * features
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/strategies/download
   */
  router.get('/companies/:id_company/projects/:id_project/strategies/download', errorHandler(
    (req, res, next) => (
      projectStrategyService.getSelectedStrategiesGeoJson(req.params.id_project)
        .then((result) => {
          res.header('Content-Disposition', 'attachment; filename=strategies.geojson');
          res.send(result);
          next();
        })
    ),
  ));

  return router;
};
