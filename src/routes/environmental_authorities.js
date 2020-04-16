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
   * @api {get} /ea/:ea_id EADetails
   * @apiName EADetails
   * @apiVersion 0.1.0
   * @apiDescription
   * Get details about an specific environmental authority. For now, only the total area is returned
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.total_area Area for the specified environmental authority
   *
   * @apiExample {curl} Example usage:
   *  /ea/AMVA
   * @apiUse GeofenceDetailsExample
   */
  router.get('/ea/:ea_id', errorHandler((req, res, next) => (
    eaService.getTotalArea(req.params.ea_id)
      .then((details) => {
        res.send(details);
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
   * @apiParam (Path params) {String} ea_id environmental authority id
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
   * @apiParam (Path params) {String} ea_id environmental authority id
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
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key general biome name
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
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} name_biome biome name
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
   * Separate the environmental authority total area by strategic ecosystems.
   *
   * The result is the list of strategic ecosystems with area and percentage inside the
   * environmental authority and an extra element with the total area inside strategic ecosystems on
   * the environmental authority.
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
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
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
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
   * @api {get} /ea/:ea_id/se/:se_type/coverage SECoverageInEA
   * @apiName SECoverageInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific environmental authority, get the coverage
   * distribution in that area.
   *
   * The result is the list of cover types with area and percentage inside the specified strategic
   * ecosystem in the environmental authority.
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se/Páramo/coverage
   * @apiUse SECoverageInGeofenceExample
   */
  router.get('/ea/:ea_id/se/:se_type/coverage', errorHandler((req, res, next) => (
    eaService.getCoverageInSE(req.params.ea_id, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup ea
   * @api {get} /ea/:ea_id/se/:se_type/pa SEPAInEA
   * @apiName SEPAInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific environmental authority, get the
   * distribution of protected area categories in that area.
   *
   * The result is the list of protected area types with area and percentage inside the specified
   * strategic ecosystem in the environmental authority and two extra elements: the total protected
   * area inside the specified area and the non protected area.
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se/Páramo/pa
   * @apiUse GeofenceByPAExample
   */
  router.get('/ea/:ea_id/se/:se_type/pa', errorHandler((req, res, next) => (
    eaService.getPAInSE(req.params.ea_id, req.params.se_type)
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
   * Separate the environmental authority total area by protected areas.
   *
   * The result is the list of protected area types with area and percentage inside the
   * environmental authority and two extra elements: the total protected area inside the
   * environmental authority and the non protected area
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the EA area.
   * @apiSuccess {Number} result.area Area of the specified protected area in the environmental
   *  authority
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
   * Separate the environmental authority total area by coverage type.
   *
   * The result is the list of cover types with area and percentage inside the environmental
   * authority and an extra element with the total environmental authority area.
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage respect to the EA.
   * @apiSuccess {Number} result.area Area of the specified coverage in the environmental authority
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
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess (geojson) {Object[]} result.features features information (id, type, etc)
   * @apiSuccess (geojson) {Object} result.crs Coordinate Reference Systems specification
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
