const { Router } = require('restify-router');

module.exports = (errorHandler, SCIHFService) => {
  const router = new Router();

  /**
   * @apiGroup sci_hf
   * @api {get} /sci/hf/:areaType/:areaId SCIHF
   * @apiName SCIHF
   * @apiVersion 1.0.0
   * @apiDescription
   * Forest Structural Condition Index for a given area
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {String | Number} areaType area type
   * @apiParam (Path params) {String} areaId area id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.hf_pers Persistence category
   * @apiSuccess {String} result.sci_cat SCI categoy
   * @apiSuccess {String} result.pa Protected area category name
   * @apiSuccess {String} result.area Area inside the given area
   *
   * @apiExample {curl} Example usage:
   *  /sci/hf/ea/DAGMA
   * @apiUse SCIHFExample
   */
  router.get('/sci/hf/:areaType/:areaId', errorHandler((req, res, next) => (
    SCIHFService.getSCIHF(req.params.areaType, req.params.areaId)
      .then((value) => {
        res.send(value);
        next();
      })
  )));

  return router;
};
