const { Router } = require('restify-router');

/**
 * @apiDefine ea Environmental Authorities
 * Endpoints related with queries about environmental authorities
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

/**
 * @apiDefine BiomeBySubzoneExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "key": "Río Carare (Minero)",
 *      "area": 217.5024408345576297
 *    },
 *    {
 *      "key": "Río Chicamocha",
 *      "area": 1030.6969008182
 *    },...
 *  ]
 */
module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/compensationFactor EAByCompensationFactor
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
   *  /ea/CORPOBOYACA/compensationFactor
   * @apiUse EAByCompensationFactorExample
   */
  router.get('/ea/:ea_id/compensationFactor', errorHandler((req, res, next) => (
    eaService.getAreaByCF(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/bioticUnit EAByBioticUnit
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
   *  /ea/CORPOBOYACA/bioticUnit
   * @apiUse EAByBioticUnitExample
   */
  router.get('/ea/:ea_id/bioticUnit', errorHandler((req, res, next) => (
    eaService.getAreaByBioticUnit(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/generalBiome EAByGeneralBiome
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
   *  /ea/CORPOBOYACA/generalBiome
   * @apiUse EAByGeneralBiomeExample
   */
  router.get('/ea/:ea_id/generalBiome', errorHandler((req, res, next) => (
    eaService.getAreaByBiome(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/biome/:name_biome/subzone BiomeBySubzone
   * @apiName BiomeBySubzone
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate a selected biome total area in the given environmental authority by sub-basins
   *
   * @apiParam {String} ea_id environmental authority id
   * @apiParam {String} name_biome biome name
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key sub-basin name
   * @apiSuccess {Number} result.area total area for the associated sub-basin
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/biome/Orobioma Subandino Guane-Yariguíes/subzone
   * @apiUse BiomeBySubzoneExample
   */
  router.get('/ea/:ea_id/biome/:name_biome/subzone', errorHandler((req, res, next) => (
    eaService.getBiomeAreaBySubzone(req.params.ea_id, req.params.name_biome)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  return router;
};
