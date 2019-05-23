const { Router } = require('restify-router');

/**
 * @apiDefine getAllBasinSubzonesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *   {
 *      "id_subzone": "2626",
 *      "name_subzo": "Directos Bajo Cauca - Cga La Raya entre río Nechí",
 *      "id_basin": "2"
 *    },
 *    {
 *      "id_subzone": "3703",
 *      "name_subzo": "Río Cobugón - Río Cobaría",
 *      "id_basin": "3"
 *    },
 *  ]
 */

module.exports = (errorHandler, basinSubzoneService) => {
  const router = new Router();

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones listBasinSubzones
   * @apiName listBasinSubzones
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin sub-zones
   *
   * @apiSuccess {Object[]} basin_sub-zones list of basin sub-zones
   * @apiSuccess {Number} basin_sub-zones.id_subzone basin subzone id
   * @apiSuccess {String} basin_sub-zones.name_subzo basin subzone name
   * @apiSuccess {Number} basin_sub-zones.id_basin associated basin area id
   * @apiSuccess {Number} basin_sub-zones.id_zone associated basin zone id
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones
   * @apiUse getAllBasinSubzonesExample
   */
  router.get('/basinSubzones', errorHandler((req, res, next) => (
    basinSubzoneService.getAll()
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones/:subzone_id/se SubzoneBySE
   * @apiName SubzoneBySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the basin subzone total area by strategic ecosystems
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the subzone
   * @apiSuccess {Number} result.percentage Percentage of the specified SE respect to the subzone.
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/se
   * @apiUse GeofenceBySEExample
   */
  router.get('/basinSubzones/:subzone_id/se', errorHandler((req, res, next) => (
    basinSubzoneService.getAreaBySE(req.params.subzone_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones/:subzone_id/se/:se_type SEDetailInSubzone
   * @apiName SEDetailInSubzone
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific basin subzone, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam {String} state_id state id
   * @apiParam {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.national_percentage strategic ecosystem inside basin subzone
   *  percentage with respect to the national area
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/se/Páramo
   * @apiUse SEInsideGeofenceDetailExample
   */
  router.get('/basinSubzones/:subzone_id/se/:se_type', errorHandler((req, res, next) => (
    basinSubzoneService.getSEDetails(req.params.subzone_id, req.params.se_type)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones/:subzone_id/se/:se_type/coverage SECoverageInSubzone
   * @apiName SECoverageInSubzone
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific basin subzone, get the coverage
   * distribution in that area
   *
   * @apiParam {String} subzone_is basin subzone id
   * @apiParam {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/se/Páramo/coverage
   * @apiUse GeofenceByCoverageExample
   */
  router.get('/basinSubzones/:subzone_id/se/:se_type/coverage', errorHandler((req, res, next) => (
    basinSubzoneService.getCoverageInSE(req.params.subzone_id, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones/:subzone_id/pa SubzoneByPA
   * @apiName SubzoneByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the basin subzone total area by protected areas
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the subzone.
   * @apiSuccess {Number} result.area Area of the specified protected area in the subzone
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/pa
   * @apiUse GeofenceByPAExample
   */
  router.get('/basinSubzones/:subzone_id/pa', errorHandler((req, res, next) => (
    basinSubzoneService.getAreaByPA(req.params.subzone_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones/:subzone_id/coverage SubzoneByCoverage
   * @apiName SubzoneByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the basin subzone total area by coverage type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the coverage respect to the subzone.
   * @apiSuccess {Number} result.area Area of the coverage area in the subzone
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/coverage
   * @apiUse GeofenceByCoverageExample
   */
  router.get('/basinSubzones/:subzone_id/coverage', errorHandler((req, res, next) => (
    basinSubzoneService.getAreaByCoverage(req.params.subzone_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup basinSubzones
   * @api {get} /basinSubzones/layers/national BasinSubzoneNationalLayer
   * @apiName BasinSubzoneNationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by basin subzones
   *
   * **The response is a GeoJson object, only the first level will be described here**
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type The geometry type
   * @apiSuccess {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess {Object[]} result.features features information (id, type, properties, etc)
   * @apiSuccess {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get('/basinSubzones/layers/national', errorHandler((req, res, next) => (
    basinSubzoneService.getNationalLayer()
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  return router;
};
