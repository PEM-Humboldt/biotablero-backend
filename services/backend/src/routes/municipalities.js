const { Router } = require('restify-router');

module.exports = (errorHandler, municipalityService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_states
   * @api {get} /municipalities listAllMunicipalities
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
   *  /municipalities
   * @apiUse getAllMunicipalitiesExample
   */
  router.get(
    '/municipalities',
    errorHandler((req, res, next) =>
      municipalityService.getAll().then((municipalities) => {
        res.send(municipalities);
        next();
      }),
    ),
  );

  return router;
};
