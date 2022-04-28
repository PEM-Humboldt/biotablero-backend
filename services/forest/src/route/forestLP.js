const { Router } = require('restify-router');

module.exports = (errorHandler, ForestLPService) => {
  const router = new Router();

  /**
   * @apiGroup s_forest_lp
   * @api {get} /forest/lp ForestLP
   * @apiName ForestLP
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the forest loss and persistence inside the given environmental authority
   *
   * Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess {Object[]} result list of objects with information about forest LP
   * @apiSuccess {String} result.id period
   * @apiSuccess {String} result.data data for forest LP divided by categories
   *
   * @apiExample {curl} Example usage:
   *  /forest/lp?areaType=ea&areaId=CARDER
   * @apiUse ForestLPExample
   */
  router.get(
    '/forest/lp',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return ForestLPService.getForestLP(req.params.areaType, req.params.areaId).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

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
   * (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /forest/lp/layer?areaType=ea&areaId=CARDER&category=persistencia&period=2000-2005
   * @apiUse ForestLPLayerExample
   */
   router.get(
    '/forest/lp/layer',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId && req.params.category && req.params.period)) {
        const error = { code: 400, message: 'areaType, areaId, category and period are required' };
        throw error;
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
    }),
  );

  return router;
};
