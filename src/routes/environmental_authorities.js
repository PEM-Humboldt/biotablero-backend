const { Router } = require('restify-router');

/**
 * @apiDefine ea Environmental Authorities
 * Endpoints related with queries about environmental authorities
 */

/**
 * @apiDefine getAllEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_ea": "CRC",
 *      "name": "Corporacion Autonoma Regional del Cauca"
 *    },
 *    {
 *      "id_ea": "CORPOGUAVIO",
 *      "name": "Corporacion Autonoma Regional del Guavio"
 *    }...
 *  ]
 */
module.exports = (errorHandler, eaService) => {
  const router = new Router();

  /**
   * @apiGroup ea
   * @api {get} /ea listEA
   * @apiName listEA
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available environmental authorities
   *
   * @apiSuccess {Object[]} ea list of environmental authorities
   * @apiSuccess {Number} ea.id_ea environmental authority id
   * @apiSuccess {String} ea.name environmental authority name
   *
   * @apiExample {curl} Example usage:
   *  /ea
   * @apiUse getAllEAExample
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
