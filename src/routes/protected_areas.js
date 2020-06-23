const { Router } = require('restify-router');

module.exports = (errorHandler, paService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/categories listCategories
   * @apiName listCategories
   * @apiVersion 0.1.0
   * @apiDescription
   * List all available protected area categories
   *
   * @apiSuccess {Object[]} category list of protected area categories
   * @apiSuccess {String} category.name category name
   *
   * @apiExample {curl} Example usage:
   *  /pa/categories
   * @apiUse PACategoriesExample
   */
  router.get('/pa/categories', errorHandler((req, res, next) => (
    paService.getCategories()
      .then((categories) => {
        res.send(categories);
        next();
      })
  )));

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/:category CategoryDetails
   * @apiName PACategoryDetails
   * @apiVersion 0.1.0
   * @apiDescription
   * Get details about an specific protected area category. For now, only the total area is returned
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.total_area Area for the specified category
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales
   * @apiUse GeofenceDetailsExample
   */
  router.get('/pa/:category', errorHandler((req, res, next) => (
    paService.getTotalArea(req.params.category)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /pa/:category/se SEInPA
   * @apiName PABySE
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by strategic ecosystems.
   *
   * The result is the list of strategic ecosystems with area and percentage inside the protected
   * area category and one extra element with the total area inside strategic ecosystems on the
   * protected area category.
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the strategic ecosystem
   * @apiSuccess {Number} result.area Area of the specified SE in the protected area
   * @apiSuccess {Number} result.percentage Percentage of the SE respect to the protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se
   * @apiUse SEInGeofenceExample
   */
  router.get('/pa/:category/se', errorHandler((req, res, next) => (
    paService.getAreaBySE(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /pa/:category/se/:se_type SEDetailInPA
   * @apiName SEDetailInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific protected area, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam (Path params) {String} category protected area category
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.national_percentage strategic ecosystem inside protected area
   *  percentage with respect to the national area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se/Páramo
   * @apiUse SEInGeofenceDetailExample
   */
  router.get('/pa/:category/se/:se_type', errorHandler((req, res, next) => (
    paService.getSEDetails(req.params.category, req.params.se_type)
      .then((details) => {
        res.send(details);
        next();
      })
  )));

  /**
   * @apiGroup s_coverages
   * @api {get} /pa/:category/se/:se_type/coverage SECoverageInPA
   * @apiName SECoverageInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific protected area, get the coverage
   * distribution in that area.
   *
   * The result is the list of cover types with area and percentage inside the specified strategic
   * ecosystem in the protected area category.
   *
   * @apiParam (Path params) {String} category protected area category
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se/Páramo/coverage
   * @apiUse SECoverageInGeofenceExample
   */
  router.get('/pa/:category/se/:se_type/coverage', errorHandler((req, res, next) => (
    paService.getCoverageInSE(req.params.category, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_protected_areas
   * @api {get} /pa/:category/se/:se_type/pa SEPAInPA
   * @apiName SEPAInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific protected area, get the protected area
   * categories distribution in that area.
   *
   * The result is the list of protected area types with area and percentage inside the specified
   * strategic ecosystem in the protected area category.
   *
   * @apiParam (Path params) {String} category protected area category
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the specified coverage
   * @apiSuccess {Number} result.area Area of the specified coverage
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se/Páramo/pa
   * @apiUse SEPAInPAExample
   */
  router.get('/pa/:category/se/:se_type/pa', errorHandler((req, res, next) => (
    paService.getPAInSE(req.params.category, req.params.se_type)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_protected_areas
   * @api {get} /pa/:category/pa PAInPA
   * @apiName PAByPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by protected areas.
   *
   * The result is the list of protected area types with area and percentage inside the protected
   * area category and one extra elementwith the total protected area inside the protected area
   * category.
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the protected area
   * @apiSuccess {Number} result.percentage Percentage of the specified PA
   * @apiSuccess {Number} result.area Area of the specified protected area in the protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/pa
   * @apiUse PAInPAExample
   */
  router.get('/pa/:category/pa', errorHandler((req, res, next) => (
    paService.getAreaByPA(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup s_coverages
   * @api {get} /pa/:category/coverage CoverageInPA
   * @apiName PAByCoverage
   * @apiVersion 0.1.0
   * @apiDescription
   * Separate the protected area by coverage type.
   *
   * The result is a list of objects (cover types) with area and percentage inside the protected
   * area category and one extra object with the total area of the protected area.
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.type Specifies the coverage type
   * @apiSuccess {Number} result.percentage Percentage of the coverage type respect to the PA.
   * @apiSuccess {Number} result.area Area of the specified coverage in the protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/coverage
   * @apiUse CoverageInGeofenceExample
   */
  router.get('/pa/:category/coverage', errorHandler((req, res, next) => (
    paService.getAreaByCoverage(req.params.category)
      .then((areas) => {
        res.send(areas);
        next();
      })
  )));

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/layers/national NationalLayer
   * @apiName PANationalLayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the national layer divided by protected areas
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess (geojson) {Object[]} result.features features information (id, type, etc)
   * @apiSuccess (geojson) {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /pa/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get('/pa/layers/national', errorHandler((req, res, next) => (
    paService.getNationalLayer()
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/layers/:category PALayer
   * @apiName PALayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific protected area category
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /pa/layers/Parque Nacional Natural
   * @apiUse PALayerExample
   */
  router.get('/pa/layers/:category', errorHandler((req, res, next) => (
    paService.getLayer(req.params.category)
      .then((geometry) => {
        res.send(geometry);
        next();
      })
  )));

  return router;
};
