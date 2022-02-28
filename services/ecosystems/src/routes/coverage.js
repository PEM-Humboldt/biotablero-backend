const { Router } = require('restify-router');

module.exports = (errorHandler, coverageService) => {
  const router = new Router();

  /**
   * @apiGroup s_coverage
   * @api {get} /coverage Coverage
   * @apiName Coverage
   * @apiVersion 1.0.0
   * @apiDescription
   * Area distribution for each coverage type and its percentage within a given area
   *
   * Values calculated for 2018
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.area area of the specified coverage type
   * @apiSuccess {String} result.key coverage type
   * @apiSuccess {Number} result.percentage percentage of the specified coverage type
   *
   * @apiExample {curl} Example usage:
   *  /coverage?areaType=ea&areaId=DAGMA
   * @apiUse CoverageExample
   */
  router.get(
    '/coverage',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return coverageService.getCoverage(req.params.areaType, req.params.areaId).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_coverage
   * @api {get} /coverage/layer CoverageLayer
   * @apiName CoverageLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of a specific coverage type within a given area. Parameter type could be:
   * N (Natural), S(Secundaria), T(Transformada).
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} type to select the proper type of coverage. Options are:
   * N (Natural), S(Secundaria), T(Transformada).
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /coverage/layer?areaType=ea&areaId=CARDER&type=T
   * @apiUse CoverageLayerExample
   */
  router.get(
    '/coverage/layer',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId && req.params.type)) {
        const error = { code: 400, message: 'areaType, areaId and type are required' };
        throw error;
      }
      return coverageService
        .getCoverageLayer(req.params.areaType, req.params.areaId, req.params.type)
        .then((value) => {
          res.sendRaw(200, value, { 'Content-Type': 'image/png' });
          next();
        });
    }),
  );

  return router;
};
