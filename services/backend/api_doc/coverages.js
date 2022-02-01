/**
 * @apiDefine s_coverages Search > Coverages
 * Information related to coverages in a given geofence or in a given strategic ecosystem inside
 * a geofence.
 */

/**
 * @apiDefine CoverageInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "area": "1493.945506792712753",
 *      "type": "N"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "area": "158.998859058673413",
 *      "type": "T"
 *    }
 *  ]
 */

/**
 * @apiDefine SECoverageInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "area": "1493.945506792712753",
 *      "type": "N"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "area": "158.998859058673413",
 *      "type": "T"
 *    }
 *  ]
 */

/**
 * @apiDefine CoverageLayerInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *      "type": "FeatureCollection",
 *      "features": [
 *          {
 *           "type": "Feature",
 *           "properties": {
 *              "key": "N",
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
