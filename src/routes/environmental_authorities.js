const { Router } = require('restify-router');

module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea listAll
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
   * @apiGroup geofence_ea
   * @api {get} /ea/:ea_id EADetails
   * @apiName EADetails
   * @apiVersion 0.1.0
   * @apiDescription
   * Get details about an specific environmental authority. For now, only the total area is returned
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
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
   * @apiGroup s_compensation_factor
   * @api {get} /ea/:ea_id/compensationFactor CompensationFactorInEA
   * @apiName CompensationFactorInEA
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
   * @apiUse CompensationFactorInEAExample
   */
  router.get('/ea/:ea_id/compensationFactor', errorHandler((req, res, next) => (
    eaService.getAreaByCF(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_biotic_unit
   * @api {get} /ea/:ea_id/bioticUnit BioticUnitInEA
   * @apiName BioticUnitInEA
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
   * @apiUse BioticUnitInEAExample
   */
  router.get('/ea/:ea_id/bioticUnit', errorHandler((req, res, next) => (
    eaService.getAreaByBioticUnit(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_general_biome
   * @api {get} /ea/:ea_id/generalBiome GeneralBiomeInEA
   * @apiName GeneralBiomeInEA
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
   * @apiUse GeneralBiomeInEAExample
   */
  router.get('/ea/:ea_id/generalBiome', errorHandler((req, res, next) => (
    eaService.getAreaByBiome(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/:ea_id/biome/:name_biome/subzone SubzonesInBiomeInEA
   * @apiName SubzonesInBiomeInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate a selected biome inside an environmental authority by basin subzones
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} name_biome biome name
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key basin subzone name
   * @apiSuccess {Number} result.area total area for the associated basin subzone
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/biome/Orobioma Subandino Guane-Yariguíes/subzone
   * @apiUse SubzoneInBiomeInEAExample
   */
  router.get('/ea/:ea_id/biome/:name_biome/subzone', errorHandler((req, res, next) => (
    eaService.getBiomeAreaBySubzone(req.params.ea_id, req.params.name_biome)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /ea/:ea_id/se SEInEA
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
   * @apiUse SEInGeofenceExample
   */
  router.get('/ea/:ea_id/se', errorHandler((req, res, next) => (
    eaService.getAreaBySE(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_strategic_ecosystems
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
   * @apiUse SEInGeofenceDetailExample
   */
  router.get('/ea/:ea_id/se/:se_type', errorHandler((req, res, next) => (
    eaService.getSEDetails(req.params.ea_id, req.params.se_type)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

  /**
   * @apiGroup s_coverages
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
   * @apiGroup s_protected_areas
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
   * @apiSuccess {String} result.type Specifies the protected area type
   * @apiSuccess {Number} result.percentage Percentage of the specified protected area
   * @apiSuccess {Number} result.area Area of the specified protected area
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se/Páramo/pa
   * @apiUse PAInGeofenceExample
   */
  router.get('/ea/:ea_id/se/:se_type/pa', errorHandler((req, res, next) => (
    eaService.getPAInSE(req.params.ea_id, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_protected_areas
   * @api {get} /ea/:ea_id/pa PAInEA
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
   * @apiUse PAInGeofenceExample
   */
  router.get('/ea/:ea_id/pa', errorHandler((req, res, next) => (
    eaService.getAreaByPA(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_coverages
   * @api {get} /ea/:ea_id/coverage CoverageInEA
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
   * @apiUse CoverageInGeofenceExample
   */
  router.get('/ea/:ea_id/coverage', errorHandler((req, res, next) => (
    eaService.getAreaByCoverage(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/current/categories CategoriesInEA
   * @apiName CategoriesInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Area distribution for each human footprint category in the given environmental authority
   *
   * Values calculated for 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key Category identifier (natural, baja, media, alta)
   * @apiSuccess {Number} result.area Area inside the environmental authority for the category
   * @apiSuccess {Number} result.percentage Percentage of the specified category respect to
   * the environmental authority.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CRQ/hf/current/categories
   * @apiUse CategoriesInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/current/categories', errorHandler((req, res, next) => (
    eaService.getAreaByHFCategory(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/current/value CurrentValueInEA
   * @apiName CurrentValueInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Value of the current value of human footprint inside the given environmental authority
   *
   * Values calculated for 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.value current value of human footprint inside the given
   * environmental authority
   *
   * @apiExample {curl} Example usage:
   *  /ea/CRQ/hf/current/value
   * @apiUse CurrentValueInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/current/value', errorHandler((req, res, next) => (
    eaService.getCurrentHFValue(req.params.ea_id)
      .then((value) => {
        res.send(value);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/persistence PersistenceInEA
   * @apiName HFPersistenceInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * List the persistence of human footprint inside the given environmental authority.
   *
   * Values calculated between 1970 and 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key Persistence identifier (estable_natural, dinamica,
   *  estable_alta)
   * @apiSuccess {Number} result.area Area inside the environmental authority for the persistence
   *  value
   * @apiSuccess {Number} result.percentage Percentage of the specified persistence value respect to
   *  the environmental authority.
   *
   * @apiExample {curl} Example usage:
   *  /ea/CRQ/hf/persistence
   * @apiUse PersistenceInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/persistence', errorHandler((req, res, next) => (
    eaService.getAreaByHFPersistence(req.params.ea_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/timeline TimeLineInEA
   * @apiName TimeLineInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time inside the given environmental authority
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key aTotal that identifies total values for geofence
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /ea/CDMB/hf/timeline
   * @apiUse TimelineInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/timeline', errorHandler((req, res, next) => (
    eaService.getTotalHFTimeLine(req.params.ea_id)
      .then((values) => {
        res.send(values);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/se/:se_type/hf/timeline SETimeLineInEA
   * @apiName SETimeLineInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time for a strategic ecosystem inside the given
   * environmental authority
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key key that identifies strategic ecosystem type
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /ea/CDMB/se/Páramo/hf/timeline
   * @apiUse SETimelineInGeofenceExample
   */
  router.get('/ea/:ea_id/se/:se_type/hf/timeline', errorHandler((req, res, next) => (
    eaService.getSEHFTimeline(req.params.ea_id, req.params.se_type)
      .then((values) => {
        res.send(values);
        next();
      })
  )));


  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/national NationalLayer
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

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/:ea_id EALayer
   * @apiName EALayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific environmental authority
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /ea/layers/CRQ
   * @apiUse SpecificLayerExample
   */
  router.get('/ea/layers/:ea_id', errorHandler((req, res, next) => (
    eaService.getLayer(req.params.ea_id)
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /ea/:ea_id/se/layers/:se_type SEInEALayer
   * @apiName SEInEALayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific strategic ecosystem inside an environmental authority
   *
   * @apiParam (Path params) {String} ea_id state id.
   * @apiParam (Path params) {String} se_type strategic ecosystem type.
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /ea/CRQ/se/layers/Páramo
   * @apiUse SpecificLayerExample
   */
  router.get('/ea/:ea_id/se/layers/:se_type', errorHandler((req, res, next) => (
    eaService.getSELayer(req.params.ea_id, req.params.se_type)
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/layers/current/categories CategoriesLayerInEA
   * @apiName CategoriesLayerInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the current human footprint layer divided by categories in a given
   * environmental authority
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /ea/EPA/hf/layers/current/categories
   * @apiUse CategoriesLayerInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/layers/current/categories', errorHandler((req, res, next) => (
    eaService.getHFCategoriesLayerById(req.params.ea_id)
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/layers/persistence PersistenceLayerInEA
   * @apiName PersistenceLayerInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the persistence human footprint layer divided by categories in a given
   * environmental authority
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /ea/EPA/hf/layers/persistence
   * @apiUse PersistenceLayerInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/layers/persistence', errorHandler((req, res, next) => (
    eaService.getHFPersistenceLayerById(req.params.ea_id)
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/:ea_id/biomes BiomesLayerInEA
   * @apiName BiomesLayerInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all biomes that belong to the given environmental authority.
   *
   * @apiParam {String} ea_id environmental authority id to filter biomes
   *
   * @apiSuccess (geojson) {Object} result GeoJSONJ object
   * @apiSuccess (geojson) {Object} result.features.properties Specific properties for each feature
   * @apiSuccess (geojson) {Number} result.features.properties.gid feature id
   * @apiSuccess (geojson) {String} result.features.properties.name_biome biome name
   * @apiSuccess (geojson) {Number} result.features.properties.id_biome biome id
   * @apiSuccess (geojson) {Number} result.features.properties.compensation_factor biome CF
   *
   * @apiExample {curl} Example usage:
   *  /ea/layers/CORPOBOYACA/biomes
   * @apiUse BiomesLayerInEAExample
   */
  router.get('/ea/layers/:ea_id/biomes', errorHandler((req, res, next) => (
    eaService.getBiomeByEA(req.params.ea_id)
      .then((biomes) => {
        res.send(biomes);
        next();
      })
  )));

  return router;
};
