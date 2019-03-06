const { Router } = require('restify-router');

/**
 * @apiDefine basins Basins
 * Endpoints related with basins (areas, zones and subzones)
 */

/**
 * @apiDefine getAllBasinAreasExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id": "3",
 *      "name": "Orinoco"
 *    },
 *    {
 *      "id": "4",
 *      "name": "Amazonas"
 *    }...
 *  ]
 */

/**
 * @apiDefine getAllBasinZonesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id": "55",
 *      "name": "Baudó - Directos Pacifico",
 *      "id_basin": "5"
 *    },
 *    {
 *      "id": "52",
 *      "name": "Patía",
 *      "id_basin": "5"
 *    }...
 *  ]
 */

/**
 * @apiDefine getAllBasinSubzonesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *   {
 *      "id": "2626",
 *      "name": "Directos Bajo Cauca - Cga La Raya entre río Nechí",
 *      "id_zone": "25",
 *      "id_basin": "2"
 *
 *    },
 *    {
 *      "id": "3703",
 *      "name": "Río Cobugón - Río Cobaría",
 *      "id_zone": "37",
 *      "id_basin": "3"
 *    },
 *  ]
 */

module.exports = (errorHandler, basinAreaService, basinZoneService, basinSubzoneService) => {
  const router = new Router();

  /**
   * @apiGroup basins
   * @api {get} /basinAreas listBasinAreas
   * @apiName listBasinAreas
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin areas
   *
   * @apiSuccess {Object[]} basin_areas list of basin areas
   * @apiSuccess {Number} basin_areas.id basin area id
   * @apiSuccess {String} basin_areas.name basin area name
   *
   * @apiExample {curl} Example usage:
   *  /basinAreas
   * @apiUse getAllBasinAreasExample
   */
  router.get('/basinAreas', errorHandler((req, res, next) => (
    basinAreaService.getAll()
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinZones listBasinZones
   * @apiName listBasinZones
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin zones
   *
   * @apiSuccess {Object[]} basin_zones list of basin zones
   * @apiSuccess {Number} basin_zones.id basin zone id
   * @apiSuccess {String} basin_zones.name basin zone name
   * @apiSuccess {Number} basin_zones.id_basin associated basin area id
   *
   * @apiExample {curl} Example usage:
   *  /basinZones
   * @apiUse getAllBasinZonesExample
   */
  router.get('/basinZones', errorHandler((req, res, next) => (
    basinZoneService.getAll()
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup basins
   * @api {get} /basinSubzones listBasinSubzones
   * @apiName listBasinSubzones
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin sub-zones
   *
   * @apiSuccess {Object[]} basin_sub-zones list of basin sub-zones
   * @apiSuccess {Number} basin_sub-zones.id basin subzone id
   * @apiSuccess {String} basin_sub-zones.name basin subzone name
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

  return router;
};
