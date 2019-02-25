const { Router } = require('restify-router');

/**
 * @apiDefine geofences Geofences
 * Geofences endpoints: Given some kind of geofence, such as environmental authority, get its area
 * divided by some criterion, such as compensation factor, biomes or biotic units
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
   * @apiGroup geofences
   * @api {get} /geofences/ea listEA
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
   *  /geofences/ea
   * @apiUse getAllEAExample
   */
  router.get('/geofences/ea', errorHandler((req, res, next) => (
    eaService.getAll()
      .then((ea) => {
        res.send(ea);
        next();
      })
  )));

  return router;
};
