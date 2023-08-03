const { Router } = require('restify-router');
const RestifyErrors = require('restify-errors');

module.exports = (EcosystemsService) => {
  const router = new Router();

  /**
   * @apiGroup s_coverage
   * @api {get} /ecosystems/coverage Coverage
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
   *  /ecosystems/coverage?areaType=ea&areaId=DAGMA
   * @apiUse CoverageExample
   */
  router.get('/ecosystems/coverage', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.NotFoundError('areaType and areaId required');
      return next(error);
    }
    return EcosystemsService.getCoverage(req.params.areaType, req.params.areaId).then((value) => {
      res.send(value);
      next();
    });
  });

  /**
   * @apiGroup s_strategic_ecosystem
   * @api {get} /ecosystems/se SEAreas
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
   *  /ecosystems/se?areaType=ea&areaId=DAGMA
   * @apiUse SEAreasExample
   */
  router.get('/ecosystems/se', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.NotFoundError('areaType and areaId required');
      return next(error);
    }
    return EcosystemsService.getSEAreas(req.params.areaType, req.params.areaId).then((value) => {
      res.send(value);
      next();
    });
  });

  /**
   * @apiGroup s_coverage
   * @api {get} /ecosystems/coverage/se CoverageSE
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
   *  /ecosystems/coverage/se?areaType=ea&areaId=DAGMA&seType=Páramo
   * @apiUse CoverageSEExample
   */
  router.get('/ecosystems/coverage/se', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.seType)) {
      const error = new RestifyErrors.NotFoundError('areaType, areaId and seType required');
      return next(error);
    }
    return EcosystemsService.getCoverageSE(
      req.params.areaType,
      req.params.areaId,
      req.params.seType,
    ).then((value) => {
      res.send(value);
      next();
    });
  });

  /**
   * @apiGroup s_coverage
   * @api {get} /ecosystems/coverage/layer CoverageLayer
   * @apiName CoverageLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of a specific coverage type within a given area. Parameter type could be:
   * N (Natural), S(Secundaria), T(Transformada), and X(Nubes).
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} coverageType coverage type. Options are: N (Natural),
   * S(Secundaria), T(Transformada) and X(Nubes).
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /ecosystems/coverage/layer?areaType=ea&areaId=CARDER&coverageType=T
   * @apiUse CoverageLayerExample
   */
  router.get('/ecosystems/coverage/layer', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.coverageType)) {
      const error = new RestifyErrors.NotFoundError(
        'areaType, areaId and coverageType are required',
      );
      return next(error);
    }
    return EcosystemsService.getCoverageLayer(
      req.params.areaType,
      req.params.areaId,
      req.params.coverageType,
    ).then((value) => {
      res.sendRaw(200, value, { 'Content-Type': 'image/png' });
      next();
    });
  });

  /**
   * @apiGroup s_coverage
   * @api {get} /ecosystems/coverage/se/layer CoverageSELayer
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
   *  /ecosystems/coverage/se/layer?areaType=ea&areaId=CARDER&coverageType=N&seType=Páramo
   * @apiUse CoverageSELayerExample
   */
  router.get('/ecosystems/coverage/se/layer', (req, res, next) => {
    if (
      !(req.params.areaType && req.params.areaId && req.params.coverageType && req.params.seType)
    ) {
      const error = new RestifyErrors.NotFoundError(
        'areaType, areaId, coverageType and seType are required',
      );
      return next(error);
    }
    return EcosystemsService.getCoverageSELayer(
      req.params.areaType,
      req.params.areaId,
      req.params.coverageType,
      req.params.seType,
    ).then((value) => {
      console.log('value', value);
      res.sendRaw(200, value, { 'Content-Type': 'image/png' });
      next();
    });
  });

  return router;
};
