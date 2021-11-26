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
  router.get(
    '/pa/categories',
    errorHandler((req, res, next) =>
      paService.getCategories().then((categories) => {
        res.send(categories);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/categories/binary_protected listCategoriesByBinaryProtected
   * @apiName listCategoriesByBinaryProtected
   * @apiVersion 0.1.0
   * @apiDescription
   * List available protected area categories for the given binary protected values
   *
   * @apiParam (Query params) {String} binary_protected list of binary protected values
   * separated by ;
   *
   * @apiSuccess {Object[]} category list of protected area categories
   *  for the given binary protected values
   * @apiSuccess {String} binary_protected binary value
   * @apiSuccess {String} label category name
   *
   * @apiExample {curl} Example usage:
   *  /pa/categories/binary_protected?binary_protected=000001000000000;010100000000000
   * @apiUse PACategoriesByBinaryProtectedExample
   */
  router.get(
    '/pa/categories/binary_protected',
    errorHandler((req, res, next) =>
      paService
        .getCategoriesByBinaryProtected(req.params.binary_protected.split(';'))
        .then((categories) => {
          res.send(categories);
          next();
        }),
    ),
  );

  /**
   * @apiGroup geofence_pa
   * @api {get} /pa/:category/binary_protected BinaryProtectedByCategory
   * @apiName BinaryProtectedByCategory
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the binary protected value for the given category name
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Object} result.binary_protected binary protected value
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/binary_protected
   * @apiUse BinaryProtectedByCategoryExample
   */
  router.get(
    '/pa/:category/binary_protected',
    errorHandler((req, res, next) =>
      paService.getBinaryProtectedByCategory(req.params.category).then((binaryProtected) => {
        res.send(binaryProtected);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category',
    errorHandler((req, res, next) =>
      paService.getTotalArea(req.params.category).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/se',
    errorHandler((req, res, next) =>
      paService.getAreaBySE(req.params.category).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/se/:se_type',
    errorHandler((req, res, next) =>
      paService.getSEDetails(req.params.category, req.params.se_type).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/se/:se_type/coverage',
    errorHandler((req, res, next) =>
      paService.getCoverageInSE(req.params.category, req.params.se_type).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/se/:se_type/pa',
    errorHandler((req, res, next) =>
      paService.getPAInSE(req.params.category, req.params.se_type).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/pa',
    errorHandler((req, res, next) =>
      paService.getAreaByPA(req.params.category).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/:category/coverage',
    errorHandler((req, res, next) =>
      paService.getAreaByCoverage(req.params.category).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/current/categories CategoriesInPA
   * @apiName CategoriesInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Area distribution for each human footprint category in the given protected area
   *
   * Values calculated for 2018
   *
   * @apiParam (Path params) {String} protected area category
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key Category identifier (natural, baja, media, alta)
   * @apiSuccess {Number} result.area Area inside the protected area for the category
   * @apiSuccess {Number} result.percentage Percentage of the specified category respect to
   * the protected area.
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/hf/current/categories
   * @apiUse CategoriesInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/current/categories',
    errorHandler((req, res, next) =>
      paService.getAreaByHFCategory(req.params.category).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/current/value CurrentValueInPA
   * @apiName CurrentValueInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Value and category of the current value of human footprint inside the given protected area
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {String} protected area category
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.value current value of human footprint inside the given
   * protected area
   * @apiSuccess {String} result.category category of human footprint inside the given
   * protected area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/hf/current/value
   * @apiUse CurrentValueInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/current/value',
    errorHandler((req, res, next) =>
      paService.getCurrentHFValue(req.params.category).then((value) => {
        res.send(value);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/persistence PersistenceInPA
   * @apiName HFPersistenceInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * List the persistence of human footprint inside the given protected area category.
   *
   * Values calculated between 1970 and 2018
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key Persistence identifier (estable_natural, dinamica,
   *  estable_alta)
   * @apiSuccess {Number} result.area Area inside the state for the persistence value
   * @apiSuccess {Number} result.percentage Percentage of the specified persistence value respect to
   *  the category.
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/hf/persistence
   * @apiUse PersistenceInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/persistence',
    errorHandler((req, res, next) =>
      paService.getAreaByHFPersistence(req.params.category).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/timeline TimeLineInPA
   * @apiName TimeLineInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time inside the given protected area category.
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key aTotal that identifies total values for geofence
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/hf/timeline
   * @apiUse TimelineInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/timeline',
    errorHandler((req, res, next) =>
      paService.getTotalHFTimeLine(req.params.category).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/:se_type/hf/timeline SETimeLineInPA
   * @apiName SETimeLineInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the human footprint through time for a strategic ecosystem inside the given
   * protected area category
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {String} category protected area category
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key key that identifies strategic ecosystem type
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/se/Páramo/hf/timeline
   * @apiUse SETimelineInGeofenceExample
   */
  router.get(
    '/pa/:category/se/:se_type/hf/timeline',
    errorHandler((req, res, next) =>
      paService.getSEHFTimeline(req.params.category, req.params.se_type).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /pa/:category/ecoChange/lp/categories ForestLPInPA
   * @apiName ForestLPInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Values for the forest loss and persistence inside the given protected area category
   *
   * Values calculated for 2000-2005, 2006-2010, 2011-2015, 2016-2019 periods
   *
   * @apiParam (Path params) {String} protected area category
   *
   * @apiSuccess {Object[]} result list of objects with information about forest LP
   * @apiSuccess {String} result.id period
   * @apiSuccess {String} result.data data for forest LP divided by categories
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/ecoChange/lp/categories
   * @apiUse ForestLPExample
   */
  router.get(
    '/pa/:category/ecoChange/lp/categories',
    errorHandler((req, res, next) =>
      paService.getEcoChangeLP(req.params.category).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /pa/:category/ecoChange/persistence ForestPersistenceInPA
   * @apiName ForestPersistenceInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Value for the forest persistence inside the given protected area category
   *
   * Value calculated for 2016-2019 period
   *
   * @apiParam (Path params) {String} protected area category
   *
   * @apiSuccess {Object} result object with forest persistence value
   * @apiSuccess {String} result.area value of forest persistence area
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/ecoChange/persistence
   * @apiUse PersistenceAreaExample
   */
  router.get(
    '/pa/:category/ecoChange/persistence',
    errorHandler((req, res, next) =>
      paService.getEcoChangePersistenceValue(req.params.category).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/layers/national',
    errorHandler((req, res, next) =>
      paService.getNationalLayer().then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

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
  router.get(
    '/pa/layers/:category',
    errorHandler((req, res, next) =>
      paService.getLayer(req.params.category).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /pa/:category/se/layers/:se_type SEInPALayer
   * @apiName SEInPALayer
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the layer for an specific strategic ecosystem inside a protected area category
   *
   * @apiParam (Path params) {String} category protected area category.
   * @apiParam (Path params) {String} se_type strategic ecosystem type.
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parque Nacional Natural/se/layers/Páramo
   * @apiUse SpecificLayerExample
   */
  router.get(
    '/pa/:category/se/layers/:se_type',
    errorHandler((req, res, next) =>
      paService.getSELayer(req.params.category, req.params.se_type).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/layers/current/categories CategoriesLayerInPA
   * @apiName CategoriesLayerInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the current human footprint layer divided by categories in a given
   * protected area category
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parque Nacional Natural y Parques Naturales Regionales/hf/layers/current/categories
   * @apiUse CategoriesLayerInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/layers/current/categories',
    errorHandler((req, res, next) =>
      paService.getHFCategoriesLayerByPACategory(req.params.category).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /pa/:category/hf/layers/persistence PersistenceLayerInPA
   * @apiName PersistenceLayerInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the persistence human footprint layer divided by categories in a given
   * protected area category
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parque Nacional Natural y Parques Naturales Regionales/hf/layers/persistence
   * @apiUse PersistenceLayerInGeofenceExample
   */
  router.get(
    '/pa/:category/hf/layers/persistence',
    errorHandler((req, res, next) =>
      paService.getHFPersistenceLayerById(req.params.category).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_ecoChange
   * @api {get} /pa/:category/ecoChange/layers/lp/period/:period/categories/
   * LPCategoriesLayerInPA
   * @apiName LPCategoriesLayerInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the the forest loss and persistence layer for a given period, divided by categories
   * inside the protected area category
   *
   * @apiParam (Path params) {String} protected area category
   * @apiParam (Path params) {String} period period
   * (Options: 2000-2005, 2006-2010, 2011-2015, 2016-2019)
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type the geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/ecoChange/layers/lp/period/2016-2019/categories/
   * @apiUse ForestLPLayerExample
   */
  router.get(
    '/pa/:category/ecoChange/layers/lp/period/:period/categories/',
    errorHandler((req, res, next) =>
      paService.getEcoChangeLPLayer(req.params.ea_id, req.params.period).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_coverages
   * @api {get} /pa/:category/coverage/layer CoverageLayerInPA
   * @apiName CoverageLayerInPA
   * @apiVersion 0.1.0
   * @apiDescription
   * Get the coverage layer divided by categories in a given protected area category
   *
   * @apiParam (Path params) {String} category protected area category
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /pa/Parques Naturales Regionales/coverage/layer
   * @apiUse CoverageLayerInGeofenceExample
   */
  router.get(
    '/pa/:category/coverage/layer',
    errorHandler((req, res, next) =>
      paService.getCoverageLayer(req.params.category).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  return router;
};
