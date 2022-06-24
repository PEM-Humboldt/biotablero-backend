const { Router } = require('restify-router');

module.exports = (errorHandler, UtilService) => {
  const router = new Router();

  /**
   * @apiGroup s_texts
   * @api {get} /util/texts Texts
   * @apiName Texts
   * @apiVersion 1.0.0
   * @apiDescription
   * Texts that describe one section in the frontend
   *
   * @apiParam (Query params) {String} key key associated to one section in the frontend
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.info General description of the section
   * @apiSuccess {String} result.meto Methodology
   * @apiSuccess {String} result.cons Considerations
   * @apiSuccess {String} result.quote Bibliography and references
   *
   * @apiExample {curl} Example usage:
   *  /util/texts?key=test
   * @apiUse TextsExample
   */
  router.get(
    '/util/texts',
    errorHandler((req, res, next) => {
      if (!req.params.key) {
        const error = { code: 400, message: 'key is required' };
        throw error;
      }
      return UtilService.getTexts(req.params.key).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  return router;
};
