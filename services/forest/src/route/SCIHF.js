const { Router } = require('restify-router');

module.exports = (errorHandler, SCIHFService) => {
  const router = new Router();

  /**
   * @apiGroup s_sci_hf
   * @api {get} /forest/sci/hf SCIHF
   * @apiName SCIHF
   * @apiVersion 1.0.0
   * @apiDescription
   * Values for the forest structural condition index crossed with human footprint
   * and protected area categories for a given area
   *
   * Value calculated for 2018
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.hf_pers Persistence category
   * @apiSuccess {String} result.sci_cat SCI categoy
   * @apiSuccess {String} result.pa Protected area category name
   * @apiSuccess {String} result.area Area inside the given area
   *
   * @apiExample {curl} Example usage:
   *  /forest/sci/hf?areaType=ea&areaId=DAGMA
   * @apiUse SCIHFExample
   */
  router.get(
    '/forest/sci/hf',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return SCIHFService.getSCIHF(req.params.areaType, req.params.areaId).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_sci_hf
   * @api {get} /forest/sci/hf/layer SCIHFLayer
   * @apiName SCIHFLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of the forest structural condition index crossed with human footprint for a given area
   *
   * Value calculated for 2018
   *
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /forest/sci/hf/layer?areaType=ea&areaId=DAGMA
   * @apiUse SCIHFLayerExample
   */
  router.get(
    '/forest/sci/hf/layer',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return SCIHFService.getSCIHFLayer(req.params.areaType, req.params.areaId).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  /**
   * @apiGroup s_sci_hf
   * @api {get} /forest/sci/:sciCat/hf/:hfPers/layer SCIHFPALayer
   * @apiName SCIHFPALayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of one combination of forest structural condition index category and a human
   * footprint persistence category, divided by protected areas for a given area
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {String} sciCat sci category
   * @apiParam (Path params) {String} hfPers human footprint persistence category
   * @apiParam (Query params) {String|Number} areaType area type
   * @apiParam (Query params) {String} areaId area id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /forest/sci/baja_moderada/hf/estable_alta/layer?areaType=ea&areaId=DAGMA
   * @apiUse SCIHFPALayerExample
   */
  router.get(
    '/forest/sci/:sciCat/hf/:hfPers/layer',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId)) {
        const error = { code: 400, message: 'areaType and areaId required' };
        throw error;
      }
      return SCIHFService.getSCIHFPALayer(
        req.params.sciCat,
        req.params.hfPers,
        req.params.areaType,
        req.params.areaId,
      ).then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  return router;
};
