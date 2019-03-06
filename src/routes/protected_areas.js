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

  return router;
};
