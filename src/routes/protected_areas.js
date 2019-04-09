const { Router } = require('restify-router');

/**
 * @apiDefine pa Protected Areas
 * Endpoint with queries about protected areas
 */

/**
 * @apiDefine PACategoriesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "name": "Reserva Natural de la Sociedad Civil"
 *    },
 *    {
 *      "name": "Distritos Nacionales de Manejo Integrado"
 *    }...
 *  ]
 */

/**
 * @apiDefine paByCategoryExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "gid": 1,
 *      "name": "Montecristo",
 *      "category": "Reserva Natural de la Sociedad Civil",
 *      "organization": "PNN"
 *    },
 *    {
 *      "gid": 12,
 *      "name": "La Esperanza",
 *      "category": "Reserva Natural de la Sociedad Civil",
 *      "organization": "PNN"
 *    },
 *  ]
 */

/**
 * @apiDefine PAByPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0,
 *      "type": "Santuario de Fauna y Flora"
 *    },
 *    {
 *      "percentage": 1,
 *      "type": "Parques Naturales Regionales"
 *    }...
 *  ]
 */

module.exports = (errorHandler, paService) => {
  const router = new Router();

  /**
   * @apiGroup pa
   * @api {get} /pa/categories listCategories
   * @apiName listCategories
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available protected area categories
   *
   * @apiSuccess {Object[]} category list of protected area categories
   * @apiSuccess {String} category.name category name
   *
   * @apiExample {curl} Example usage:
   *  /pa/categories
   * @apiUse PACategoriesExample
   */
  router.get('/pa/categories', errorHandler((req, res, next) => (
    paService.getCategories()
      .then((categories) => {
        res.send(categories);
        next();
      })
  )));

  /**
   * @apiGroup pa
   * @api {get} /pa/category/:category_name ProtectedAreasByCategory
   * @apiName ProtectedAreasByCategory
   * @apiVersion 0.1.0
   * @apiDescription
   * List all protected areas in a given category
   *
   * @apiSuccess {Object[]} result list of protected areas in category
   * @apiSuccess {String} result.gid protected area id
   * @apiSuccess {String} result.name protected area name
   * @apiSuccess {String} result.category protected area category
   * @apiSuccess {String} result.organization organizarion in charge of the protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/category/Reserva Natural de la Sociedad Civil
   * @apiUse paByCategoryExample
   */
  router.get('/pa/category/:category_name', errorHandler((req, res, next) => (
    paService.getByCategory(req.params.category_name)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  /**
   * @apiGroup pa
   * @api {get} /pa/:category/se PABySE
   * @apiName PABySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by strategic ecosysmtens
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the protected area
   * @apiSuccess {Number} result.percentage Percentage of the SE respect to the protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se
   * @apiUse GeofenceBySEExample
   */
  router.get('/pa/:category/se', errorHandler((req, res, next) => (
    paService.getAreaBySE(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup pa
   * @api {get} /pa/:category/pa PAByPA
   * @apiName PAByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by protected areas
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/pa
   * @apiUse PAByPAExample
   */
  router.get('/pa/:category/pa', errorHandler((req, res, next) => (
    paService.getAreaByPA(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup pa
   * @api {get} /pa/:category/coverage PAByCoverage
   * @apiName PAByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by coverage type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the coverage type respect to the PA.
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/coverage
   * @apiUse GeofenceByCoverageExample
   */
  router.get('/pa/:category/coverage', errorHandler((req, res, next) => (
    paService.getAreaByCoverage(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup pa
   * @api {get} /pa/layers/national PANationalLayer
   * @apiName PANationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by protected areas
   *
   * **The response is a GeoJson object, only the first level will be described here**
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type The geometry type
   * @apiSuccess {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess {Object[]} result.features features information (id, type, properties, etc)
   * @apiSuccess {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /pa/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get('/pa/layers/national', errorHandler((req, res, next) => (
    paService.getNationalLayer()
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  return router;
};
