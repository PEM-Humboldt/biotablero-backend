const { Router } = require('restify-router');

/**
 * @apiDefine geofences Geofences
 * Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area
 * divided by some criterion, such as compensation factor, biomes or biotic units
 */

/**
 * @apiDefine EAByCompensationFactorExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "key": "4.5",
 *      "area": 9617.51
 *    },
 *    {
 *      "key": "5",
 *      "area": 2017.6419239507823
 *    },...
 *  ]
 */

/**
 * @apiDefine EAByBioticUnitExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "key": "Altoandino cordillera oriental",
 *      "area": 626680961.00
 *    },
 *    {
 *      "key": "Altoandino influencia llanera",
 *      "area": 163012538.00
 *    },...
 *  ]
 */

/**
 * @apiDefine EAByGeneralBiomeExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "key": "Helobioma",
 *      "area": 24402.0139
 *    },
 *    {
 *      "key": "Hidrobioma",
 *      "area": 20107.551
 *    },...
 *  ]
 */
module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup geofences
   * @api {get} /geofences/ea/:ea_id/compensationFactor EAByCompensationFactor
   * @apiName EAByCompensationFactor
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by compensation factor
   *
   * @apiParam {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key compensation factor value
   * @apiSuccess {Number} result.area total area for the associated compensation factor
   *
   * @apiExample {curl} Example usage:
   *  /geofences/ea/CORPOBOYACA/compensationFactor
   * @apiUse EAByCompensationFactorExample
   */
  router.get('/geofences/ea/:ea_id/compensationFactor', errorHandler((req, res, next) => (
    eaService.getAreaByCF(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup geofences
   * @api {get} /geofences/ea/:ea_id/bioticUnit EAByBioticUnit
   * @apiName EAByBioticUnit
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by biotic units
   *
   * @apiParam {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key biotic unit name
   * @apiSuccess {Number} result.area total area for the associated biotic unit
   *
   * @apiExample {curl} Example usage:
   *  /geofences/ea/CORPOBOYACA/bioticUnit
   * @apiUse EAByBioticUnitExample
   */
  router.get('/geofences/ea/:ea_id/bioticUnit', errorHandler((req, res, next) => (
    eaService.getAreaByBioticUnit(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup geofences
   * @api {get} /geofences/ea/:ea_id/generalBiome EAByGeneralBiome
   * @apiName EAByGeneralBiome
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by general biome (different from IAvH biomes).
   *
   * @apiParam {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key biotic unit name
   * @apiSuccess {Number} result.area total area for the associated biome
   *
   * @apiExample {curl} Example usage:
   *  /geofences/ea/CORPOBOYACA/generalBiome
   * @apiUse EAByGeneralBiomeExample
   */
  router.get('/geofences/ea/:ea_id/generalBiome', errorHandler((req, res, next) => (
    eaService.getAreaByBiome(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  return router;
};
