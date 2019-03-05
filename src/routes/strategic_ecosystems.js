const { Router } = require('restify-router');

/**
 * @apiDefine se Strategic Ecosystems
 * Strategic Ecosystems endpoints
 */

/**
 * @apiDefine getSEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_ecosystem": "203",
 *      "name": "Páramo",
 *      "second_class": "test"
 *    },
 *    {
 *      "id_ecosystem": "2000",
 *      "name": "Bosque Seco Tropical",
 *      "second_class": "Sin información"
 *    }...
 *  ]
 */

/**
 * @apiDefine getPrimarySEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "name": "Páramo"
 *    },
 *    {
 *      "name": "Humedal"
 *    },
 *    {
 *      "name": "Bosque Seco Tropical"
 *    }
 *  ]
 */

module.exports = (errorHandler, seService) => {
  const router = new Router();

  /**
   * @apiGroup se
   * @api {get} /se listSE
   * @apiName listSE
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available strategic ecosystems
   *
   * @apiSuccess {Object[]} result list of strategic ecosystems
   * @apiSuccess {Number} result.id_ecosystem strategic ecosystem id
   * @apiSuccess {String} result.name strategic ecosystem name
   * @apiSuccess {String} result.second_class strategic ecosystem second_class
   *
   * @apiExample {curl} Example usage:
   *  /se
   * @apiUse getSEExample
   */
  router.get('/se', errorHandler((req, res, next) => {
    seService.getAll()
      .then((se) => {
        res.send(se);
        next();
      });
  }));

  /**
   * @apiGroup se
   * @api {get} /se/primary listPrimarySE
   * @apiName listPrimarySE
   * @apiVersion 0.1.0
   * @apiDescription
   * List only primary types of strategic ecosystems
   *
   * @apiSuccess {Object[]} result list of strategic ecosystems
   * @apiSuccess {String} result.name strategic ecosystem name
   *
   * @apiExample {curl} Example usage:
   *  /se/primary
   * @apiUse getPrimarySEExample
   */
  router.get('/se/primary', errorHandler((req, res, next) => {
    seService.getPrimary()
      .then((result) => {
        res.send(result);
        next();
      });
  }));

  return router;
};
