const { Router } = require('restify-router');

module.exports = (errorHandler, connectivityService) => {
  const router = new Router();

  /**
   * @apiGroup s_pa_connectivity
   * @api {get} /connectivity/current Current
   * @apiName Current
   * @apiVersion 1.0.0
   * @apiDescription
   * Area distribution for each category of protected area connectivity in a given area
   *
   * Value calculated for 2018
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key PA connectivity category
   * @apiSuccess {String} result.area area of the specified PA connectivity category
   * @apiSuccess {String} result.percentage percentage of the specified PA connectivity category
   *
   * @apiExample {curl} Example usage:
   *  /connectivity/current?areaType=ea&areaId=DAGMA
   * @apiUse CurrentExample
   */
  router.get('/connectivity/current', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId required' };
      throw error;
    }
    return connectivityService.getCurrentPAConnectivity(req.params.areaType, req.params.areaId)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_pa_connectivity
   * @api {get} /connectivity/dpc DPC
   * @apiName DPC
   * @apiVersion 1.0.0
   * @apiDescription
   * Values of connectivity for the protected areas with higher dPC value in a given area
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   * @apiParam (Query params) {Number} paNumber number of protected areas to return
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id protected area name
   * @apiSuccess {String} result.key dpc category
   * @apiSuccess {String} result.value dpc value
   * @apiSuccess {String} result.area area of the protected area
   *
   * @apiExample {curl} Example usage:
   *  /connectivity/dpc?areaType=ea&areaId=DAGMA&paNumber=5
   * @apiUse DPCExample
   */
  router.get('/connectivity/dpc', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId required' };
      throw error;
    }
    if (!req.params.paNumber) {
      req.params.paNumber = 1;
    }
    return connectivityService.getPADPC(req.params.areaType, req.params.areaId, req.params.paNumber)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_pa_connectivity
   * @api {get} /connectivity/dpc/layer DPCLayer
   * @apiName DPCLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layers of the protected areas with higher dPC value in a given area
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   * @apiParam (Query params) {Number} paNumber number of protected areas layers to return
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /connectivity/dpc/layer?areaType=ea&areaId=DAGMA&paNumber=5
   * @apiUse DPCLayerExample
   */
  router.get('/connectivity/dpc/layer', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId required' };
      throw error;
    }
    if (!req.params.paNumber) {
      req.params.paNumber = 1;
    }
    return connectivityService.getPAConnectivityLayers(
      req.params.areaType,
      req.params.areaId,
      req.params.paNumber,
    )
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  return router;
};
