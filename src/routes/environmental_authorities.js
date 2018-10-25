const { Router } = require('restify-router');

/**
 * @apiDefine ea Environmental Authorities
 * Endpoints related with queries about environmental authorities
 */

module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup ea
   * @api {get} /ea
   * @apiName listEA
   * @apiVersion 0.1.0
   * @apiDescription
   * TODO
   */
  router.get('/ea', errorHandler((req, res, next) => (
    eaService.getAll()
      .then((ea) => {
        res.send(ea);
        next();
      })
  )));

  return router;
};
