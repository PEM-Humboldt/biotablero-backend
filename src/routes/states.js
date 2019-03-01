const { Router } = require('restify-router');

/**
 * @apiDefine states States
 * Endpoints related with queries about states
 */

/**
 * @apiDefine municipalitiesInStateExample
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
   * @api {get} /states/:state_id/municipalities MunicipalitiesInState
   * @apiName MunicipalitiesInState
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
   * @apiUse municipalitiesInStateExample
   */
  router.get('/states/:state_id/municipalities', errorHandler((req, res, next) => (
    stateService.getMunicipalities(req.params.state_id)
      .then((municipalities) => {
        res.send(municipalities);
        next();
      })
  )));

  return router;
};
