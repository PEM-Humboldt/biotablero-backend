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
// TODO: Inject other services
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

  /**
   * @apiGroup geofences
   * @api {get} /geofences/departments listDepartments
   * @apiName listDepartments
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available departments
   *
   * @apiSuccess {Object[]} departments list of departments
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/departments
   * TODO: Add response example
   */
  router.get('/geofences/departments', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/municipalities listMunicipalities
   * @apiName listMunicipalities
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available municipalities
   *
   * @apiSuccess {Object[]} municipalities list of municipalities
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/municipalities
   * TODO: Add response example
   */
  router.get('/geofences/municipalities', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/basins listBasins
   * @apiName listBasins
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available basins
   *
   * @apiSuccess {Object[]} basins list of basins
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/basins
   * TODO: Add response example
   */
  router.get('/geofences/basins', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/sub-basins listSub-basins
   * @apiName listSub-basins
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available sub-basins
   *
   * @apiSuccess {Object[]} sub-basins list of sub-basins
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/sub-basins
   * TODO: Add response example
   */
  router.get('/geofences/sub-basins', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/protectedAreas listProtectedAreas
   * @apiName listProtectedAreas
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available protected areas
   *
   * @apiSuccess {Object[]} protectedAreas list of protected areas
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/protectedAreas
   * TODO: Add response example
   */
  router.get('/geofences/protectedAreas', errorHandler());

  /**
   * @apiGroup geofences
   * @api {get} /geofences/strategicEcosystems listStrategicEcosystems
   * @apiName listStrategicEcosystems
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available strategic ecosystems
   *
   * @apiSuccess {Object[]} strategicEcosystems list of strategic ecosystems
   * @apiSuccess TODO list other response attributes
   *
   * @apiExample {curl} Example usage:
   *  /geofences/strategicEcosystems
   * TODO: Add response example
   */
  router.get('/geofences/strategicEcosystems', errorHandler());

  return router;
};
