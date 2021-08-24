const { Router } = require('restify-router');

/**
 * @apiDefine seByPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.04,
 *      "category": "Reserva Natural de la Sociedad Civil"
 *    },
 *    {
 *      "percentage": 0.1,
 *      "category": "Parque Nacional Natural"
 *    }
 *  ]
 */
module.exports = (errorHandler, seService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_se
   * @api {get} /se listAll
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
   * @apiUse listAllExample
   */
  router.get(
    '/se',
    errorHandler((req, res, next) => {
      seService.getAll().then((se) => {
        res.send(se);
        next();
      });
    }),
  );

  /**
   * @apiGroup geofence_se
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
   * @apiUse listPrimarySEExample
   */
  router.get(
    '/se/primary',
    errorHandler((req, res, next) => {
      seService.getPrimary().then((result) => {
        res.send(result);
        next();
      });
    }),
  );

  /**
   * @apiGroup geofence_se
   * @api {get} /se/:ecosystem/national SEDetail
   * @apiName SEDetail
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the ecosystem national information
   *
   * @apiParam (Path params) {String} ecosystem ecosystem type to get. Accepted values: Páramo,
   * Humedal, Bosque Seco Tropical (results from <a href="#api-se-listPrimarySE">listPrimarySE</a>
   * endpoint)
   *
   * @apiSuccess {Object} result object with the given ecosystem national information
   * @apiSuccess {Number} result.area national area of the ecosystem
   * @apiSuccess {Number} result.percentage percentage of the ecosystem at national level
   * @apiSuccess {String} result.type the queried ecosystem
   *
   * @apiExample {curl} Example usage:
   *  /se/Páramo/national
   * @apiUse SEDetailExample
   */
  router.get(
    '/se/:ecosystem/national',
    errorHandler((req, res, next) => {
      seService.getEcosystemNatInfo(req.params.ecosystem).then((result) => {
        res.send(result);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_coverages
   * @api {get} /se/:ecosystem/coverage CoverageInSE
   * @apiName seByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the strategic ecosystem area separated by coverage
   *
   * @apiParam (Path params) {String} ecosystem ecosystem type to get. Accepted values: Páramo,
   * Humedal, Bosque Seco Tropical (results from <a href="#api-se-listPrimarySE">listPrimarySE</a>
   * endpoint)
   *
   * @apiSuccess {Object[]} result coverage information for the ecosystem
   * @apiSuccess {Number} result.percentage coverage percentage for the ecosystem
   * @apiSuccess {Number} result.area area for the given coverage inside the strategic ecosystem
   * @apiSuccess {String} result.type coverage type
   *
   * @apiExample {curl} Example usage:
   *  /se/Páramo/coverage
   * @apiUse CoverageInGeofenceExample
   */
  router.get(
    '/se/:ecosystem/coverage',
    errorHandler((req, res, next) => {
      seService.getSEByCoverage(req.params.ecosystem).then((result) => {
        res.send(result);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_protected_areas
   * @api {get} /se/:ecosystem/pa PAInSE
   * @apiName seByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the strategic ecosystem area separated by protected areas
   *
   * @apiParam (Path params) {String} ecosystem ecosystem type to get. Accepted values: Páramo,
   * Humedal, Bosque Seco Tropical (results from <a href="#api-se-listPrimarySE">listPrimarySE</a>
   * endpoint)
   *
   * @apiSuccess {Object[]} result information about protected areas for the ecosystem
   * @apiSuccess {Number} result.percentage protected area percentage for the ecosystem
   * @apiSuccess {Number} result.area area for the protected area inside the strategic ecosystem
   * @apiSuccess {String} result.type protected area type
   *
   * @apiExample {curl} Example usage:
   *  /se/Páramo/pa
   * @apiUse PAInGeofenceExample
   */
  router.get(
    '/se/:ecosystem/pa',
    errorHandler((req, res, next) => {
      seService.getSEByPA(req.params.ecosystem).then((result) => {
        res.send(result);
        next();
      });
    }),
  );

  /**
   * @apiGroup geofence_se
   * @api {get} /se/layers/national NationalLayer
   * @apiName SENationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by strategic ecosystems
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess (geojson) {Object[]} result.features features information (id, type, etc)
   * @apiSuccess (geojson) {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /se/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get(
    '/se/layers/national',
    errorHandler((req, res, next) =>
      seService.getNationalLayer().then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  return router;
};
