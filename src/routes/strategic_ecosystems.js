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

/**
 * @apiDefine getSEEAreasExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "national": {
 *      "area": "5186810.392899169149790",
 *      "percentage": 0.03940417069610631,
 *      "type": "Páramo"
 *    },
 *    "coverage": [
 *      {
 *        "area": "8581.742692436169604",
 *        "type": null,
 *        "percentage": 0.001654531791673881
 *      },
 *      {
 *        "area": "4592763.290127411739298",
 *        "type": "N",
 *        "percentage": 0.8854696706120165
 *      }
 *    ],
 *    "pa": [
 *      {
 *        "area": "305237.610769660272561",
 *        "type": "Parques Naturales Regionales",
 *        "percentage": 0.05884880835195666
 *      },
 *      {
 *        "area": "124855.386721879434100",
 *        "type": "Distritos Regionales de Manejo Integrado",
 *        "percentage": 0.02407170828777712
 *      }
 *    ]
 *  }
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

  /**
   * @apiGroup se
   * @api {get} /se/areas/:ecosystem areasByEcosystem
   * @apiName areasByEcosystem
   * @apiVersion 0.1.0
   * @apiDescription
   * List the areas of a given ecosystem (#se:listPrimarySE)
   *
   * @apiParam (path) {String} ecosystem ecosystem type to get areas information. Accepted values:
   * Páramo, Humedal, Bosque Seco Tropical (results from
   * <a href="#api-se-listPrimarySE">listPrimarySE</a> endpoint)
   *
   * @apiSuccess {Object} result object with the different areas for the given ecosystem
   * @apiSuccess {Object} result.national national information for the ecosystem
   * @apiSuccess {Number} result.national.area national area of the ecosystem
   * @apiSuccess {Number} result.national.percentage percentage of the ecosystem at national level
   * @apiSuccess {String} result.national.type the inserted ecosystem
   * @apiSuccess {Object[]} result.coverage coverage information for the ecosystem
   * @apiSuccess {Number} result.coverage.percentage coverage percentage for the ecosystem
   * @apiSuccess {String} result.coverage.type coverage type
   * @apiSuccess {Object[]} result.pa information about protected areas for the ecosystem
   * @apiSuccess {Number} result.pa.percentage protected area percentage for the ecosystem
   * @apiSuccess {String} result.pa.type protected area type
   *
   * @apiExample {curl} Example usage:
   *  /se/areas/Páramo
   * @apiUse getSEEAreasExample
   */
  router.get('/se/areas/:ecosystem', errorHandler((req, res, next) => {
    seService.getAreasByEcosystem(req.params.ecosystem)
      .then((result) => {
        res.send(result);
        next();
      });
  }));

  return router;
};
