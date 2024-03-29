const { Router } = require('restify-router');
const RestifyErrors = require('restify-errors');

module.exports = (paService) => {
  const router = new Router();

  /**
   * @apiGroup s_protected_areas
   * @api {get} /pa ProtectedAreas
   * @apiName ProtectedAreas
   * @apiVersion 2.0.0
   * @apiDescription
   * Area distribution values for protected area categories within a given area.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} list of protected area categories
   * @apiSuccess {Number} result.area area of the specified category
   * @apiSuccess {String} result.type protected area category
   *
   * @apiExample {curl} Example usage:
   *  /pa?areaType=ea&areaId=DAGMA
   * @apiUse PAInGeofenceExample
   */
  router.get('/pa', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = new RestifyErrors.BadRequestError('areaType and areaId are required');
      return next(error);
    }
    return paService.getPAAreas(req.params.areaType, req.params.areaId).then((categories) => {
      res.send(categories);
      next();
    });
  });

  /**
   * @apiGroup s_protected_areas
   * @api {get} /pa/se ProtectedAreasSE
   * @apiName ProtectedAreasSE
   * @apiVersion 2.0.0
   * @apiDescription
   * Area distribution values for protected area categories within a SE type and a given area.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} seType strategic ecosystem type. Options are: Páramo,
   * Bosque Seco Tropical and Humedal.
   *
   * @apiSuccess {Object[]} list of protected area categories
   * @apiSuccess {Number} result.area area of the specified category
   * @apiSuccess {String} result.type protected area category
   *
   * @apiExample {curl} Example usage:
   *  /pa/se?areaType=ea&areaId=DAGMA&seType=Páramo
   * @apiUse PAInGeofenceExample
   */
  router.get('/pa/se', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.seType)) {
      const error = new RestifyErrors.BadRequestError('areaType, areaId and seType required');
      return next(error);
    }
    return paService
      .getPAAreas(req.params.areaType, req.params.areaId, req.params.seType)
      .then((binaryProtected) => {
        res.send(binaryProtected);
        next();
      });
  });

  return router;
};
