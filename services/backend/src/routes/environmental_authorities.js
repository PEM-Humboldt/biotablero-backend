const { Router } = require('restify-router');

module.exports = (eaService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea listAll
   * @apiName listEA
   * @apiVersion 2.0.0
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
  router.get('/ea', (req, res, next) =>
    eaService.getAll().then((ea) => {
      res.send(ea);
      next();
    }),
  );

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/:ea_id EATotalArea
   * @apiName EATotalArea
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the total area of a specific environmental authority.
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.total_area Area for the specified environmental authority
   *
   * @apiExample {curl} Example usage:
   *  /ea/AMVA
   * @apiUse GeofenceTotalAreaExample
   */
  router.get('/ea/:ea_id', (req, res, next) =>
    eaService.getTotalArea(req.params.ea_id).then((details) => {
      res.send(details);
      next();
    }),
  );

  /**
   * @apiGroup s_compensation_factor
   * @api {get} /ea/:ea_id/compensationFactor CompensationFactorInEA
   * @apiName CompensationFactorInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/compensationFactor', (req, res, next) =>
    eaService.getAreaByCF(req.params.ea_id).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup s_biotic_unit
   * @api {get} /ea/:ea_id/bioticUnit BioticUnitInEA
   * @apiName BioticUnitInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/bioticUnit', (req, res, next) =>
    eaService.getAreaByBioticUnit(req.params.ea_id).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup s_general_biome
   * @api {get} /ea/:ea_id/generalBiome GeneralBiomeInEA
   * @apiName GeneralBiomeInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/generalBiome', (req, res, next) =>
    eaService.getAreaByBiome(req.params.ea_id).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/:ea_id/biome/:name_biome/subzone SubzonesInBiomeInEA
   * @apiName SubzonesInBiomeInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/biome/:name_biome/subzone', (req, res, next) =>
    eaService.getBiomeAreaBySubzone(req.params.ea_id, req.params.name_biome).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /ea/:ea_id/se/:se_type SEDetailInEA
   * @apiName SEDetailInEA
   * @apiVersion 2.0.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific environmental authority, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.national_percentage strategic ecosystem inside environmental
   *  authority percentage with respect to the national area
   * @apiSuccess {String} result.total_area total area in geofence
   *
   * @apiExample {curl} Example usage:
   *  /ea/CORPOBOYACA/se/Páramo
   * @apiUse SEInGeofenceDetailExample
   */
  router.get('/ea/:ea_id/se/:se_type', (req, res, next) =>
    eaService.getSEDetails(req.params.ea_id, req.params.se_type).then((details) => {
      res.send(details);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/current/categories CategoriesInEA
   * @apiName CategoriesInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/hf/current/categories', (req, res, next) =>
    eaService.getAreaByHFCategory(req.params.ea_id).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/current/value CurrentValueInEA
   * @apiName CurrentValueInEA
   * @apiVersion 2.0.0
   * @apiDescription
   * Value and category of the current human footprint inside the given environmental authority
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.value current value of human footprint inside the given
   * environmental authority
   * @apiSuccess {String} result.category category of human footprint inside the given
   * environmental authority
   *
   * @apiExample {curl} Example usage:
   *  /ea/CRQ/hf/current/value
   * @apiUse CurrentValueInGeofenceExample
   */
  router.get('/ea/:ea_id/hf/current/value', (req, res, next) =>
    eaService.getCurrentHFValue(req.params.ea_id).then((value) => {
      res.send(value);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/persistence PersistenceInEA
   * @apiName HFPersistenceInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/hf/persistence', (req, res, next) =>
    eaService.getAreaByHFPersistence(req.params.ea_id).then((areas) => {
      res.send(areas);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/timeline TimeLineInEA
   * @apiName TimeLineInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/hf/timeline', (req, res, next) =>
    eaService.getTotalHFTimeLine(req.params.ea_id).then((values) => {
      res.send(values);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/se/:se_type/hf/timeline SETimeLineInEA
   * @apiName SETimeLineInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/se/:se_type/hf/timeline', (req, res, next) =>
    eaService.getSEHFTimeline(req.params.ea_id, req.params.se_type).then((values) => {
      res.send(values);
      next();
    }),
  );

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/national NationalLayer
   * @apiName EANationalLayer
   * @apiVersion 2.0.0
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
  router.get('/ea/layers/national', (req, res, next) =>
    eaService.getNationalLayer().then((geometry) => {
      res.send(geometry);
      next();
    }),
  );

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/:ea_id EALayer
   * @apiName EALayer
   * @apiVersion 2.0.0
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
  router.get('/ea/layers/:ea_id', (req, res, next) =>
    eaService.getLayer(req.params.ea_id).then((geometry) => {
      res.send(geometry);
      next();
    }),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /ea/:ea_id/se/layers/:se_type SEInEALayer
   * @apiName SEInEALayer
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/se/layers/:se_type', (req, res, next) =>
    eaService.getSELayer(req.params.ea_id, req.params.se_type).then((geometry) => {
      res.send(geometry);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/layers/current/categories CategoriesLayerInEA
   * @apiName CategoriesLayerInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/hf/layers/current/categories', (req, res, next) =>
    eaService.getHFCategoriesLayerById(req.params.ea_id).then((geometry) => {
      res.send(geometry);
      next();
    }),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/layers/persistence PersistenceLayerInEA
   * @apiName PersistenceLayerInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/:ea_id/hf/layers/persistence', (req, res, next) =>
    eaService.getHFPersistenceLayerById(req.params.ea_id).then((geometry) => {
      res.send(geometry);
      next();
    }),
  );

  /**
   * @apiGroup geofence_ea
   * @api {get} /ea/layers/:ea_id/biomes BiomesLayerInEA
   * @apiName BiomesLayerInEA
   * @apiVersion 2.0.0
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
  router.get('/ea/layers/:ea_id/biomes', (req, res, next) =>
    eaService.getBiomesLayer(req.params.ea_id).then((biomes) => {
      res.send(biomes);
      next();
    }),
  );

  return router;
};
