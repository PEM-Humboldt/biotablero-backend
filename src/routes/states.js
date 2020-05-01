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
  router.get('/states', errorHandler((req, res, next) => (
    stateService.getAll()
      .then((states) => {
        res.send(states);
        next();
      })
  )));

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
  router.get('/states/:state_id', errorHandler((req, res, next) => (
    stateService.getTotalArea(req.params.state_id)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

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
  router.get('/states/:state_id/municipalities', errorHandler((req, res, next) => (
    stateService.getMunicipalities(req.params.state_id)
      .then((municipalities) => {
        res.send(municipalities);
        next();
      })
  )));

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
  router.get('/states/:state_id/se', errorHandler((req, res, next) => (
    stateService.getAreaBySE(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

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
  router.get('/states/:state_id/se/:se_type', errorHandler((req, res, next) => (
    stateService.getSEDetails(req.params.state_id, req.params.se_type)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

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
  router.get('/states/:state_id/se/:se_type/coverage', errorHandler((req, res, next) => (
    stateService.getCoverageInSE(req.params.state_id, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

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
  router.get('/states/:state_id/se/:se_type/pa', errorHandler((req, res, next) => (
    stateService.getPAInSE(req.params.state_id, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_protected_areas
   * @api {get} /states/:state_id/pa StateByPA
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
  router.get('/states/:state_id/pa', errorHandler((req, res, next) => (
    stateService.getAreaByPA(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

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
  router.get('/states/:state_id/coverage', errorHandler((req, res, next) => (
    stateService.getAreaByCoverage(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

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
  router.get('/states/layers/national', errorHandler((req, res, next) => (
    stateService.getNationalLayer()
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  return router;
};
