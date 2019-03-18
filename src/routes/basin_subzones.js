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
   * @api {get} /basinSubzones/:subzone_id/pa SubzoneByPA
   * @apiName SubzoneByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the basin subzone total area by protected areas
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the subzone.
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

  return router;
};
