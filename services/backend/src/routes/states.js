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
   * @apiVersion 2.0.0
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
   * @api {get} /states/:state_id StateTotalArea
   * @apiName StateTotalArea
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the total area of a specifc state.
   *
   * @apiParam (Path params) {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.total_area Area for the specified state
   *
   * @apiExample {curl} Example usage:
   *  /states/1
   * @apiUse GeofenceTotalAreaExample
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
   * @apiVersion 2.0.0
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
   * @api {get} /states/:state_id/se/:se_type SEDetailInState
   * @apiName SEDetailInState
   * @apiVersion 2.0.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific state, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam (Path params) {Number} state_id state id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.national_percentage strategic ecosystem inside state
   * percentage with respect to the national area
   * @apiSuccess {String} result.total_area total area in geofence
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
   * @apiGroup s_hf
   * @api {get} /states/:state_id/hf/current/categories CategoriesInState
   * @apiName CategoriesInState
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiGroup s_hf
   * @api {get} /states/:state_id/se/:se_type/hf/timeline SETimeLineInState
   * @apiName SETimeLineInState
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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
   * @apiVersion 2.0.0
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

  return router;
};
