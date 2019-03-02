const { Router } = require('restify-router');

/**
 * @apiDefine geofences Geofences
 * Geofences endpoints: List information about some kind of geofence,
 * such as environmental authority, states, municipalities, etc.
 */

/**
 * @apiDefine getAllStatesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_state": "44",
 *      "name": "La Guajira"
 *    },
 *    {
 *      "id_state": "97",
 *      "name": "Vaupés"
 *    }...
 *  ]
 */

/**
 * @apiDefine getAllMunicipalitiesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_municipality": "560",
 *      "municipality": "Potosí"
 *    },
 *    {
 *      "id_municipality": "569",
 *      "municipality": "Puerto Caicedo"
 *    }...
 *  ]
 */

module.exports = (errorHandler, eaService, stateService, municipalityService) => {
  const router = new Router();

  /**
   * @apiGroup geofences
   * @api {get} /geofences/states listStates
   * @apiName listStates
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available states
   *
   * @apiSuccess {Object[]} state list of states
   * @apiSuccess {String} state.name State name
   * @apiSuccess {Number} state.id_state State id
   *
   * @apiExample {curl} Example usage:
   *  /geofences/states
   * @apiUse getAllStatesExample
   */
  router.get('/geofences/states', errorHandler((req, res, next) => (
    stateService.getAll()
      .then((states) => {
        res.send(states);
        next();
      })
  )));

  /**
   * @apiGroup geofences
   * @api {get} /geofences/municipalities listMunicipalities
   * @apiName listMunicipalities
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available municipalities
   *
   * @apiSuccess {Object[]} municipality list of municipalities
   * @apiSuccess {String} municipality.municipality municipality name
   * @apiSuccess {Number} municipality.id_municipality municipality id
   *
   * @apiExample {curl} Example usage:
   *  /geofences/municipalities
   * @apiUse getAllMunicipalitiesExample
   */
  router.get('/geofences/municipalities', errorHandler((req, res, next) => (
    municipalityService.getAll()
      .then((municipalities) => {
        res.send(municipalities);
        next();
      })
  )));

  /**
   * @apiGroup geofences
   * @api {get} /geofences/basinAreas listBasinAreas
   * @apiName listBasinAreas
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin areas
   *
   * @apiSuccess {Object[]} basin_areas list of basin areas
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/basinAreas
   * TODO: Add response example
   */
  router.get('/geofences/basinAreas', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/basinZones listBasinZones
   * @apiName listBasinZones
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin zones
   *
   * @apiSuccess {Object[]} basin_zones list of basin zones
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/basinZones
   * TODO: Add response example
   */
  router.get('/geofences/basinZones', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/basinSubZones listBasinSubZones
   * @apiName listBasinSubZones
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basin sub-zones
   *
   * @apiSuccess {Object[]} basin_sub-zones list of basin sub-zones
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/basinSubZones
   * TODO: Add response example
   */
  router.get('/geofences/basinSubZones', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/protectedAreas listProtectedAreas
   * @apiName listProtectedAreas
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available protected areas
   *
   * @apiSuccess {Object[]} protectedAreas list of protected areas
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/protectedAreas
   * TODO: Add response example
   */
  router.get('/geofences/protectedAreas', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/strategicEcosystems listStrategicEcosystems
   * @apiName listStrategicEcosystems
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available strategic ecosystems
   *
   * @apiSuccess {Object[]} strategicEcosystems list of strategic ecosystems
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/strategicEcosystems
   * TODO: Add response example
   */
  router.get('/geofences/strategicEcosystems', errorHandler());

  return router;
};
