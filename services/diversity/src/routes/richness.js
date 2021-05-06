const { Router } = require('restify-router');

module.exports = (errorHandler, Richness) => {
  const router = new Router();

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species NumberOfSpecies
   * @apiName NumberOfSpecies
   * @apiVersion 1.0.0
   * @apiDescription
   * Number of observed and inferred species for a given area, filtered by groups: total,
   * endemic, invasive, threatened or all.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} [group] group to filter results
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.inferred inferred number of species (according to BioModelos)
   * @apiSuccess {Number} result.observed observed number of species (according to I2D)
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species?areaType=ea&areaId=CARDER&group=all
   * @apiUse NumberOfSpeciesExample
   */
  router.get('/richness/number-species', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId are required' };
      throw error;
    }
    return Richness.getNumberSpecies(req.params.areaType, req.params.areaId, req.params.group)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  return router;
};
