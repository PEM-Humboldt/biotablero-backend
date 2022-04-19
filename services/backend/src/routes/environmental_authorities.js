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
  router.get(
    '/ea',
    errorHandler((req, res, next) =>
      eaService.getAll().then((ea) => {
        res.send(ea);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id',
    errorHandler((req, res, next) =>
      eaService.getTotalArea(req.params.ea_id).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/compensationFactor',
    errorHandler((req, res, next) =>
      eaService.getAreaByCF(req.params.ea_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/bioticUnit',
    errorHandler((req, res, next) =>
      eaService.getAreaByBioticUnit(req.params.ea_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/generalBiome',
    errorHandler((req, res, next) =>
      eaService.getAreaByBiome(req.params.ea_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/biome/:name_biome/subzone',
    errorHandler((req, res, next) =>
      eaService.getBiomeAreaBySubzone(req.params.ea_id, req.params.name_biome).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/se/:se_type',
    errorHandler((req, res, next) =>
      eaService.getSEDetails(req.params.ea_id, req.params.se_type).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/hf/current/categories',
    errorHandler((req, res, next) =>
      eaService.getAreaByHFCategory(req.params.ea_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /ea/:ea_id/hf/current/value CurrentValueInEA
   * @apiName CurrentValueInEA
   * @apiVersion 0.1.0
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
  router.get(
    '/ea/:ea_id/hf/current/value',
    errorHandler((req, res, next) =>
      eaService.getCurrentHFValue(req.params.ea_id).then((value) => {
        res.send(value);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/hf/persistence',
    errorHandler((req, res, next) =>
      eaService.getAreaByHFPersistence(req.params.ea_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/hf/timeline',
    errorHandler((req, res, next) =>
      eaService.getTotalHFTimeLine(req.params.ea_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/se/:se_type/hf/timeline',
    errorHandler((req, res, next) =>
      eaService.getSEHFTimeline(req.params.ea_id, req.params.se_type).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /ea/:ea_id/ecoChange/lp/categories ForestLPInEA
   * @apiName ForestLPInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the forest loss and persistence inside the given environmental authority
   *
   * Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object[]} result list of objects with information about forest LP
   * @apiSuccess {String} result.id period
   * @apiSuccess {String} result.data data for forest LP divided by categories
   *
   * @apiExample {curl} Example usage:
   *  /ea/CDMB/ecoChange/lp/categories
   * @apiUse ForestLPExample
   */
  router.get(
    '/ea/:ea_id/ecoChange/lp/categories',
    errorHandler((req, res, next) =>
      eaService.getEcoChangeLP(req.params.ea_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /ea/:ea_id/ecoChange/persistence ForestPersistenceInEA
   * @apiName ForestPersistenceInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Value for the forest persistence inside the given environmental authority
   *
   * Value calculated for 2016-2019 period
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   *
   * @apiSuccess {Object} result object with forest persistence value
   * @apiSuccess {String} result.area value of forest persistence area
   *
   * @apiExample {curl} Example usage:
   *  /ea/CDMB/ecoChange/persistence
   * @apiUse PersistenceAreaExample
   */
  router.get(
    '/ea/:ea_id/ecoChange/persistence',
    errorHandler((req, res, next) =>
      eaService.getEcoChangePersistenceValue(req.params.ea_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/layers/national',
    errorHandler((req, res, next) =>
      eaService.getNationalLayer().then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/layers/:ea_id',
    errorHandler((req, res, next) =>
      eaService.getLayer(req.params.ea_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/se/layers/:se_type',
    errorHandler((req, res, next) =>
      eaService.getSELayer(req.params.ea_id, req.params.se_type).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/hf/layers/current/categories',
    errorHandler((req, res, next) =>
      eaService.getHFCategoriesLayerById(req.params.ea_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/:ea_id/hf/layers/persistence',
    errorHandler((req, res, next) =>
      eaService.getHFPersistenceLayerById(req.params.ea_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/ea/layers/:ea_id/biomes',
    errorHandler((req, res, next) =>
      eaService.getBiomesLayer(req.params.ea_id).then((biomes) => {
        res.send(biomes);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /ea/:ea_id/ecoChange/layers/lp/period/:period/categories/ LPCategoriesLayerInEA
   * @apiName LPCategoriesLayerInEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the the forest loss and persistence layer for a given period, divided by categories
   * inside the given environmental authority
   *
   * @apiParam (Path params) {String} ea_id environmental authority id
   * @apiParam (Path params) {String} period period
   * (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type the geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /ea/CARDER/ecoChange/layers/lp/period/2016-2019/categories/
   * @apiUse ForestLPLayerExample
   */
  router.get(
    '/ea/:ea_id/ecoChange/layers/lp/period/:period/categories/',
    errorHandler((req, res, next) =>
      eaService.getEcoChangeLPLayer(req.params.ea_id, req.params.period).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  return router;
};
