const { Router } = require('restify-router');

module.exports = (errorHandler, basinSubzoneService) => {
  const router = new Router();

  /**
   * @apiGroup geofence_bs
   * @api {get} /basinSubzones listBasinSubzones
   * @apiName listBasinSubzones
   * @apiVersion 2.0.0
   * @apiDescription
   * List all available basin sub-zones
   *
   * @apiSuccess {Object[]} basin_sub-zones list of basin sub-zones
   * @apiSuccess {Number} basin_sub-zones.id_subzone basin subzone id
   * @apiSuccess {String} basin_sub-zones.name_subzo basin subzone name
   * @apiSuccess {Number} basin_sub-zones.id_basin associated basin area id
   * @apiSuccess {Number} basin_sub-zones.id_zone associated basin zone id
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones
   * @apiUse getAllBasinSubzonesExample
   */
  router.get(
    '/basinSubzones',
    errorHandler((req, res, next) =>
      basinSubzoneService.getAll().then((result) => {
        res.send(result);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_bs
   * @api {get} /basinSubzones/:subzone_id SubzoneTotalArea
   * @apiName SubzoneTotalArea
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the total area of a specific basin subzone.
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {Number} result.total_area Area for the specified subzone
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/3502
   * @apiUse GeofenceTotalAreaExample
   */
  router.get(
    '/basinSubzones/:subzone_id',
    errorHandler((req, res, next) =>
      basinSubzoneService.getTotalArea(req.params.subzone_id).then((details) => {
        res.send(details);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /basinSubzones/:subzone_id/se/:se_type SEDetailInSubzone
   * @apiName SEDetailInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Given an strategic ecosystem type inside an specific basin subzone, get more details
   * about that area, for the moment is just the national percentage of that strategic ecosystem
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.national_percentage percentage of the strategic ecosystem inside
   * basin subzone respect to the national area
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/se/Páramo
   * @apiUse SEInGeofenceDetailExample
   */
  router.get(
    '/basinSubzones/:subzone_id/se/:se_type',
    errorHandler((req, res, next) =>
      basinSubzoneService
        .getSEDetails(req.params.subzone_id, req.params.se_type)
        .then((details) => {
          res.send(details);
          next();
        }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/current/categories CategoriesInSubzone
   * @apiName CategoriesInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Area distribution for each human footprint category in the given subzone
   *
   * Values calculated for 2018
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key Category identifier (natural, baja, media, alta)
   * @apiSuccess {Number} result.area Area inside the subzone for the category
   * @apiSuccess {Number} result.percentage Percentage of the specified category respect to
   * the subzone.
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/2903/hf/current/categories
   * @apiUse CategoriesInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/current/categories',
    errorHandler((req, res, next) =>
      basinSubzoneService.getAreaByHFCategory(req.params.subzone_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/current/value CurrentValueInSubzone
   * @apiName CurrentValueInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Value and category of the current value of human footprint inside the given basin subzone
   *
   * Value calculated for 2018
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.value current value of human footprint inside the given
   * basin subzone
   * @apiSuccess {String} result.category category of human footprint inside the given
   * basin subzone
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/2903/hf/current/value
   * @apiUse CurrentValueInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/current/value',
    errorHandler((req, res, next) =>
      basinSubzoneService.getCurrentHFValue(req.params.subzone_id).then((value) => {
        res.send(value);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/persistence PersistenceInSubzone
   * @apiName HFPersistenceInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * List the persistence of human footprint inside the given basin subzone.
   *
   * Values calculated between 1970 and 2018
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id.
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.key Persistence identifier (estable_natural, dinamica,
   *  estable_alta)
   * @apiSuccess {Number} result.area Area inside the basin subzone for the persistence value
   * @apiSuccess {Number} result.percentage Percentage of the specified persistence value respect to
   *  the basin subzone.
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/1/hf/persistence
   * @apiUse PersistenceInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/persistence',
    errorHandler((req, res, next) =>
      basinSubzoneService.getAreaByHFPersistence(req.params.subzone_id).then((areas) => {
        res.send(areas);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/timeline TimeLineInSubzone
   * @apiName TimeLineInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Values for the human footprint through time inside the given basin subzone
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key aTotal that identifies total values for geofence
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/2903/hf/timeline
   * @apiUse TimelineInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/timeline',
    errorHandler((req, res, next) =>
      basinSubzoneService.getTotalHFTimeLine(req.params.subzone_id).then((values) => {
        res.send(values);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/se/:se_type/hf/timeline SETimeLineInSubzone
   * @apiName SETimeLineInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Values for the human footprint through time for a strategic ecosystem inside the given
   * basin subzone
   *
   * Values calculated for 1970, 1990, 2000, 2015 and 2018
   *
   * @apiParam (Path params) {Number} subzone_id basin subzone id
   * @apiParam (Path params) {String} se_type strategic ecosystem type
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} result.key key that identifies strategic ecosystem type
   * @apiSuccess {Object} result.data values x (year) and y (hf value)
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/3701/se/Páramo/hf/timeline
   * @apiUse SETimelineInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/se/:se_type/hf/timeline',
    errorHandler((req, res, next) =>
      basinSubzoneService
        .getSEHFTimeline(req.params.subzone_id, req.params.se_type)
        .then((values) => {
          res.send(values);
          next();
        }),
    ),
  );

  /**
   * @apiGroup geofence_bs
   * @api {get} /basinSubzones/layers/national NationalLayer
   * @apiName BasinSubzoneNationalLayer
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the national layer divided by basin subzones
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Number} result.totalFeatures number of features in this geometry
   * @apiSuccess (geojson) {Object[]} result.features features information (id, type, etc)
   * @apiSuccess (geojson) {Object} result.crs Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/layers/national
   * @apiUse GeofenceNationalLayerExample
   */
  router.get(
    '/basinSubzones/layers/national',
    errorHandler((req, res, next) =>
      basinSubzoneService.getNationalLayer().then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup geofence_bs
   * @api {get} /basinSubzones/layers/:subzone_id SubzoneLayer
   * @apiName SubzoneLayer
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the layer for an specific basin subzone
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/layers/3502
   * @apiUse SpecificLayerExample
   */
  router.get(
    '/basinSubzones/layers/:subzone_id',
    errorHandler((req, res, next) =>
      basinSubzoneService.getLayer(req.params.subzone_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_strategic_ecosystems
   * @api {get} /basinSubzones/:subzone_id/se/layers/:se_type SEInSubzoneLayer
   * @apiName SEInSubzoneLayer
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the layer for an specific strategic ecosystem inside a basin subzone
   *
   * @apiParam (Path params) {Number} subzone_id subzone id.
   * @apiParam (Path params) {String} se_type strategic ecosystem type.
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Array[]} result.coordinates Coordinate Reference Systems specification
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/3502/se/layers/Páramo
   * @apiUse SpecificLayerExample
   */
  router.get(
    '/basinSubzones/:subzone_id/se/layers/:se_type',
    errorHandler((req, res, next) =>
      basinSubzoneService.getSELayer(req.params.subzone_id, req.params.se_type).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/layers/current/categories CategoriesLayerInSubzone
   * @apiName CategoriesLayerInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the current human footprint layer divided by categories in a given basin subzone
   *
   * @apiParam (Path params) {Number} subzone_id subzone id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/2903/hf/layers/current/categories
   * @apiUse CategoriesLayerInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/layers/current/categories',
    errorHandler((req, res, next) =>
      basinSubzoneService.getHFCategoriesLayerById(req.params.subzone_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  /**
   * @apiGroup s_hf
   * @api {get} /basinSubzones/:subzone_id/hf/layers/persistence PersistenceLayerInSubzone
   * @apiName PersistenceLayerInSubzone
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the persistence human footprint layer divided by categories in a given basin subzone
   *
   * @apiParam (Path params) {Number} subzone_id subzone id
   *
   * @apiSuccess (geojson) {Object[]} result
   * @apiSuccess (geojson) {String} result.type The geometry type
   * @apiSuccess (geojson) {Object[]} result.features features information
   * (type, properties, geometry)
   *
   * @apiExample {curl} Example usage:
   *  /basinSubzones/2903/hf/layers/persistence
   * @apiUse PersistenceLayerInGeofenceExample
   */
  router.get(
    '/basinSubzones/:subzone_id/hf/layers/persistence',
    errorHandler((req, res, next) =>
      basinSubzoneService.getHFPersistenceLayerById(req.params.subzone_id).then((geometry) => {
        res.send(geometry);
        next();
      }),
    ),
  );

  return router;
};
