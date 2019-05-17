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
 *      "id": "CRC",
 *      "name": "Corporacion Autonoma Regional del Cauca"
 *    },
 *    {
 *      "id": "CORPOGUAVIO",
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
   * @apiSuccess {Number} ea.id environmental authority id
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
   * Separate the environmental authority total area by strategic ecosystems
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the EA
   * @apiSuccess {Number} result.percentage Percentage of the specified SE respect to the EA area.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se
   * @apiUse GeofenceBySEExample
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
   * @api {get} /ea/:ea_id/se/:se_type SEDetailInEA
   * @apiName SEDetailInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific environmental authority, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam {String} ea_id environmental authority id
   * @apiParam {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.national_percentage strategic ecosystem inside environmental
   *  authority percentage with respect to the national area
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se/Páramo
   * @apiUse SEInsideGeofenceDetailExample
   */
  router.get('/ea/:ea_id/se/:se_type', errorHandler((req, res, next) => (
    eaService.getSEDetails(req.params.ea_id, req.params.se_type)
      .then((details) => {
        res.send(details);
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
   * @apiUse GeofenceByPAExample
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
   * @apiUse GeofenceByCoverageExample
   */
  router.get('/ea/:ea_id/coverage', errorHandler((req, res, next) => (
    eaService.getAreaByCoverage(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/layers/national EANationalLayer
   * @apiName EANationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by environmental authority
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
   *  /ea/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get('/ea/layers/national', errorHandler((req, res, next) => (
    eaService.getNationalLayer()
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  return router;
};
