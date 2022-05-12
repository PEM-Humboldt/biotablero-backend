const { Router } = require('restify-router');

module.exports = (errorHandler, paService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/categories/binary_protected listCategoriesByBinaryProtected
   * @apiName listCategoriesByBinaryProtected
   * @apiVersion 2.0.0
   * @apiDescription
   * List available protected area categories for the given binary protected values
   *
   * @apiParam (Query params) {String} binary_protected list of binary protected values
   * separated by ;
   *
   * @apiSuccess {Object[]} category list of protected area categories
   *  for the given binary protected values
   * @apiSuccess {String} binary_protected binary value
   * @apiSuccess {String} label category name
   *
   * @apiExample {curl} Example usage:
   *  /pa/categories/binary_protected?binary_protected=000001000000000;010100000000000
   * @apiUse PACategoriesByBinaryProtectedExample
   */
  router.get(
    '/pa/categories/binary_protected',
    errorHandler((req, res, next) =>
      paService
        .getCategoriesByBinaryProtected(req.params.binary_protected.split(';'))
        .then((categories) => {
          res.send(categories);
          next();
        }),
    ),
  );

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/:category/binary_protected BinaryProtectedByCategory
   * @apiName BinaryProtectedByCategory
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the binary protected value for the given category name
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Object} result.binary_protected binary protected value
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/binary_protected
   * @apiUse BinaryProtectedByCategoryExample
   */
  router.get(
    '/pa/:category/binary_protected',
    errorHandler((req, res, next) =>
      paService.getBinaryProtectedByCategory(req.params.category).then((binaryProtected) => {
        res.send(binaryProtected);
        next();
      }),
    ),
  );

  return router;
};
