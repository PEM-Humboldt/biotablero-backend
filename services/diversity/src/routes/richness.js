const { Router } = require('restify-router');

module.exports = (errorHandler, Richness) => {
  const router = new Router();

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species NumberOfSpecies
   * @apiName NumberOfSpecies
   * @apiVersion 1.0.0
   * @apiDescription
   * Number of observed and inferred species for a given area, and number of species in the region
   * the area is in. Can be filtered by group: total, endemic, invasive and threatened, or get all
   * of them.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} [group] group to filter results
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.inferred inferred number of species (according to BioModelos)
   * @apiSuccess {Number} result.observed observed number of species (according to I2D)
   * @apiSuccess {Number} result.region number of species in the region the area belongs to
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

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species/thresholds NSThresholds
   * @apiName NSThresholds
   * @apiVersion 1.0.0
   * @apiDescription
   * Lowest and highest values for the number of species among national areas of the same type. Can
   * be filtered by group
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String} [group] group to filter results
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.min_inferred minimum number of inferred species (according to
   * BioModelos)
   * @apiSuccess {Number} result.min_observed minimum number of observed species (according to
   * I2D)
   * @apiSuccess {Number} result.max_inferred maximum number of inferred species (according to
   * BioModelos)
   * @apiSuccess {Number} result.max_observed maximum number of observed species (according to
   * I2D)
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species/thresholds?areaType=ea&group=total
   * @apiUse NSThresholdsExample
   */
  router.get('/richness/number-species/thresholds', errorHandler((req, res, next) => {
    if (!(req.params.areaType)) {
      const error = { code: 400, message: 'areaType is required' };
      throw error;
    }
    return Richness.getNSThresholds(req.params.areaType, req.params.group)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  return router;
};
