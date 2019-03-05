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
 *      "id_basin": "3",
 *      "name_basin": "Orinoco"
 *    },
 *    {
 *      "id_basin": "4",
 *      "name_basin": "Amazonas"
 *    }...
 *  ]
 */

/**
 * @apiDefine getAllBasinZonesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_zone": "55",
 *      "name_zone": "Baudó - Directos Pacifico",
 *      "id_basin": "5"
 *    },
 *    {
 *      "id_zone": "52",
 *      "name_zone": "Patía",
 *      "id_basin": "5"
 *    }...
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
   * @apiSuccess {Number} basin_areas.id_basin basin area id
   * @apiSuccess {String} basin_areas.name_basin basin area name
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
   * @apiSuccess {Number} basin_zones.id_zone basin zone id
   * @apiSuccess {String} basin_zones.name_zone basin zone name
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

  return router;
};
