const { Router } = require('restify-router');

module.exports = (errorHandler, Richness) => {
  const router = new Router();

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species NumberOfSpecies
   * @apiName NumberOfSpecies
   * @apiVersion 1.0.0
   * @apiDescription
   * Number of observed and inferred species for a given area, and number of species in the region
   * the area is in. Can be filtered by group: total, endemic, invasive and threatened, or get all
   * of them.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} [group] group to filter results. Options are: all, total,
   * endemic, invasive and threatened.
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.inferred inferred number of species (according to BioModelos)
   * @apiSuccess {Number} result.observed observed number of species (according to I2D)
   * @apiSuccess {Number} result.region_observed number of observed species in the region the
   * area belongs to
   * @apiSuccess {Number} result.region_inferred number of inferred species in the region the
   * area belongs to
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species?areaType=ea&areaId=CARDER&group=all
   * @apiUse NumberOfSpeciesExample
   */
  router.get('/richness/number-species', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId are required' };
      throw error;
    }
    return Richness.getNumberSpecies(req.params.areaType, req.params.areaId, req.params.group)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species/thresholds NSThresholds
   * @apiName NSThresholds
   * @apiVersion 1.0.0
   * @apiDescription
   * Lowest and highest values for the number of species among national areas of the same type. Can
   * be filtered by group: total, endemic, invasive and threatened, or get all of them.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String} [group] group to filter results. Options are: all, total,
   * endemic, invasive and threatened.
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.min_inferred minimum number of inferred species (according to
   * BioModelos)
   * @apiSuccess {Number} result.min_observed minimum number of observed species (according to
   * I2D)
   * @apiSuccess {Number} result.max_inferred maximum number of inferred species (according to
   * BioModelos)
   * @apiSuccess {Number} result.max_observed maximum number of observed species (according to
   * I2D)
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species/thresholds?areaType=ea&group=total
   * @apiUse NSThresholdsExample
   */
  router.get('/richness/number-species/thresholds', errorHandler((req, res, next) => {
    if (!(req.params.areaType)) {
      const error = { code: 400, message: 'areaType is required' };
      throw error;
    }
    return Richness.getNSThresholds(req.params.areaType, req.params.group)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_richness
   * @api {get} /richness/gaps Gaps
   * @apiName Gaps
   * @apiVersion 1.0.0
   * @apiDescription
   * Average, lowest and highest value of species richness gaps for a given area. Also,
   * lowest and highest values among national areas of the same type.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.avg average value inside the given area
   * @apiSuccess {Number} result.min lowest value inside the given area
   * @apiSuccess {Number} result.max highest value inside the given area
   * @apiSuccess {Number} result.min_threshold lowest value among national areas of the same type
   * @apiSuccess {Number} result.max_threshold highest value among national areas of the same type
   *
   * @apiExample {curl} Example usage:
   *  /richness/gaps?areaType=ea&areaId=CARDER
   * @apiUse GapsExample
   */
  router.get('/richness/gaps', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId are required' };
      throw error;
    }
    return Richness.getGaps(req.params.areaType, req.params.areaId)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_richness
   * @api {get} /richness/concentration Concentration
   * @apiName Concentration
   * @apiVersion 1.0.0
   * @apiDescription
   * Average, minimun and máximun value of species richness concentration for a given area. Also,
   * lowest and highest values at nacional level.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id group id related to the results
   * @apiSuccess {Number} result.avg average value inside the given area
   * @apiSuccess {Number} result.min lowest value inside the given area
   * @apiSuccess {Number} result.max highest value inside the given area
   * @apiSuccess {Number} result.min_threshold lowest value among national areas of the same type
   * @apiSuccess {Number} result.max_threshold highest value among national areas of the same type
   *
   * @apiExample {curl} Example usage:
   *  /richness/concentration?areaType=ea&areaId=CARDER
   * @apiUse ConcentrationExample
   */
  router.get('/richness/concentration', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId are required' };
      throw error;
    }
    return Richness.getConcentration(req.params.areaType, req.params.areaId)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species/layer NOSLayer
   * @apiName NOSLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of a specific group for richness - number of species in a given area. Parameter group
   * may be selected from: total, endemic, invasive and threatened.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} group group to select the proper layer. Options are:
   * total, endemic, invasive and threatened.
   *
   * @apiSuccess {Binary} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species/layer?areaType=ea&areaId=CARDER&group=total
   * @apiUse NOSLayerExample
   */
  router.get('/richness/number-species/layer', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.group)) {
      const error = { code: 400, message: 'areaType, areaId and group are required' };
      throw error;
    }
    return Richness.NOSLayer(req.params.areaType, req.params.areaId, req.params.group)
      .then((value) => {
        res.sendRaw(200, value, { 'Content-Type': 'image/png' });
        next();
      });
  }));

  /**
   * @apiGroup s_richness
   * @api {get} /richness/number-species/layer/thresholds NOSLayerThresholds
   * @apiName NOSLayerThresholds
   * @apiVersion 1.0.0
   * @apiDescription
   * Min and max value inside the layer of a specific group for richness - number of species
   * in a given area. Parameter group may be selected from: total, endemic, invasive and threatened.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {String} group group to select the proper layer. Options are:
   * total, endemic, invasive and threatened.
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.min min value inside the layer
   * @apiSuccess {Number} result.max max value inside the layer
   *
   * @apiExample {curl} Example usage:
   *  /richness/number-species/layer/thresholds?areaType=ea&areaId=CARDER&group=total
   * @apiUse NOSLayerThresholdsExample
   */
  router.get('/richness/number-species/layer/thresholds', errorHandler((req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.group)) {
      const error = { code: 400, message: 'areaType, areaId and group are required' };
      throw error;
    }
    return Richness.NOSLayerThresholds(req.params.areaType, req.params.areaId, req.params.group)
      .then((value) => {
        res.send(value);
        next();
      });
  }));

  return router;
};
