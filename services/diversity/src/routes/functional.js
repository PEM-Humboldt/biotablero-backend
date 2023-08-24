const RestifyErrors = require('restify-errors');
const { Router } = require('restify-router');

module.exports = (FunctionalService) => {
  const router = new Router();

  /**
   * @apiGroup s_functional_diversity
   * @api {get} /functional-diversity/dry-forest/values DryForestValues
   * @apiName DryForestValues
   * @apiVersion 1.0.0
   * @apiDescription
   * Values of functional diversity in the dry forest in a given area.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.richness richness value inside the given area
   * @apiSuccess {Number} result.uniformity uniformity value inside the given area
   * @apiSuccess {Number} result.divergence divergence value inside the given area
   *
   * @apiExample {curl} Example usage:
   *  /functional-diversity/dry-forest/values?areaType=ea&areaId=CARDER
   * @apiUse DryForestValuesExample
   */
  router.get('/functional-diversity/dry-forest/values', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.BadRequestError('areaType and areaId are required');
      return next(error);
    }
    return FunctionalService.getDryForestValues(req.params.areaType, req.params.areaId).then(
      (value) => {
        res.send(value);
        next();
      },
    );
  });

  /**
   * @apiGroup s_functional_diversity
   * @api {get} /functional-diversity/dry-forest/features DryForestFeatures
   * @apiName DryForestFeatures
   * @apiVersion 1.0.0
   * @apiDescription
   * Values of functional features in the dry forest in a given area. Features are: Leaf Area,
   * Leaf Nitrogen, Maximun Height, Specific Leaf Area, Wood Density and Seed Mass.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id feature id
   * @apiSuccess {Number} result.min lowest value for the specific feature in the given area
   * @apiSuccess {Number} result.max highest value for the specific feature in the given area
   * @apiSuccess {Number} result.value value for the specific feature in the given area
   *
   * @apiExample {curl} Example usage:
   *  /functional-diversity/dry-forest/features?areaType=ea&areaId=CARDER
   * @apiUse DryForestFeaturesExample
   */
  router.get('/functional-diversity/dry-forest/features', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.BadRequestError('areaType and areaId are required');
      return next(error);
    }
    return FunctionalService.getDryForestFeatures(req.params.areaType, req.params.areaId).then(
      (value) => {
        res.send(value);
        next();
      },
    );
  });

  return router;
};
