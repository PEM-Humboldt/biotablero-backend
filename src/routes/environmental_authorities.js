const { Router } = require('restify-router');

/**
 * @apiDefine ea Environmental Authorities
 * Endpoints related with queries about environmental authorities
 */

/**
 * @apiDefine getAllEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_ea": "CRC",
 *      "name": "Corporacion Autonoma Regional del Cauca"
 *    },
 *    {
 *      "id_ea": "CORPOGUAVIO",
 *      "name": "Corporacion Autonoma Regional del Guavio"
 *    }...
 *  ]
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

/**
 * @apiDefine EABySEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": 284538.960066167,
 *      "percentage": 0.4318134185,
 *      "type": "Humedal"
 *    },
 *    {
 *      "area": 166148.838843223,
 *      "percentage": 0.2521457802,
 *      "type": "Páramo"
 *    },
 *    {
 *      "area": 208251.798376851,
 *      "percentage": 0.3160408014,
 *      "type": "Bosque Seco Tropical"
 *    }
 *  ]
 */

/**
 * @apiDefine EAByPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "type": "Santuario de Fauna y Flora"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "type": "Parques Naturales Regionales"
 *    }...
 *  ]
 */

/**
 * @apiDefine EAByCoverageExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "type": "Natural"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "type": "Transformado"
 *    }
 *  ]
 */
module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup ea
   * @api {get} /ea listEA
   * @apiName listEA
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available environmental authorities
   *
   * @apiSuccess {Object[]} ea list of environmental authorities
   * @apiSuccess {Number} ea.id_ea environmental authority id
   * @apiSuccess {String} ea.name environmental authority name
   *
   * @apiExample {curl} Example usage:
   *  /ea
   * @apiUse getAllEAExample
   */
  router.get('/ea', errorHandler((req, res, next) => (
    eaService.getAll()
      .then((ea) => {
        res.send(ea);
        next();
      })
  )));

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

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/se EABySE
   * @apiName EABySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by strategic ecosysmtens
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the EA
   * @apiSuccess {Number} result.percentage Percentage of the specified SE respect to the EA area.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se
   * @apiUse EABySEExample
   */
  router.get('/ea/:ea_id/se', errorHandler((req, res, next) => (
    eaService.getAreaBySE(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/pa EAByPA
   * @apiName EAByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by protected areas
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the EA area.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/pa
   * @apiUse EAByPAExample
   */
  router.get('/ea/:ea_id/pa', errorHandler((req, res, next) => (
    eaService.getAreaByPA(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/coverage EAByCoverage
   * @apiName EAByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the environmental authority total area by coverage type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage respect to the EA.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/coverage
   * @apiUse EAByCoverageExample
   */
  router.get('/ea/:ea_id/coverage', errorHandler((req, res, next) => (
    eaService.getAreaByCoverage(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  return router;
};
