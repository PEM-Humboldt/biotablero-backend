const { Router } = require('restify-router');

/**
 * @apiDefine se Strategic Ecosystems
 * Strategic Ecosystems endpoints
 */

/**
 * @apiDefine getSETypesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "type": "Páramos"
 *    },
 *    {
 *      "type": "Humedales"
 *    },
 *    {
 *      "type": "Bosques secos"
 *    }
 *  ]
 */

/**
 * @apiDefine getParamosExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *  ]
 */

/**
 * @apiDefine getDryForestsExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *  ]
 */

/**
 * @apiDefine getWetlandsExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *  ]
 */

module.exports = (errorHandler, seService) => {
  const router = new Router();

  /**
   * @apiGroup se
   * @api {get} /se/types listSETypes
   * @apiName listSETypes
   * @apiVersion 0.1.0
   * @apiDescription
   * List available types for strategic ecosystems
   *
   * @apiSuccess {Object[]} result list of strategic ecosystems types
   * @apiSuccess {String} result.result strategic ecosystem type
   *
   * @apiExample {curl} Example usage:
   *  /se/types
   * @apiUse getSETypesExample
   */
  router.get('/se/types', errorHandler((req, res, next) => {
    const types = [
      { id: 'paramo', type: 'Páramos' },
      { id: 'wetland', type: 'Humedales' },
      { id: 'tropical_dry_forest', type: 'Bosques secos' },
    ];
    res.send(types);
    next();
  }));

  /**
   * @apiGroup se
   * @api {get} /se/paramos listParamos
   * @apiName listParamos
   * @apiVersion 0.1.0
   * @apiDescription
   * List paramos
   *
   * @apiSuccess {Object[]} result list of paramos
   * @apiSuccess {String} result.id_ecosystem strategic ecosystem id
   * @apiSuccess {String} result.name strategic ecosystem name
   * @apiSuccess {String} result.second_class strategic ecosystem second_class
   *
   * @apiExample {curl} Example usage:
   *  /se/paramos
   * @apiUse getParamosExample
   */
  router.get('/se/paramos', errorHandler((req, res, next) => {
    seService.getParamos()
      .then((result) => {
        res.send(result);
        next();
      });
  }));

  /**
   * @apiGroup se
   * @api {get} /se/dryForest listTropicalDryForest
   * @apiName listTropicalDryForest
   * @apiVersion 0.1.0
   * @apiDescription
   * List tropical dry forests
   *
   * @apiSuccess {Object[]} result list of tropical dry forests
   * @apiSuccess {String} result.id_ecosystem strategic ecosystem id
   * @apiSuccess {String} result.name strategic ecosystem name
   * @apiSuccess {String} result.second_class strategic ecosystem second_class
   *
   * @apiExample {curl} Example usage:
   *  /se/dryForest
   * @apiUse getDryForestsExample
   */
  router.get('/se/dryForest', errorHandler((req, res, next) => {
    seService.getDryForests()
      .then((result) => {
        res.send(result);
        next();
      });
  }));

  /**
   * @apiGroup se
   * @api {get} /se/wetlands listWetlands
   * @apiName listWetlands
   * @apiVersion 0.1.0
   * @apiDescription
   * List wetlands
   *
   * @apiSuccess {Object[]} result list of wetlands
   * @apiSuccess {String} result.id_ecosystem strategic ecosystem id
   * @apiSuccess {String} result.name strategic ecosystem name
   * @apiSuccess {String} result.second_class strategic ecosystem second_class
   *
   * @apiExample {curl} Example usage:
   *  /se/wetlands
   * @apiUse getWetlandsExample
   */
  router.get('/se/wetlands', errorHandler((req, res, next) => {
    seService.getWetlands()
      .then((result) => {
        res.send(result);
        next();
      });
  }));

  return router;
};
