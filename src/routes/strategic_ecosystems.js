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
 *      "area": 123456789,
 *      "percentage": 0.45,
 *      "type": "Páramo"
 *    },
 *    "coverage": [
 *      {
 *        "percentage": 0.25,
 *        "type": "narutal"
 *      },
 *      {
 *        "percentage": 0.1,
 *        "type": "transformed"
 *      }
 *    ],
 *    "pa": [
 *      {
 *        "percentage": 0.04,
 *        "category": "Reserva Natural de la Sociedad Civil"
 *      },
 *      {
 *        "percentage": 0.1,
 *        "category": "Parque Nacional Natural"
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
   * List the areas of a given ecosystem
   *
   * @apiSuccess {Object} result object with the different areas for the given ecosystem
   * @apiSuccess {Object} result.national natioanl information for the ecosystem
   * @apiSuccess {Number} result.national.area natioanl area of the ecosystem
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
