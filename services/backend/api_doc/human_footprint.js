/**
 * @apiDefine s_hf Search > Human Footprint
 * Information related to human footprint in a given geofence.
 */

/**
 * @apiDefine CurrentValueInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "value": "43.4878396779154589",
 *    "category": "media"
 *  }
 */

/**
 * @apiDefine CategoriesInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": 95976.41220808189,
 *      "key": "alta",
 *      "percentage": 0.49649477625386373
 *    },
 *    {
 *      "area": 36740.71443489614,
 *      "key": "baja",
 *      "percentage": 0.19006308292929489
 *    },
 *    {
 *      "area": 46025.9281542762,
 *      "key": "media",
 *      "percentage": 0.23809634445690916
 *    },
 *    {
 *      "area": 14571.602857381069,
 *       "key": "natural",
 *      "percentage": 0.07538023701751127
 *    }
 *  ]
 */

/**
 * @apiDefine PersistenceInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": 19422.0899745865,
 *      "percentage": 0.100904866408734,
 *      "key": "estable_natural"
 *    },
 *    {
 *      "area": 163338.479965581,
 *      "percentage": 0.84860319,
 *      "key": "dinamica"
 *    },
 *    {
 *      "area": 9718.65000066086,
 *      "percentage": 0.050491944032445,
 *      "key": "estable_alta"
 *    }
 *  ]
 */

/**
 * @apiDefine TimelineInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "key": "aTotal"
 *    "data": [
 *      {
 *        "x": "1970",
 *        "y": 34.71575965882226,
 *      },
 *      {
 *        "x": "1990",
 *        "y": 40.211355678553204,
 *      },
 *      {
 *        "x": "2000",
 *        "y": 41.50084127642091,
 *      },
 *      {
 *        "x": "2015",
 *        "y": 42.89788123876601,
 *      },
 *      {
 *        "x": "2018",
 *        "y": 43.48783967791546,
 *      },
 *    ]
 *  }
 */

/**
 * @apiDefine SETimelineInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "key": "paramo"
 *    "data": [
 *      {
 *        "x": "1970",
 *        "y": 34.71575965882226,
 *      },
 *      {
 *        "x": "1990",
 *        "y": 40.211355678553204,
 *      },
 *      {
 *        "x": "2000",
 *        "y": 41.50084127642091,
 *      },
 *      {
 *        "x": "2015",
 *        "y": 42.89788123876601,
 *      },
 *      {
 *        "x": "2018",
 *        "y": 43.48783967791546,
 *      },
 *    ]
 *  }
 */

/**
 * @apiDefine CategoriesLayerInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *      "type": "FeatureCollection",
 *      "features": [
 *          {
 *           "type": "Feature",
 *           "properties": {
 *              "key": "alta",
 *              "area": 4257.699441612134
 *          },
 *          "geometry": {
 *               "type": "GeometryCollection",
 *               "geometries": [
 *                   {
 *                   "type": "Polygon",
 *                   "coordinates": [
 *                       [
 *                           [
 *                               -75.5104086779181,
 *                               10.4307384992824
 *                           ],
 *                       ]
 *                   }
 *               ]
 *           },
 *       ]
 *   }
 */

/**
 * @apiDefine PersistenceLayerInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *      "type": "FeatureCollection",
 *      "features": [
 *          {
 *           "type": "Feature",
 *           "properties": {
 *              "key": "estable_natural",
 *              "area": 10426.840971699932
 *          },
 *          "geometry": {
 *               "type": "GeometryCollection",
 *               "geometries": [
 *                   {
 *                   "type": "Polygon",
 *                   "coordinates": [
 *                       [
 *                           [
 *                               -75.5104086779181,
 *                               10.4307384992824
 *                           ],
 *                       ]
 *                   }
 *               ]
 *           },
 *       ]
 *   }
 */
