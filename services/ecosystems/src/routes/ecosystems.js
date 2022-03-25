const { Router } = require('restify-router');

module.exports = (errorHandler, EcosystemsService) => {
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
    '/ecosystems/coverage',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return EcosystemsService.getCoverage(req.params.areaType, req.params.areaId).then((value) => {
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
   * N (Natural), S(Secundaria), T(Transformada), and X(Nubes).
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} type coverage type. Options are: N (Natural), S(Secundaria),
   * T(Transformada) and X(Nubes).
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /coverage/layer?areaType=ea&areaId=CARDER&type=T
   * @apiUse CoverageLayerExample
   */
  router.get(
    '/ecosystems/coverage/layer',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId && req.params.type)) {
        const error = { code: 400, message: 'areaType, areaId and type are required' };
        throw error;
      }
      return EcosystemsService.getCoverageLayer(
        req.params.areaType,
        req.params.areaId,
        req.params.type,
      ).then((value) => {
        res.sendRaw(200, value, { 'Content-Type': 'image/png' });
        next();
      });
    }),
  );

  /**
   * @apiGroup s_strategic_ecosystem
   * @api {get} /se SEAreas
   * @apiName SEAreas
   * @apiVersion 1.0.0
   * @apiDescription
   * Area distribution for each SE type and total SE area within a given area
   *
   * Values calculated for 2018
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.area area of the each strategic ecosystem type and total
   * @apiSuccess {String} result.type strategic ecosystem type
   *
   * @apiExample {curl} Example usage:
   *  /se?areaType=ea&areaId=DAGMA
   * @apiUse SEAreasExample
   */
  router.get(
    '/ecosystems/se',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return EcosystemsService.getSEAreas(req.params.areaType, req.params.areaId).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_coverage
   * @api {get} /coverage/se CoverageSE
   * @apiName CoverageSE
   * @apiVersion 1.0.0
   * @apiDescription
   * Area distribution for each coverage type within a SE type and a given area
   *
   * Values calculated for 2018
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} seType strategic ecosystem type. Options are: Páramo,
   * Bosque Seco Tropical and Humedal.
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.area area of the specified coverage type
   * @apiSuccess {String} result.type coverage type
   * @apiSuccess {Number} result.percentage percentage of the specified coverage type
   *
   * @apiExample {curl} Example usage:
   *  /coverage/se?areaType=ea&areaId=DAGMA&seType=Páramo
   * @apiUse CoverageSEExample
   */
  router.get(
    '/ecosystems/coverage/se',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId && req.params.seType)) {
        const error = { code: 400, message: 'areaType, areaId and seType required' };
        throw error;
      }
      return EcosystemsService.getCoverageSE(
        req.params.areaType,
        req.params.areaId,
        req.params.seType,
      ).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_coverage
   * @api {get} /coverage/se/layer CoverageSELayer
   * @apiName CoverageSELayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of a specific coverage type and se type within a given area. Options for coverageType:
   * N (Natural), S(Secundaria), T(Transformada), and X(Nubes). Options for seType: Páramo,
   * Bosque Seco Tropical and Humedal.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} coverageType coverage type. Options are: N (Natural),
   * S(Secundaria), T(Transformada) and X(Nubes).
   * @apiParam (Query params) {String} seType strategic ecosystem type. Options are: Páramo,
   * Bosque Seco Tropical and Humedal.
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /coverage/se/layer?areaType=ea&areaId=CARDER&coverageType=N&seType=Páramo
   * @apiUse CoverageSELayerExample
   */
  router.get(
    '/ecosystems/coverage/se/layer',
    errorHandler((req, res, next) => {
      if (
        !(req.params.areaType && req.params.areaId && req.params.coverageType && req.params.seType)
      ) {
        const error = { code: 400, message: 'areaType, areaId and type are required' };
        throw error;
      }
      return EcosystemsService.getCoverageSELayer(
        req.params.areaType,
        req.params.areaId,
        req.params.coverageType,
        req.params.seType,
      ).then((value) => {
        res.sendRaw(200, value, { 'Content-Type': 'image/png' });
        next();
      });
    }),
  );

  return router;
};
