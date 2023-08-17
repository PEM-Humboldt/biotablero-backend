const { Router } = require('restify-router');
const RestifyErrors = require('restify-errors');

module.exports = (ForestLPService) => {
  const router = new Router();

  /**
   * @apiGroup s_forest_lp
   * @api {get} /forest/lp ForestLP
   * @apiName ForestLP
   * @apiVersion 2.0.0
   * @apiDescription
   * Values for the forest loss and persistence inside the given environmental authority
   *
   * Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2021 periods
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess {Object[]} result list of objects with information about forest LP
   * @apiSuccess {String} result.id period
   * @apiSuccess {Object[]} result.data data for forest LP divided by categories
   * @apiSuccess {Number} result.data.area area of the forest loss and persistence category
   * @apiSuccess {String} result.data.key forest loss and persistence category
   * @apiSuccess {Number} result.data.percentage percentage of the forest loss and persistence
   * category
   *
   * @apiExample {curl} Example usage:
   *  /forest/lp?areaType=ea&areaId=CARDER
   * @apiUse ForestLPExample
   */
  router.get('/forest/lp', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.BadRequestError('areaType and areaId required');
      return next(error);
    }
    return ForestLPService.getForestLP(req.params.areaType, req.params.areaId).then((value) => {
      res.send(value);
      next();
    });
  });

  /**
   * @apiGroup s_forest_lp
   * @api {get} /forest/lp/layer ForestLPLayer
   * @apiName ForestLPLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Get the the forest loss and persistence layer for a given period, divided by categories
   * inside the given environmental authority
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   * @apiParam (Query params) {String} category forest loss and persistence category.
   * (Options: persistencia, perdida, no_bosque)
   * @apiParam (Query params) {String} period period.
   * (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2021)
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /forest/lp/layer?areaType=ea&areaId=CARDER&category=persistencia&period=2000-2005
   * @apiUse ForestLPLayerExample
   */
  router.get('/forest/lp/layer', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.category && req.params.period)) {
      const error = new RestifyErrors.BadRequestError(
        'areaType, areaId, category and period are required',
      );
      return next(error);
    }
    return ForestLPService.getForestLPLayer(
      req.params.areaType,
      req.params.areaId,
      req.params.category,
      req.params.period,
    ).then((value) => {
      res.sendRaw(200, value, { 'Content-Type': 'image/png' });
      next();
    });
  });

  return router;
};
