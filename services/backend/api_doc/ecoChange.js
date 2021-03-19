/**
 * @apiDefine s_ecoChange Search > Forest
 * Information related to forest in a given geofence.
 */

/**
 * @apiDefine ForestLPExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *   "id": "2016-2019",
 *   "data": [
 *     {
 *       "area": 50000,
 *       "key": "persistencia",
 *       "percentage": 0.50
 *     },
 *      {
 *       "area": 15000,
 *       "key": "perdida",
 *       "percentage": 0.15
 *     },
 *     {
 *       "area": 25000,
 *       "key": "ganancia",
 *       "percentage": 0.25
 *     },
 *     {
 *       "area": 10000,
 *       "key": "no_bosque",
 *       "percentage": 0.10
 *     }
 *   ]
 *  },
 *   ...
 * ]
 */

/**
* @apiDefine ForestLPLayerExample
* @apiSuccessExample {json} Success-Example:
* {
*      "type": "FeatureCollection",
*      "features": [
*          {
*           "type": "Feature",
*           "properties": {
*              "key": "persistencia",
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
 * @apiDefine PersistenceAreaExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "area": "2500",
 *  }
 */
