const { Router } = require('restify-router');

/**
 * @apiDefine states States
 * Endpoints related with queries about states
 */

module.exports = (errorHandler, stateService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_states
   * @api {get} /states listAll
   * @apiName listStates
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available states
   *
   * @apiSuccess {Object[]} state list of states
   * @apiSuccess {String} state.name State name
   * @apiSuccess {Number} state.id State id
   *
   * @apiExample {curl} Example usage:
   *  /states
   * @apiUse getAllStatesExample
   */
  router.get(
    '/states',
    errorHandler((req, res, next) =>
      stateService.getAll().then((states) => {
        res.send(states);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_states
   * @api {get} /states/:category StateDetails
   * @apiName StateDetails
   * @apiVersion 0.1.0
   * @apiDescription
   * Get details about an specific state. For now, only the total area is returned.
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.total_area Area for the specified state
   *
   * @apiExample {curl} Example usage:
   *  /states/1
   * @apiUse GeofenceDetailsExample
   */
  router.get(
    '/states/:state_id',
    errorHandler((req, res, next) =>
      stateService.getTotalArea(req.params.state_id).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_states
   * @api {get} /states/:state_id/municipalities MunicipalitiesInState
   * @apiName stateByMunicipalities
   * @apiVersion 0.1.0
   * @apiDescription
   * List all municipalities information in the given state
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.municipality municipality name
   * @apiSuccess {Number} result.id_municipality municipality id
   *
   * @apiExample {curl} Example usage:
   *  /states/44/municipalities
   * @apiUse MunicipalitiesInStateExample
   */
  router.get(
    '/states/:state_id/municipalities',
    errorHandler((req, res, next) =>
      stateService.getMunicipalities(req.params.state_id).then((municipalities) => {
        res.send(municipalities);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /states/:state_id/se SEInState
   * @apiName StateBySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by strategic ecosystems.
   *
   * The result is the list of strategic ecosystems with area and percentage inside the state and an
   * extra element with the total area inside strategic ecosystems on the state.
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the state
   * @apiSuccess {Number} result.percentage Percentage of the specified SE respect to the state area
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se
   * @apiUse SEInGeofenceExample
   */
  router.get(
    '/states/:state_id/se',
    errorHandler((req, res, next) =>
      stateService.getAreaBySE(req.params.state_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /states/:state_id/se/:se_type SEDetailInState
   * @apiName SEDetailInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific state, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.national_percentage strategic ecosystem inside state
   * percentage with respect to the national area
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se/Páramo
   * @apiUse SEInGeofenceDetailExample
   */
  router.get(
    '/states/:state_id/se/:se_type',
    errorHandler((req, res, next) =>
      stateService.getSEDetails(req.params.state_id, req.params.se_type).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_coverages
   * @api {get} /states/:state_id/se/:se_type/coverage SECoverageInState
   * @apiName SECoverageInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific state, get the coverage
   * distribution in that area.
   *
   * The result is the list of cover types with area and percentage inside the specified strategic
   * ecosystem in the state.
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se/Páramo/coverage
   * @apiUse SECoverageInGeofenceExample
   */
  router.get(
    '/states/:state_id/se/:se_type/coverage',
    errorHandler((req, res, next) =>
      stateService.getCoverageInSE(req.params.state_id, req.params.se_type).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_protected_areas
   * @api {get} /states/:state_id/se/:se_type/pa SEPAInState
   * @apiName SEPAInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific state, get the protected area
   * categories distribution in that area.
   *
   * The result is the list of protected area types with area and percentage inside the specified
   * strategic ecosystem in the state and one extra element with the total protected area
   * inside the specified state.
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se/Páramo/pa
   * @apiUse PAInGeofenceExample
   */
  router.get(
    '/states/:state_id/se/:se_type/pa',
    errorHandler((req, res, next) =>
      stateService.getPAInSE(req.params.state_id, req.params.se_type).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_protected_areas
   * @api {get} /states/:state_id/pa PAInState
   * @apiName StateByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by protected areas.
   *
   * The result is the list of protected area types with area and percentage inside the state and
   * one extra element with the total protected area inside the state.
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the state area
   * @apiSuccess {Number} result.area Area of the specified protected area in the state
   *
   * @apiExample {curl} Example usage:
   *  /states/44/pa
   * @apiUse PAInGeofenceExample
   */
  router.get(
    '/states/:state_id/pa',
    errorHandler((req, res, next) =>
      stateService.getAreaByPA(req.params.state_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_coverages
   * @api {get} /states/:state_id/coverage CoverageInState
   * @apiName StateByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by coverage type.
   *
   * The result is the list of cover types with area and percentage inside the state and an extra
   * element with the total state area.
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the coverage type respect to the state.
   * @apiSuccess {Number} result.area Area of the specified coverage in the state
   *
   * @apiExample {curl} Example usage:
   *  /states/44/coverage
   * @apiUse CoverageInGeofenceExample
   */
  router.get(
    '/states/:state_id/coverage',
    errorHandler((req, res, next) =>
      stateService.getAreaByCoverage(req.params.state_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/current/categories CategoriesInState
   * @apiName CategoriesInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Area distribution for each human footprint category in the given state
   *
   * Values calculated for 2018
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key Category identifier (natural, baja, media, alta)
   * @apiSuccess {Number} result.area Area inside the state for the category
   * @apiSuccess {Number} result.percentage Percentage of the specified category respect to
   * the state.
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/current/categories
   * @apiUse CategoriesInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/current/categories',
    errorHandler((req, res, next) =>
      stateService.getAreaByHFCategory(req.params.state_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/current/value CurrentValueInState
   * @apiName CurrentValueInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Value and category of the current value of human footprint inside the given state
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {Number} state_id state id.
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.value current value of human footprint inside the given
   * state
   * @apiSuccess {String} result.category category of human footprint inside the given
   * state
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/current/value
   * @apiUse CurrentValueInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/current/value',
    errorHandler((req, res, next) =>
      stateService.getCurrentHFValue(req.params.state_id).then((value) => {
        res.send(value);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/persistence PersistenceInState
   * @apiName HFPersistenceInState
   * @apiVersion 0.1.0
   * @apiDescription
   * List the persistence of human footprint inside the given state.
   *
   * Values calculated between 1970 and 2018
   *
   * @apiParam (Path params) {Number} state_id state id.
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key Persistence identifier (estable_natural, dinamica,
   *  estable_alta)
   * @apiSuccess {Number} result.area Area inside the state for the persistence value
   * @apiSuccess {Number} result.percentage Percentage of the specified persistence value respect to
   *  the state.
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/persistence
   * @apiUse PersistenceInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/persistence',
    errorHandler((req, res, next) =>
      stateService.getAreaByHFPersistence(req.params.state_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/timeline TimeLineInState
   * @apiName TimeLineInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time inside the given state
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key aTotal that identifies total values for geofence
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/timeline
   * @apiUse TimelineInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/timeline',
    errorHandler((req, res, next) =>
      stateService.getTotalHFTimeLine(req.params.state_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /states/:state_id/ecoChange/lp/categories ForestLPInState
   * @apiName ForestLPInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the forest loss and persistence inside the given basin state
   *
   * Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result list of objects with information about forest LP
   * @apiSuccess {String} result.id period
   * @apiSuccess {String} result.data data for forest LP divided by categories
   *
   * @apiExample {curl} Example usage:
   *  /states/86/ecoChange/lp/categories
   * @apiUse ForestLPExample
   */
  router.get(
    '/states/:state_id/ecoChange/lp/categories',
    errorHandler((req, res, next) =>
      stateService.getEcoChangeLP(req.params.state_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /states/:state_id/ecoChange/persistence ForestPersistenceInState
   * @apiName ForestPersistenceInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Value for the forest persistence inside the given basin state
   *
   * Value calculated for 2016-2019 period
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object} result object with forest persistence value
   * @apiSuccess {String} result.area value of forest persistence area
   *
   * @apiExample {curl} Example usage:
   *  /states/86/ecoChange/persistence
   * @apiUse PersistenceAreaExample
   */
  router.get(
    '/states/:state_id/ecoChange/persistence',
    errorHandler((req, res, next) =>
      stateService.getEcoChangePersistenceValue(req.params.state_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/se/:se_type/hf/timeline SETimeLineInState
   * @apiName SETimeLineInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time for a strategic ecosystem inside the given
   * state
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key key that identifies strategic ecosystem type
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se/Páramo/hf/timeline
   * @apiUse SETimelineInGeofenceExample
   */
  router.get(
    '/states/:state_id/se/:se_type/hf/timeline',
    errorHandler((req, res, next) =>
      stateService.getSEHFTimeline(req.params.state_id, req.params.se_type).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_states
   * @api {get} /states/layers/national NationalLayer
   * @apiName StatesNationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by states
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess (geojson) {Object[]} result.features features information (id, type, etc)
   * @apiSuccess (geojson) {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /states/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get(
    '/states/layers/national',
    errorHandler((req, res, next) =>
      stateService.getNationalLayer().then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_states
   * @api {get} /states/layers/:state_id StateLayer
   * @apiName StateLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific state
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /states/layers/44
   * @apiUse SpecificLayerExample
   */
  router.get(
    '/states/layers/:state_id',
    errorHandler((req, res, next) =>
      stateService.getLayer(req.params.state_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /states/:state_id/se/layers/:se_type SEInStateLayer
   * @apiName SEInStateLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific strategic ecosystem inside an state
   *
   * @apiParam (Path params) {Number} state_id state id.
   * @apiParam (Path params) {String} se_type strategic ecosystem type.
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se/layers/Páramo
   * @apiUse SpecificLayerExample
   */
  router.get(
    '/states/:state_id/se/layers/:se_type',
    errorHandler((req, res, next) =>
      stateService.getSELayer(req.params.state_id, req.params.se_type).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/layers/current/categories CategoriesLayerInState
   * @apiName CategoriesLayerInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the current human footprint layer divided by categories in a given state
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/layers/current/categories
   * @apiUse CategoriesLayerInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/layers/current/categories',
    errorHandler((req, res, next) =>
      stateService.getHFCategoriesLayerById(req.params.state_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/layers/persistence PersistenceLayerInState
   * @apiName PersistenceLayerInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the persistence human footprint layer divided by categories in a given state
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /states/44/hf/layers/persistence
   * @apiUse PersistenceLayerInGeofenceExample
   */
  router.get(
    '/states/:state_id/hf/layers/persistence',
    errorHandler((req, res, next) =>
      stateService.getHFPersistenceLayerById(req.params.state_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /states/:state_id/ecoChange/layers/lp/period/:period/categories/
   * LPCategoriesLayerInState
   * @apiName LPCategoriesLayerInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the the forest loss and persistence layer for a given period, divided by categories
   * inside the state
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} period period
   * (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type the geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /states/86/ecoChange/layers/lp/period/2016-2019/categories/
   * @apiUse ForestLPLayerExample
   */
  router.get(
    '/states/:state_id/ecoChange/layers/lp/period/:period/categories/',
    errorHandler((req, res, next) =>
      stateService.getEcoChangeLPLayer(req.params.ea_id, req.params.period).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_coverages
   * @api {get} /states/:state_id/coverage/layer CoverageLayerInState
   * @apiName CoverageLayerInState
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the coverage layer divided by categories in a given state
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /states/86/coverage/layer
   * @apiUse CoverageLayerInStateExample
   */
   router.get(
    '/states/:state_id/coverage/layer',
    errorHandler((req, res, next) =>
    stateService.getCoverageLayer(req.params.state_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  return router;
};
