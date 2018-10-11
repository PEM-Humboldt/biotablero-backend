const { Router } = require('restify-router');

/**
 * @apiDefine biomes Biomes
 * Endpoints related with queries about biomes
 */

/**
 * @apiDefine getBiomesByEAExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type": "Topology",
 *    "objects": {
 *      "ea": {
 *        "type": "GeometryCollection",
 *        "geometries": [
 *          {
 *            "type": "MultiPolygon",
 *            "arcs": [...],
 *            "properties": {
 *              "id_ea": "CORPOBOYACA",
 *              "name_biome": "Hidrobioma Magdalena medio y depresión momposina"
 *            }
 *          },
 *          {
 *            "type": "MultiPolygon",
 *            "arcs": [...],
 *            "properties": {
 *              "id_ea": "CORPOBOYACA",
 *              "name_biome": "Orobioma de Paramo Uwa"
 *            }
 *          }...
 *        ]
 *      }
 *    },
 *    "arcs": [...],
 *    "bbox": [...]
 *  }
 */

module.exports = (errorHandler, biome) => {
  const router = new Router();

  /**
   * @apiGroup biomes
   * @api {get} /biomes/ea/:ea_name getBiomesByEA
   * @apiName getBiomesByEA
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all biomes that belong to the given environmental authority.
   *
   * **Some of the response properties are TopoJson / GeoJson standard properties, so they are not
   * described here.**
   *
   * @apiParam {String} ea_name environmental authority to filter biomes
   *
   * @apiSuccess {Object} topo TopoJson object
   * @apiSuccess {Object} topo.objects.ea GeometryCollection with biomes information
   * @apiSuccess {Object[]} topo.objects.ea.geometries biome object
   * @apiSuccess {Object} topo.objects.ea.geometries.properties biome properties besides geometry.
   * @apiSuccess {Object} topo.objects.ea.geometries.properties.id_ea environmental authority id
   * @apiSuccess {Object} topo.objects.ea.geometries.properties.name_biome biome name
   *
   * @apiExample {curl} Example usage:
   *  /biomes/ea/CORPOBOYACA
   * @apiUse getBiomesByEAExample
   */
  router.get('/biomes/ea/:ea_name', errorHandler((req, res, next) => (
    biome.getBiomeByEA(req.params.ea_name)
      .then((biomes) => {
        res.send(biomes);
        next();
      })
  )));

  return router;
};