const { Router } = require('restify-router');

/**
 * @apiDefine states States
 * Endpoints related with queries about states
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
 * @apiDefine stateByMunicipalitiesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_municipality": "90",
 *      "municipality": "Dibulla"
 *    },
 *    {
 *      "id_municipality": "560",
 *      "municipality": "Manaure"
 *    }...
 *  ]
 */

module.exports = (errorHandler, stateService) => {
  const router = new Router();

  /**
   * @apiGroup states
   * @api {get} /states listStates
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
   * @apiGroup states
   * @api {get} /states/:state_id/municipalities stateByMunicipalities
   * @apiName stateByMunicipalities
   * @apiVersion 0.1.0
   * @apiDescription
   * List all municipalities information in the given state
   *
   * @apiParam {Number} state_id state id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.municipality municipality name
   * @apiSuccess {Number} result.id_municipality municipality id
   *
   * @apiExample {curl} Example usage:
   *  /states/44/municipalities
   * @apiUse stateByMunicipalitiesExample
   */
  router.get('/states/:state_id/municipalities', errorHandler((req, res, next) => (
    stateService.getMunicipalities(req.params.state_id)
      .then((municipalities) => {
        res.send(municipalities);
        next();
      })
  )));

  /**
   * @apiGroup states
   * @api {get} /states/:state_id/se StateBySE
   * @apiName StateBySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by strategic ecosysmtens
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the state
   * @apiSuccess {Number} result.percentage Percentage of the specified SE respect to the state area
   *
   * @apiExample {curl} Example usage:
   *  /states/44/se
   * @apiUse GeofenceBySEExample
   */
  router.get('/states/:state_id/se', errorHandler((req, res, next) => (
    stateService.getAreaBySE(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup states
   * @api {get} /states/:state_id/pa StateByPA
   * @apiName StateByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by protected areas
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA respect to the state area
   *
   * @apiExample {curl} Example usage:
   *  /states/44/pa
   * @apiUse GeofenceByPAExample
   */
  router.get('/states/:state_id/pa', errorHandler((req, res, next) => (
    stateService.getAreaByPA(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup states
   * @api {get} /states/:state_id/coverage StateByCoverage
   * @apiName StateByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the state total area by coverage type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the coverage type respect to the state.
   *
   * @apiExample {curl} Example usage:
   *  /states/44/coverage
   * @apiUse GeofenceByCoverageExample
   */
  router.get('/states/:state_id/coverage', errorHandler((req, res, next) => (
    stateService.getAreaByCoverage(req.params.state_id)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  return router;
};
